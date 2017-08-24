/**
 * Created by Zed on 2017/8/1.
 */
import React from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import {getPhotoAlbumList, uploadImg, deleteImg} from "../../../actions/userActions";
import {linkTo, reqHeader} from "../../../utils/comUtils";
import BaseComponent from "../../../components/common/BaseComponent";
import {findDOMNode} from "react-dom";
import $ from 'jquery';
import cropper from 'cropper';

import '../../../../css/cropper.css';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import DoneIcon from "material-ui/svg-icons/action/done";

import InputBox from "../../../components/photoAlbum";


const addBtn = {
    isShowAddBtn: true,
    id: "addBtn"
};

const imgMax = {
    size: 600 * 1024,
    width: 650,
    height: 650,
    screenW: document.documentElement.clientWidth || document.body.clientWidth,
    screenH: document.documentElement.clientHeight || document.body.clientHeight,
    scaleRate: 0.8
};

let options = {
    autoCrop: false,
    viewMode: 0,
    // background: false,
    dragMode: 'move',
    zoomable: true,
    cropBoxResizable: false,
    cropBoxMovable: false,
    aspectRatio: 1 / 1,
    minCropBoxWidth: imgMax.screenW * imgMax.scaleRate,
    minCropBoxHeight: imgMax.screenW * imgMax.scaleRate,
    minCanvasWidth: imgMax.screenW,
    ready: function () {
        $(this).cropper('scale', imgMax.scaleRate, imgMax.scaleRate);
        $(this).cropper('crop');
    }
};


class PhotoAlbum extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            isSelectAll: true,
            isDeletePage: false,
            isPhotoAlbumListPage: true,
            cropPageImgUrl: null
        };

        this.uploadImg = this.uploadImg.bind(this);
        this.updateList = this.updateList.bind(this);
        this.updateAfterUploadImg = this.updateAfterUploadImg.bind(this);
        this.inputChange = this.inputChange.bind(this);
    }

    get cropPageImgDom() {
        if (!this.refs)
            return {};

        return findDOMNode(this.refs.cropPageImgDom);
    }

    componentDidUpdate(preProps) {
        if (preProps.result.photoAlbumListStamp !== this.props.result.photoAlbumListStamp) {
            this.updateList();
        }
        if (preProps.result.photoAlbumUploadStamp !== this.props.result.photoAlbumUploadStamp) {
            this.updateAfterUploadImg();
        }
    }

    componentDidMount() {
        const params = {};
        this.props.getPhotoAlbumListActions(params, reqHeader(params));
    }

    render() {
        const dataList = this.state.data;

        return (
            <Paper zDepth={1} style={{backgroundColor: "#eee"}}>
                {this.state.isPhotoAlbumListPage ? (
                    <div style={{paddingTop: "66px", paddingBottom: "66px"}}>
                        <AppBar
                            style={{position: 'fixed', top: 0, left: 0}}
                            title="我的相册"
                            showMenuIconButton={false}
                            iconElementRight={
                                <RaisedButton
                                    backgroundColor="#a4c639"
                                    disabledBackgroundColor="#a4c630"
                                    disabled={!(dataList.length > 1)}
                                    onTouchTap={() => {
                                        const isDeletePage = this.state.isDeletePage;
                                        if (!isDeletePage) {
                                            dataList.shift();
                                        } else {
                                            dataList.unshift(addBtn);

                                        }
                                        this.setState({
                                            isSelectAll: true,
                                            isDeletePage: !isDeletePage,
                                            data: dataList.filter((item) => {
                                                item.isShowBadge = false;
                                                return item;
                                            })
                                        });
                                    }}
                                >{this.state.isDeletePage ? '取消' : '编辑'}</RaisedButton>
                            }
                        />

                        <InputBox
                            cols={3}
                            badgeContent={<DoneIcon color="#fff"/>}
                            data={dataList}
                            inputChange={this.inputChange}
                            imgTouchTap={(target) => {
                                if (this.state.isDeletePage) {
                                    const newDataList = dataList.filter((item) => {
                                        if (item.id === target.id) {
                                            item.isShowBadge = !item.isShowBadge;
                                            return item;
                                        }
                                        return item;
                                    });
                                    this.setState({
                                        data: newDataList
                                    });
                                } else {
                                    linkTo(`user/photoAlbumPreview/${target.id}`, false, null);
                                }
                            }}
                        />

                    </div>
                ) : (
                    <div>
                        <div
                            style={{width: imgMax.screenW, height: imgMax.screenH}}
                        >
                            <img
                                ref="cropPageImgDom"
                                style={{width: '100%', height: 'auto'}}
                                src={this.state.cropPageImgUrl}
                            />
                        </div>

                        <AppBar
                            style={{position: 'fixed', bottom: 0, left: 0}}
                            iconElementLeft={<RaisedButton
                                backgroundColor="#a4c639"
                                label="取消"
                                onTouchTap={(e) => {
                                    e.preventDefault();
                                    this.setState({
                                        isPhotoAlbumListPage: true
                                    });
                                    $(this.cropPageImgDom).cropper('destroy');
                                }}
                            />}
                            iconElementRight={<RaisedButton
                                backgroundColor="#a4c639"
                                label="截图"
                                onTouchTap={(e) => {
                                    e.preventDefault();
                                    this.uploadImg(this.cropPageImgDom);
                                }}
                            />}
                        />
                    </div>
                )}
                {this.state.isDeletePage && (<AppBar
                    style={{position: 'fixed', bottom: 0, left: 0}}
                    iconElementLeft={<RaisedButton
                        backgroundColor="#a4c639"
                        onTouchTap={() => {
                            this.setState({
                                isSelectAll: !this.state.isSelectAll,
                                data: dataList.filter((item) => {
                                    item.isShowBadge = this.state.isSelectAll;
                                    return item;
                                })
                            });
                        }}
                    >{this.state.isSelectAll ? "全部选择" : "全部不选"}</RaisedButton>}
                    iconElementRight={<RaisedButton
                        backgroundColor="#a4c639"
                        disabledBackgroundColor="#a4c630"
                        label="删除"
                        disabled={dataList.filter((item) => {
                            if (item.isShowBadge) {
                                return item;
                            }
                        }).length <= 0}
                        onTouchTap={() => {
                            this.deleteImg();
                        }}
                    />}
                />)}
            </Paper>
        );
    }

    updateAfterUploadImg() {
        const preStateData = this.state.data;
        const {data} = this.props.result.photoAlbumUpload || {data: {}};
        data.isShowBadge = false;
        const addBtn = preStateData.shift();
        this.setState({
           data: [addBtn, data, ...preStateData]
        });
    }

    updateList() {
        const {data} = this.props.result.photoAlbumList || {data: []};
        data.unshift(addBtn);
        this.setState({
            data: data.filter((item) => {
                item.isShowBadge = false;
                return item;
            })
        });
    }

    deleteImg() {
        let dataList = this.state.data;
        const isDeletePage = this.state.isDeletePage;
        if (!isDeletePage) {
            dataList.shift();
        } else {
            dataList.unshift(addBtn);

        }
        this.setState({
            isSelectAll: false,
            isDeletePage: false,
            data: dataList.filter((item) => {
                if (item.isShowBadge) {
                    console.log(item);
                    return null;
                }
                return item;
            })
        });
    }

    uploadImg(img) {
        console.log('clickSaveImg');
        let imgCanvas = $(img).cropper('getCroppedCanvas', {
            width: imgMax.width,
            height: imgMax.height,
            fillColor: '#000',
            imageSmoothingEnabled: false,
            imageSmoothingQuality: 'high'
        });

        let imgBase64 = imgCanvas.toDataURL('image/jpeg', 1);

        const params = this.dataURLtoBlob(imgBase64);
        console.log(params);
        this.props.uploadImgActions(params, reqHeader(params), () => {
            this.setState({
                isPhotoAlbumListPage: true
            });
            $(img).cropper('destroy');
        });

        /*$(img).cropper('destroy');
        this.setState({
            cropPageImgUrl: imgBase64
        });*/

        /*imgCanvas.toBlob(blob => {
            console.log(blob);
            alert('blob');

            const param = blob;
            this.props.uploadImgActions(param, reqHeader(param), () => {
                this.setState({
                    isPhotoAlbumListPage: true
                });
            });
            $(img).cropper('destroy');

        });*/
    }

    cropImg(img) {
        $(img).cropper(options);
    }

    //**dataURL to blob**
    dataURLtoBlob(dataUrl) {
        let arr = dataUrl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bStr = atob(arr[1]),
            n = bStr.length,
            u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bStr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    }

    inputChange(dataUrl) {
        let _this = this;
        //加载图片获取图片真实宽度和高度
        let image = new Image();
        image.onload = function() {
            let width = image.width;
            let height = image.height;
            console.log(width + '---' + height);

            _this.setState({
                isPhotoAlbumListPage: false,
                cropPageImgUrl: dataUrl
            });

            _this.cropImg(_this.cropPageImgDom);
        };
        image.src = dataUrl;
    }

}


PhotoAlbum.defaultProps = {
    result: {}
};

PhotoAlbum.propTypes = {
    result: PropTypes.object
};

const mapStateToProps = (state, ownPorps) => {
    return {
        result: state.app.user.photoAlbum
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getPhotoAlbumListActions: bindActionCreators(getPhotoAlbumList, dispatch),
        uploadImgActions: bindActionCreators(uploadImg, dispatch),
        deleteImgActions: bindActionCreators(deleteImg, dispatch)
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PhotoAlbum));
