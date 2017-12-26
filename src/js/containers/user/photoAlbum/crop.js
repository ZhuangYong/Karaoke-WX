/**
 * Created by Zed on 2017/8/1.
 */
import React from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import { uploadImg, OSSAccessToken } from '../../../actions/userActions';
import { getWxinfoFromSession, reqHeader, toRem } from '../../../utils/comUtils';
import BaseComponent from "../../../components/common/BaseComponent";
import AvatarEditor from 'react-avatar-editor';
import pinch from "touch-pinch";

import intl from 'react-intl-universal';
import OSS from "../../../../css/aliyun-oss-sdk-4.4.4.min";
import UUID from "short-uuid";
import ButtonHeader from '../../../components/common/header/ButtonHeader';
import { setGlobAlert } from '../../../actions/common/actions';
import {findDOMNode} from "react-dom";
import SubmitLoading from '../../../components/common/SubmitLoading';

const imgMax = {
    screenW: document.documentElement.clientWidth || document.body.clientWidth,
    screenH: document.documentElement.clientHeight || document.body.clientHeight
};

class Crop extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            dataUrl: '',
            client: null,
            setEditorRef: (editor) => this.editor = editor,
            isDealPinch: false,
            pinchDist: 0,
            scale: 1,
            uploadLoading: false
        };

        this.uploadImgGetter = this.uploadImgGetter.bind(this);
        this.uploadRightBtn = this.uploadRightBtn.bind(this);
    }

    /**
     * 裁剪图片页面dom节点
     * @returns {*}
     */
    get cropWidow() {
        if (!this.refs)
            return {};

        return findDOMNode(this.refs.cropWidow);
    }

    componentDidUpdate(preProps) {

        /**
         * 生成OSS实例对象
         */
        const {data} = this.props.result.OSSTokenData;
        if (typeof data !== 'undefined' && data !== {} && this.state.client === null) {

            this.state.client = new OSS.Wrapper({
                accessKeyId: data.accessKeyId,
                accessKeySecret: data.accessKeySecret,
                stsToken: data.securityToken,
                endpoint: data.endpoint,
                bucket: data.bucketName
            });
        }

        /**
         * 这里监听图片的随手指（两只）放大缩小事件，最大放大2倍，最小缩小1倍，默认1倍
         */
        if (!this.state.isDealPinch && this.cropWidow) {

            pinch(this.cropWidow)
                .on('change', (dist, prev) => {

                    const pinchChange = this.state.pinchDist - parseInt(dist, 10);

                    let scale = this.state.scale;

                    if (pinchChange > 0) {
                        scale = scale > 1 ? (scale - 0.05) : 1;
                    } else {
                        scale = scale <= 2 ? (scale + 0.05) : 2;
                    }

                    this.setState({
                        scale: scale,
                        pinchDist: dist
                    });
                })
                .on('end', (dist) => {
                    this.setState({
                        pinchDist: 0
                    });
                });

            this.setState({
               isDealPinch: true
            });
        }
    }

    componentDidMount() {

        this.setState({
           dataUrl: window.sessionStorage.getItem(this.props.match.params.dataUrl)
        });

        /**
         * 获取OSS对象参数
         */
        this.props.OSSTokenActions({}, reqHeader({}));

    }

    render() {

        return (
            <section ref="cropWidow" style={{
                position: 'relative',
                width: `${imgMax.screenW}px`,
                height: `${imgMax.screenH}px`,
                backgroundColor: 'rgba(0, 0, 0, 0.6)'
            }}>
                <header>
                    <ButtonHeader
                        isShowLeftButton={true}
                        leftButtonClick={() => {
                            window.history.back();
                        }}
                        leftButtonLabel='取消'

                        rightButtonClick={this.uploadRightBtn}
                        rightButtonLabel='完成'
                    />
                </header>

                <AvatarEditor
                    ref={this.state.setEditorRef}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: 0,
                        marginTop: `-${imgMax.screenW / 2}px`,
                        width: '100%',
                        height: `${imgMax.screenW}px`,
                        backgroundColor: '#fff',
                        boxSizing: 'border-box'
                    }}
                    image={this.state.dataUrl}
                    border={10}
                    color={[0, 0, 0, 0.6]} // RGBA
                    scale={this.state.scale}
                    rotate={0}
                />

                <SubmitLoading hide={!this.state.uploadLoading} />

            </section>
        );
    }

    uploadRightBtn() {

        this.setState({
            uploadLoading: true
        });

        if (this.editor) {
            const canvas = this.editor.getImage();
            const globAlert = this.props.action_setGlobAlert;

            canvas.toBlob(blob => {
                console.log(blob);

                //将Blob 对象转换成 ArrayBuffer
                const reader = new FileReader();
                reader.readAsArrayBuffer(blob);
                reader.onload = e => {
                    const name = 'photoAlbum/' + UUID().new() + '.' + blob.type.split('/')[1];

                    // arrayBuffer转Buffer
                    const buffer = new OSS.Buffer(reader.result);

                    this.uploadImgGetter(buffer, name).then(res => {
                        globAlert(res.msg);

                        window.history.back();

                    }).catch(err => {

                        globAlert(err.msg);
                        this.setState({
                            uploadLoading: false
                        });
                    });
                };

                // this.uploadImgGetter(blob);
            }, 'image/jpeg', 1);

            // console.log(canvas);
        }
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
        action_setGlobAlert: bindActionCreators(setGlobAlert, dispatch)
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Crop));
