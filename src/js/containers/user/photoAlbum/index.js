/**
 * Created by Zed on 2017/8/1.
 */
import React from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import * as photoAlbumListActions from '../../../actions/photoAlbumListActions';
import {reqHeader} from "../../../utils/comUtils";
import BaseComponent from "../../../components/common/BaseComponent";
import {findDOMNode} from "react-dom";
import $ from 'jquery';
import cropper from 'cropper';
import '../../../../css/cropper.css';
import RaisedButton from 'material-ui/RaisedButton';

import "../../../../sass/me/photoAlbum/index.scss";

const style = {
    title: {
        padding: "10px 15px 0",
        fontSize: "14px",
        marginTop: 0,
        marginBottom: "10px",
        color: "#8f8f94"
    },
    cropPage: {
        width: '100%',
        height: window.screen.width + 'px'
    }
};


class PhotoAlbum extends BaseComponent {
    constructor(props) {
        super(props);

        this.imageIndexIdNum = 0;
        this.imgTarget = null;

        this.state = {
            isPhotoAlbumListPage: true,
            cropPageImg: null
        };

        this.listenInputChange = this.listenInputChange.bind(this);
        this.uploadImg = this.uploadImg.bind(this);
        this.cropImg = this.cropImg.bind(this);
    }

    get cropPageImg() {
        if (!this.refs)
            return {};

        return findDOMNode(this.refs.cropPageImg);
    }

    get addImgInp() {
        if (!this.refs)
            return {};

        return findDOMNode(this.refs.addImgInp);
    }

    componentDidMount() {
        this.props.actions.getPhotoAlbumList({}, reqHeader({}));
    }

    render() {
        let _this = this;
        let {status, data, msg} = this.props.list.photoAlbumListData || {data: []};

        return (
            <div>
                {this.state.isPhotoAlbumListPage ? (
                    <div
                        className="photoAlbumPage"
                    >
                        {data.length > 0 && (
                            <div className="photoList">
                                <p style={style.title}>我的相册</p>
                                {data.map((item) => (
                                    <div
                                        key={item.id}
                                        className="image-item"
                                    >
                                        <img src={item.imgUrl} />
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="addImg">
                            <p style={style.title}>添加图片</p>
                            <div className="image-item">
                                <img src="../../../../img/iconfont-tianjia.png" alt="添加"/>
                                <input
                                    ref="addImgInp"
                                    type="file"
                                    accept="image/*"
                                    onChange={() => {
                                        this.listenInputChange();
                                    }}
                                />
                            </div>
                        </div>

                    </div>
                ) : (
                    <div
                        className="cropPage"
                        style={style.cropPage}
                    >
                        <img
                            ref="cropPageImg"
                            src={this.state.cropPageImg}
                        />

                        <RaisedButton
                            className="cropBtn"
                            label="截图"
                            primary={true}
                            onTouchTap={() => {
                                this.uploadImg(_this.cropPageImg);
                            }}
                            labelPosition="before"
                        />
                    </div>
                )}
            </div>
        );
    }

    cropImg(img) {
        $(img).cropper({
            autoCrop: false,
            viewMode: 1,
            dragMode: 'none',
            zoomable: false,
            cropBoxResizable: false,
            aspectRatio: 1 / 1,
            ready: function () {
                $(this).cropper('crop');
            }
        });
    }

    uploadImg(img) {
        console.log('clickSaveImg');
        let imgCanvas = $(img).cropper('getCroppedCanvas', {
            width: 650,
            fillColor: '#fff',
            imageSmoothingEnabled: false,
            imageSmoothingQuality: 'high'
        });
        imgCanvas.toBlob(blob => {
            console.log(blob);

            this.setState({
                isPhotoAlbumListPage: true
            });
        });
        $(img).cropper('destroy');
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

                _this.setState({
                    isPhotoAlbumListPage: false,
                    cropPageImg: dataUrl
                });

                _this.cropImg(_this.cropPageImg);

            };
            reader.readAsDataURL(file);
        }
    }

}


PhotoAlbum.defaultProps = {
    list: {}
};

PhotoAlbum.propTypes = {
    list: PropTypes.object
};

const mapStateToProps = (state, ownPorps) => {
    return {
        list: state.app.photoAlbumList
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        actions: bindActionCreators(photoAlbumListActions, dispatch)
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PhotoAlbum));
