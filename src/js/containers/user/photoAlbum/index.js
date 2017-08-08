/**
 * Created by Zed on 2017/8/1.
 */
import React from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import * as photoAlbumActions from '../../../actions/photoAlbumActions';
import {reqHeader} from "../../../utils/comUtils";
import BaseComponent from "../../../components/common/BaseComponent";
import {findDOMNode} from "react-dom";
import $ from 'jquery';
import cropper from 'cropper';

import sysConfig from '../../../utils/sysConfig';
import navUtils from '../../../utils/navUtils';

import '../../../../css/cropper.css';
import RaisedButton from 'material-ui/RaisedButton';
import {GridList, GridTile} from "material-ui/GridList";
import AppBar from 'material-ui/AppBar';
import {Card, CardTitle} from 'material-ui/Card';

import defaultImg from "../../../../img/common/tile_default.jpg";
import addIcon from "../../../../img/iconfont-tianjia.png";

const style = {
    cropPage: {
        width: '100%',
        height: window.screen.width + 'px'
    },
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
        display: "inherit"
    },
    imgDelete: {
        position: 'absolute',
        display: 'inline-block',
        right: '16px',
        top: 0,
        width: '20px',
        height: '20px',
        textAlign: 'center',
        lineHeight: '20px',
        borderRadius: '12px',
        backgroundColor: '#FF5053',
        color: '#f3f3f3',
        border: 'solid 1px #FF5053',
        fontSize: '9px',
        fontWeight: 200,
        zIndex: 1
    },
    addImgBtn: {
        position: 'relative',
        marginLeft: '16px',
        width: '80px',
        height: '80px',
        boxSizing: 'border-box'
    },
    fileInp: {
        position: 'absolute',
        right: 0,
        top: 0,
        width: '100%',
        height: '100%',
        opacity: 0,
        cursor: 'pointer',
        zIndex: 0
    }
};

const imgMax = {
    maxSize: 600 * 1024,
    maxWidth: 650,
    maxHeight: 650,
    screenW: window.screen.width,
    screenH: window.screen.height,
    scaleRate: 0.8
};

let options = {
    autoCrop: false,
    viewMode: 0,
    dragMode: 'move',
    zoomable: true,
    cropBoxResizable: false,
    cropBoxMovable: false,
    aspectRatio: 1 / 1,
    minCropBoxWidth: imgMax.screenW * imgMax.scaleRate,
    minCropBoxHeight: imgMax.screenW * imgMax.scaleRate,
    minCanvasWidth: imgMax.screenW * imgMax.scaleRate,
    ready: null
};


class PhotoAlbum extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            isSelectAll: true,
            isDeletePage: false,
            data: [],
            isPhotoAlbumListPage: true,
            cropPageImgUrl: null
        };

        this.listenInputChange = this.listenInputChange.bind(this);
        this.uploadImg = this.uploadImg.bind(this);
        this.cropImg = this.cropImg.bind(this);
        this.updateList = this.updateList.bind(this);
        this.updateUploadImg = this.updateUploadImg.bind(this);
        this.linkTo = this.linkTo.bind(this);
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
            this.updateUploadImg();
        }
    }

    componentDidMount() {
        const param = {};
        this.props.getPhotoAlbumListActions(param, reqHeader(param));
    }

    render() {
        const data = this.state.data;
        const addBtnDom = (<GridTile key="addBtnDom">
                <img src={addIcon} style={style.tileImg} alt="添加"/>
                <input
                    ref="addImgInp"
                    type="file"
                    accept="image/*"
                    style={style.fileInp}
                    onChange={() => {
                        this.listenInputChange();
                    }}
                />
            </GridTile>);

        let PhotoList = [];
        if (!this.state.isDeletePage) {
            PhotoList.push(addBtnDom);
        }
        data.forEach((val, ind) => {
            PhotoList.push(
                <GridTile
                    key={ind}
                >
                    {this.state.data[ind].isDeleteImg && (<div
                        className="imgDelete"
                        style={style.imgDelete}
                        data-id={val.id}
                        onTouchTap={(e) => {
                            this.deleteImg(e.target);
                        }}
                    >X</div>)}
                    <div style={style.tile}>
                        <img
                            src={val.imgUrl}
                            style={style.tileImg}
                            onError={function (e) {
                                e.target.src = defaultImg;
                            }}
                            onTouchTap={() => {
                                if (this.state.isDeletePage) {
                                    this.state.data[ind].isDeleteImg = !this.state.data[ind].isDeleteImg;
                                    this.setState({
                                        data: this.state.data
                                    });
                                } else {
                                    this.linkTo(`user/photoAlbumPreview/${ind}`, false, null);
                                }
                            }}
                        />
                    </div>
                </GridTile>
            );
        });

        return (
            <div>
                {this.state.isPhotoAlbumListPage ? (
                    <div
                        className="photoAlbumPage"
                    >
                        <Card className="photoList">
                            <CardTitle
                                title="我的相册"
                                subtitle={data.length > 0 && (
                                    <div
                                        style={{position: 'absolute', right: '20px', top: '12px'}}
                                        onTouchTap={() => {
                                            this.setState({
                                                isSelectAll: true,
                                                isDeletePage: !this.state.isDeletePage,
                                                data: data.filter((item) => {
                                                    item.isDeleteImg = false;
                                                    return item;
                                                })
                                            });
                                        }}
                                    >{this.state.isDeletePage ? '取消' : '编辑'}</div>)}
                            />
                            <GridList
                                cellHeight={100}
                                style={{margin: "6px"}}
                                cols={3}
                            >

                                {PhotoList}

                                {/*{data.map((tile) => (
                                    <GridTile
                                        key={tile.id}
                                        titleBackground="transparent"
                                        onTouchStart={() => {
                                            console.log('touchStart');
                                            this.showDeleteBtnTimer = setTimeout(() => {
                                                this.setState({
                                                    isDeleteImg: true
                                                });
                                            }, 2000);
                                        }}
                                        onTouchEnd={() => {
                                            console.log('touchEnd');
                                            clearTimeout(this.showDeleteBtnTimer);
                                        }}
                                        onTouchMove={() => {
                                            console.log('touchMove');
                                            clearTimeout(this.showDeleteBtnTimer);
                                        }}
                                    >
                                        {this.state.isDeleteImg && <div className="imgDelete" style={style.imgDelete}>X</div>}
                                        <div style={style.tile}>
                                            <img src={tile.imgUrl} style={style.tileImg} onError={function (e) {
                                                e.target.src = defaultImg;
                                            }}/>
                                        </div>
                                    </GridTile>
                                ))}*/}
                            </GridList>
                        </Card>

                        {/*<Card className="addImg">
                            <CardTitle title="添加照片"/>
                            <div className="addImgBtn" style={style.addImgBtn}>
                                <img src={addIcon} style={style.tileImg} alt="添加"/>
                                <input
                                    ref="addImgInp"
                                    type="file"
                                    accept="image/*"
                                    style={style.fileInp}
                                    onChange={() => {
                                        this.listenInputChange();
                                    }}
                                />
                            </div>
                        </Card>*/}

                    </div>
                ) : (
                    <div
                        className="cropPage"
                        style={style.cropPage}
                    >
                        <div
                            style={{width: imgMax.screenW, height: imgMax.screenH}}
                        >
                            <img
                                ref="cropPageImgDom"
                                style={{width: '100%', height: 'auto'}}
                                src={this.state.cropPageImgUrl}
                            />
                        </div>

                        <div
                            style={{position: 'fixed', bottom: 0, left: 0}}
                        >
                            <RaisedButton
                                className="cropCancelBtn"
                                label="取消"
                                primary={true}
                                onTouchTap={(e) => {
                                    e.preventDefault();
                                    this.setState({
                                        isPhotoAlbumListPage: true
                                    });
                                    $(this.cropPageImgDom).cropper('destroy');
                                }}
                            />

                            <RaisedButton
                                className="cropBtn"
                                label="截图"
                                primary={true}
                                onTouchTap={(e) => {
                                    e.preventDefault();
                                    this.uploadImg(this.cropPageImgDom);
                                }}
                            />
                        </div>
                    </div>
                )}

                {this.state.isDeletePage && (<AppBar
                    iconElementLeft={<div
                        onTouchTap={() => {
                            this.setState({
                                isSelectAll: !this.state.isSelectAll,
                                data: data.filter((item) => {
                                    item.isDeleteImg = this.state.isSelectAll;
                                    return item;
                                })
                            });
                        }}
                    >{this.state.isSelectAll ? ('全部选择') : ('全部不选')}</div>}
                    iconElementRight={<RaisedButton
                        label="删除"
                        disabled={data.filter((item) => {
                            if (item.isDeleteImg) {
                                return item;
                            }
                        }).length <= 0}
                        onTouchTap={() => {
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
                        }}
                    />}
                />)}
            </div>
        );
    }

    updateUploadImg() {
        const preStateData = this.state.data;
        const {data} = this.props.result.photoAlbumUpload || {data: {}};
        this.setState({
           data: [data, ...preStateData].filter((item) => {
               item.isDeleteImg = false;
               return item;
           })
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

    deleteImg(target) {
        const param = {
            id: target.dataset.id
        };

        this.props.deleteImgActions(param, reqHeader(param), () => {
            let box = target.parentNode.parentNode;

            box.parentNode.removeChild(box);
        });
    }

    cropImg(img) {
        $(img).cropper(options);
    }

    uploadImg(img) {
        console.log('clickSaveImg');
        let imgCanvas = $(img).cropper('getCroppedCanvas', {
            width: 650,
            fillColor: '#fff',
            imageSmoothingEnabled: false,
            imageSmoothingQuality: 'high'
        });

        const param = {};
        this.props.uploadImgActions(param, reqHeader(param), () => {
            this.setState({
                isPhotoAlbumListPage: true
            });
        });
        $(img).cropper('destroy');

        imgCanvas.toBlob(blob => {
            console.log(blob);

        });
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
                    alert(width + '---' + height);

                    options.ready = function () {
                        $(this).cropper('scale', imgMax.scaleRate, imgMax.scaleRate);
                        $(this).cropper('crop');
                    };

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

    /**
     * 前往指定的页面
     * @param  {[type]} link         页面path
     * @param  {[type]} requireLogin 是否需要登录
     * @return {[type]}              [description]
     */
    linkTo(link, requireLogin, info) {
        let fullLink;
        if (link.indexOf('http') === 0) {
            fullLink = link;
            location.href = link;
            return;
        } else {
            fullLink = sysConfig.contextPath + link;
        }

        if (requireLogin) {
            navUtils.forward(sysConfig.contextPath + '/login');
        } else {
            navUtils.forward(fullLink);
        }
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
        getPhotoAlbumListActions: bindActionCreators(photoAlbumActions.getPhotoAlbumList, dispatch),
        uploadImgActions: bindActionCreators(photoAlbumActions.uploadImg, dispatch),
        deleteImgActions: bindActionCreators(photoAlbumActions.deleteImg, dispatch)
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PhotoAlbum));
