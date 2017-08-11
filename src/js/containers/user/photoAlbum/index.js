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
import Badge from 'material-ui/Badge';
import {GridList, GridTile} from "material-ui/GridList";
import DoneIcon from "material-ui/svg-icons/action/done";

import defaultImg from "../../../../img/common/tile_default.jpg";
import addIcon from "../../../../img/iconfont-tianjia.png";

const style = {
    tile: {
        width: "100%",
        height: "100%",
        margin: "auto",
        paddingTop: "6px",
        overflow: "hidden"
    },
    tileImg: {
        height: "100%",
        margin: "auto",
        display: "block"
    },
    fileInp: {
        display: 'none'
    }
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

        this.listenInputChange = this.listenInputChange.bind(this);
        this.uploadImg = this.uploadImg.bind(this);
        this.updateList = this.updateList.bind(this);
        this.updateAfterUploadImg = this.updateAfterUploadImg.bind(this);
    }

    get cropPageImgDom() {
        if (!this.refs)
            return {};

        return findDOMNode(this.refs.cropPageImgDom);
    }

    get addImgInp() {
        if (!this.refs)
            return {};

        return findDOMNode(this.refs.addImgInp);
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
        const addBtnDom = (
            <GridTile
                key="addBtnDom"
                onTouchTap={() => {
                    if (dataList.length < 50) {
                        return this.addImgInp.click();
                    }
                    return alert('最多只能添加50张照片哦');
                }}
            >
                <div style={style.tile}>
                    <img src={addIcon} style={style.tileImg} alt="添加图片按钮"/>
                </div>
                <input
                    ref="addImgInp"
                    type="file"
                    accept="image/*"
                    style={style.fileInp}
                    onChange={() => {
                        this.listenInputChange();
                    }}
                />
            </GridTile>
        );
        let PhotoList = [];

        if (!this.state.isDeletePage) {
            PhotoList.push(addBtnDom);
        }

        dataList.forEach((val, ind) => {
            let showBadge = dataList[ind].isDeleteImg ? 'block' : 'none';
            PhotoList.push(
                <Badge
                    key={ind}
                    style={style.tile}
                    badgeStyle={{top: '10px', right: '30px', backgroundColor: '#a4c639', display: showBadge}}
                    badgeContent={<DoneIcon
                        color="#fff"
                    />}
                >
                    <img
                        src={val.imgUrl}
                        style={style.tileImg}
                        onError={function (e) {
                            e.target.src = defaultImg;
                        }}
                        onTouchTap={() => {
                            if (this.state.isDeletePage) {
                                dataList[ind].isDeleteImg = !dataList[ind].isDeleteImg;
                                this.setState({
                                    data: dataList
                                });
                            } else {
                                linkTo(`user/photoAlbumPreview/${val.id}`, false, null);
                            }
                        }}
                    />
                </Badge>
            );
        });

        return (
            <Paper zDepth={1}>
                {this.state.isPhotoAlbumListPage ? (
                    <div>
                        <AppBar
                            style={{position: 'fixed', top: 0, left: 0}}
                            title="我的相册"
                            showMenuIconButton={false}
                            iconElementRight={
                                <RaisedButton
                                    backgroundColor="#a4c639"
                                    disabledBackgroundColor="#a4c630"
                                    disabled={!dataList.length > 0}
                                    onTouchTap={() => {
                                        this.setState({
                                            isSelectAll: true,
                                            isDeletePage: !this.state.isDeletePage,
                                            data: dataList.filter((item) => {
                                                item.isDeleteImg = false;
                                                return item;
                                            })
                                        });
                                    }}
                                >{this.state.isDeletePage ? '取消' : '编辑'}</RaisedButton>
                            }
                        />

                        <GridList
                            style={{paddingBottom: "65px", paddingTop: "65px"}}
                            cellHeight={100}
                            cols={3}
                        >
                            {PhotoList}
                        </GridList>
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
                                    item.isDeleteImg = this.state.isSelectAll;
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
                            if (item.isDeleteImg) {
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
        data.isDeleteImg = false;
        this.setState({
           data: [data, ...preStateData]
        });
    }

    updateList() {
        const {data} = this.props.result.photoAlbumList || {data: []};
        this.setState({
            data: data.filter((item) => {
                item.isDeleteImg = false;
                return item;
            })
        });
    }

    deleteImg() {
        this.setState({
            isSelectAll: false,
            isDeletePage: false,
            data: this.state.data.filter((item) => {
                if (item.isDeleteImg) {
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

    listenInputChange() {

        let _this = this;

        let file = this.addImgInp.files[0];
        if (file) {
            let reader = new FileReader();
            reader.onload = function() {
                //处理 android 4.1 兼容问题
                let base64 = reader.result.split(',')[1];
                let dataUrl = 'data:image/png;base64,' + base64;

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
            };
            reader.readAsDataURL(file);
        }
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

}


PhotoAlbum.defaultProps = {
    result: {}
};

PhotoAlbum.propTypes = {
    result: PropTypes.object
};

const mapStateToProps = (state, ownPorps) => {
    return {
        result: state.app.photoAlbum
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
