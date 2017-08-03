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
        display: 'none',
        width: '100%',
        height: window.screen.width + 'px'
    }
};


class PhotoAlbum extends BaseComponent {
    constructor(props) {
        super(props);

        this.imageIndexIdNum = 0;
        this.imgTarget = null;

        this.getFileInputArray = this.getFileInputArray.bind(this);
        this.newPlaceholder = this.newPlaceholder.bind(this);
        this.clickSaveImg = this.clickSaveImg.bind(this);
        this.cropImg = this.cropImg.bind(this);
    }

    get photoAlbumPage() {
        if (!this.refs)
            return {};

        return findDOMNode(this.refs.photoAlbumPage);
    }

    get imageList() {
        if (!this.refs)
            return {};

        return findDOMNode(this.refs.imageList);
    }

    get cropPageImg() {
        if (!this.refs)
            return {};

        return findDOMNode(this.refs.cropPageImg);
    }

    get cropPage() {
        if (!this.refs)
            return {};

        return findDOMNode(this.refs.cropPage);
    }

    get listLen() {
        if (!this.props.list.photoAlbumListData)
            return null;
        return this.props.list.photoAlbumListData.data.length;
    }

    componentDidMount() {
        this.props.actions.getPhotoAlbumList({}, reqHeader({}));
        this.newPlaceholder();
    }

    render() {
        let _this = this;
        let {status, data, msg} = this.props.list.photoAlbumListData || {data: []};

        return (
            <div>

                <div
                    ref="photoAlbumPage"
                    className="photoAlbumPage"
                >
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

                    <div className="addImg">
                        <p style={style.title}>添加图片</p>
                        <div
                            ref="imageList"
                            classID="image-list"
                            className="row image-list"
                            onClick={this.newPlaceholder}
                        >
                        </div>
                    </div>

                </div>

                <div
                    ref="cropPage"
                    className="cropPage"
                    style={style.cropPage}
                >
                    <img ref="cropPageImg"/>

                    <RaisedButton
                        className="cropBtn"
                        label="截图"
                        primary={true}
                        onTouchTap={function() {
                            _this.clickSaveImg(_this.cropPageImg);
                        }}
                        labelPosition="before"
                    />
                </div>

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

    clickSaveImg(img) {
        console.log('clickSaveImg');
        let a = $(img).cropper('getCroppedCanvas', {
            width: 650,
            fillColor: '#fff',
            imageSmoothingEnabled: false,
            imageSmoothingQuality: 'high'
        });
        a.toBlob(blob => {
            console.log(blob);
        });
        console.log(a);
        this.cropPage.style.display = 'none';
        this.photoAlbumPage.style.display = 'block';
        console.log(img);
        this.imgTarget.setAttribute('src', a.toDataURL());
        $(img).cropper('destroy');
    }

    getFileInputArray() {
        return [].slice.call(this.imageList.querySelectorAll('input[type="file"]'));
    }

    newPlaceholder() {
        let _this = this;
        let fileInputArray = this.getFileInputArray();
        if (fileInputArray &&
            fileInputArray.length > 0 &&
            fileInputArray[fileInputArray.length - 1].parentNode.classList.contains('space')) {
            return;
        }
        this.imageIndexIdNum++;
        let placeholder = document.createElement('div');
        placeholder.setAttribute('class', 'image-item space');
        let closeButton = document.createElement('div');
        closeButton.setAttribute('class', 'image-close');
        closeButton.innerHTML = 'X';
        closeButton.addEventListener('click', function(event) {
            event.stopPropagation();
            event.cancelBubble = true;
            setTimeout(function() {
                _this.imageList.removeChild(placeholder);
            }, 0);
            return false;
        }, false);
        let fileInput = document.createElement('input');
        fileInput.setAttribute('type', 'file');
        fileInput.setAttribute('accept', 'image/*');
        fileInput.setAttribute('id', 'image-' + this.imageIndexIdNum);

        let img = document.createElement('img');
        img.setAttribute('src', '../../../../img/iconfont-tianjia.png');


        fileInput.addEventListener('change', function(event) {
            _this.imgTarget = img;
            _this.photoAlbumPage.style.display = 'none';
            _this.cropPage.style.display = 'block';

            let file = fileInput.files[0];
            if (file) {
                let reader = new FileReader();
                reader.onload = function() {
                    //处理 android 4.1 兼容问题
                    let base64 = reader.result.split(',')[1];
                    let dataUrl = 'data:image/png;base64,' + base64;
                    // img.src = dataUrl;
                    //
                    // placeholder.style.backgroundImage = 'url(' + dataUrl + ')';
                    _this.cropPageImg.src = dataUrl;
                    _this.cropImg(_this.cropPageImg);

                };
                reader.readAsDataURL(file);
                placeholder.classList.remove('space');
                _this.newPlaceholder();
            }
        }, false);
        placeholder.appendChild(closeButton);
        placeholder.appendChild(fileInput);
        placeholder.appendChild(img);
        this.imageList.appendChild(placeholder);
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
