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
import pinch from "touch-pinch";

import intl from 'react-intl-universal';
import OSS from "../../../../css/aliyun-oss-sdk-4.4.4.min";
import UUID from "short-uuid";
import ButtonHeader from '../../../components/common/header/ButtonHeader';
import { setGlobAlert } from '../../../actions/common/actions';
import {findDOMNode} from "react-dom";
import SubmitLoading from '../../../components/common/SubmitLoading';
import Draggable from 'react-draggable';

const imgMax = {
    size: 600 * 1024,
    width: 650,
    height: 650,
    screenW: document.documentElement.clientWidth || document.body.clientWidth,
    screenH: document.documentElement.clientHeight || document.body.clientHeight,
    scaleRate: 0.8
};


class Crop extends BaseComponent {
    constructor(props) {
        super(props);
        super.title("裁剪图片");

        this.state = {
            dataUrl: '',
            imgWidth: 0,
            imgHeight: 0,
            client: null,
            setEditorRef: (editor) => this.editor = editor,
            isDealPinch: false,
            pinchDist: 0,
            scale: 1,
            rotate: 0,
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

    componentWillMount() {

        /**
         * 获取OSS对象参数
         */
        this.props.OSSTokenActions({}, reqHeader({}));


        const dataUrl = window.sessionStorage.getItem(this.props.match.params.dataUrl) || "http://wx.j-make.cn/img/album/1.png";
        if (typeof dataUrl !== 'undefined') {

            const img = new Image();
            img.src = dataUrl;
            img.onload = () => {

                this.setState({
                    dataUrl: dataUrl,
                    imgWidth: img.width,
                    imgHeight: img.height
                });
            };
        }

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
                        scale = scale > 0.2 ? (scale - 0.05) : 0.2;
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


    render() {

        const {scale, imgWidth, imgHeight} = this.state;
        const transitionW = imgWidth * scale;
        const transitionH = transitionW * imgHeight / imgWidth;

        return (
            <section ref="cropWidow" style={{
                position: 'relative',
                width: `${imgMax.screenW}px`,
                height: `${imgMax.screenH}px`,
                // backgroundColor: 'rgba(0, 0, 0, 1)'
            }}>
                <header>
                    <ButtonHeader
                        leftButtonClick={() => {
                            window.history.back();
                        }}
                        leftButtonLabel='取消'

                        rightButtonClick={this.uploadRightBtn}
                        rightButtonLabel='完成'
                    />
                </header>

                <div>{scale}</div>
                <div>{imgWidth}</div>
                <div>{imgHeight}</div>

                <div style={{
                    position: 'absolute',
                    top: toRem(110),
                    right: 0,
                    bottom: 0,
                    left: 0,
                    overflow: 'hidden',
                    // display: 'flex',
                    // justifyContent: 'center',
                    // alignItems: 'center',
                    // border: `${toRem(100)} solid rgba(0, 0, 0, 0.7)`,
                    background: 'rgba(0, 0, 0, 0.7)'
                }}>
                    {/*<div style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                        zIndex: 5
                    }} />*/}

                    <Draggable bounds="parent">
                        <div style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            margin: `-${toRem(transitionH / 2)} 0 0 -${toRem(transitionW / 2)}`,
                            width: `${toRem(transitionW)}`,
                            height: `${toRem(transitionH)}`
                        }}>
                            <img ref="cropWidow"
                                 style={{
                                     width: '100%',
                                     height: '100%'
                                 }}
                                 src={this.state.dataUrl} />

                        </div>
                    </Draggable>

                </div>

                {/*<AvatarEditor
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
                    rotate={this.state.rotate}
                />*/}

                <SubmitLoading hide={!this.state.uploadLoading} />

            </section>
        );
    }

    uploadRightBtn() {

        alert(JSON.stringify(this.cropper.getData()));

        // if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
        //     return;
        // }
        //
        // alert(this.cropper.getCroppedCanvas().toDataURL());

        /*this.setState({
            cropResult: this.cropper.getCroppedCanvas().toDataURL(),
        });*/

        /*this.setState({
            uploadLoading: true
        });*/

        /*if (this.editor) {
            const canvas = this.editor.getImage();
            const globAlert = this.props.action_setGlobAlert;

            alert(canvas.width);

            canvas.toBlob(blob => {
                console.log(blob);
                alert(blob);

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
        }*/
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
        action_setGlobAlert: bindActionCreators(setGlobAlert, dispatch)
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Crop));
