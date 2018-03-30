/**
 * Created by Zed on 2017/8/1.
 */
import React from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import { uploadImg, OSSAccessToken, ossUploadWxPic } from '../../../actions/userActions';
import { getWxinfoFromSession, reqHeader, toRem } from '../../../utils/comUtils';
import BaseComponent from "../../../components/common/BaseComponent";

import intl from 'react-intl-universal';
import ButtonHeader from '../../../components/common/header/ButtonHeader';
import { setGlobAlert } from '../../../actions/common/actions';
import SubmitLoading from '../../../components/common/SubmitLoading';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import DefaultImg from '../../../../img/album/1.png';
import ActionTypes from '../../../actions/actionTypes';

class Crop extends BaseComponent {
    constructor(props) {
        super(props);
        super.title(intl.get('title.crop'));

        this.state = {
            localId: '',
            localData: '',
            uploadLoading: false,
            realWidth: 0,
        };

        this.uploadImgGetter = this.uploadImgGetter.bind(this);
        this.uploadRightBtn = this.uploadRightBtn.bind(this);
    }

    componentWillMount() {

        const localId = window.sessionStorage.getItem(this.props.match.params.dataUrl) || DefaultImg;
        if (typeof localId !== 'undefined') {

            const {globAlertAction} = this.props;
            window.wx && window.wx.ready(() => {

                window.wx.getLocalImgData({
                    localId: localId, // 图片的localID
                    success: res => {
                        const localData = res.localData; // localData是图片的base64数据，可以用img标签显示
                        const {isIos} = window.sysInfo;
                        const imgBase64 = isIos ? localData : ('data:image/jpg;base64,' + localData);

                        this.setState({
                            localId: localId,
                            localData: imgBase64,
                        });

                        const img = new Image();
                        img.src = imgBase64;
                        img.onload = e => {
                            const { width } = img;
                            this.setState({
                                realWidth: width,
                            });
                        };

                    },
                    fail: () => {
                        globAlertAction("", ActionTypes.COMMON.ALERT_TYPE_WX_API_FAIL);
                    }
                });
            });

        }

    }


    render() {

        const { localData, uploadLoading } = this.state;

        return (
            <section>
                <header>
                    <ButtonHeader
                        leftButtonClick={() => {
                            window.history.back();
                        }}
                        leftButtonLabel={intl.get('button.cancel')}

                        rightButtonClick={this.uploadRightBtn}
                        rightButtonLabel={intl.get('button.submit')}
                    />
                </header>

                <Cropper
                    style={{
                        position: 'absolute',
                        top: toRem(110),
                        right: 0,
                        bottom: 0,
                        left: 0,
                    }}
                    viewMode={1}
                    dragMode="crop"
                    zoomOnTouch={false}
                    aspectRatio={1}
                    guides={true}
                    src={localData}
                    ref={cropper => this.cropper = cropper}
                />

                <SubmitLoading hide={!uploadLoading} />

            </section>
        );
    }

    uploadRightBtn() {

        const {globAlertAction} = this.props;
        const { localId, realWidth } = this.state;
        const cropData = this.cropper.getData();
        // alert(JSON.stringify(cropData));

        const { x, y, width, height, rotate, scaleX } = cropData;
        const xstart = Math.round(x);
        const ystart = Math.round(y);
        const params = {
            xstart,
            ystart,
            width: Math.round(width),
            height: Math.round(height),
            rotate,
            scale: scaleX,
            realWidth,
        };


        this.uploadWxImgGetter(localId, params).then(res => {
            globAlertAction(res.msg);

            window.history.back();
        }).catch(err => {
            globAlertAction(err.msg);
            this.setState({
                uploadLoading: false
            });

        });
    }

    /**
     * 上传已存储到微信服务器的图片（自建后台）
     * @returns {Promise}
     */
    uploadWxImgGetter(localId, params) {

        return new Promise((resolve, reject) => {
            const {globAlertAction, ossUploadWxPicActions} = this.props;

            window.wx && window.wx.uploadImage({
                localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
                isShowProgressTips: 1, // 默认为1，显示进度提示
                success: (res) => {
                    this.setState({
                        uploadLoading: true
                    });
                    let result;
                    const uploadParams = {
                        type: 1,
                        keys: res.serverId, // 返回图片的服务器端ID
                        ...params
                    };

                    ossUploadWxPicActions(uploadParams, reqHeader(uploadParams), res => {
                        console.log("======上传成功========");
                        const {status, data} = res;
                        if (parseInt(status, 10) === 1) {

                            result = {...data, msg: intl.get('msg.upload.success')};
                            resolve(result);
                        } else {

                            result = {msg: intl.get('msg.upload.fail')};
                            reject(result);
                        }
                    });
                },
                fail: () => {
                    globAlertAction("", ActionTypes.COMMON.ALERT_TYPE_WX_API_FAIL);
                }
            });
        });

    }

    /**
     * 上传图片到OSS，然后发文件路径传给服务器
     * @param file 图片文件 required file/Buffer/String
     * @param name 图片名字 string
     */
    uploadImgGetter(file, name) {
        // console.log(file);

        return new Promise((resolve, reject) => {
            const userInfo = getWxinfoFromSession();
            let result = {};
            if (userInfo.status === 1) {
                const {data} = userInfo;

                const storeAs = data.uuid + '/' + name;

                this.state.client.put(storeAs, file).then(result => {

                    console.log(result);
                    const param = {
                        type: 1,
                        key: result.name
                    };

                    this.props.uploadImgActions(param, reqHeader(param), res => {
                        console.log("======上传成功========");
                        const {status, data} = res;
                        if (parseInt(status, 10) === 1) {

                            result = {...data, msg: "上传成功"};
                            resolve(result);
                        } else {

                            result = {msg: "上传服务器失败"};
                            reject(result);
                        }
                    });
                }).catch(function (err) {
                    console.log(err);
                    result = {msg: "上传OSS失败"};
                    reject(result);
                });

            } else {
                result = {msg: intl.get("get.user.info.fail.try.again")};
                reject(result);
            }
        });

    }

}


Crop.defaultProps = {
    result: {}
};

Crop.propTypes = {
    result: PropTypes.object
};

const mapStateToProps = (state, ownPorps) => {
    return {
        result: state.app.user.photoAlbum
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        uploadImgActions: bindActionCreators(uploadImg, dispatch),
        OSSTokenActions: bindActionCreators(OSSAccessToken, dispatch),
        globAlertAction: bindActionCreators(setGlobAlert, dispatch),
        ossUploadWxPicActions: bindActionCreators(ossUploadWxPic, dispatch),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Crop));
