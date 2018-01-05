/**
 * Created by Zed on 2017/8/1.
 */
import React from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import { getPhotoAlbumList, uploadImg, deleteImg, changeFirstPage } from '../../../actions/userActions';
import { linkTo, reqHeader, toRem } from '../../../utils/comUtils';
import BaseComponent from "../../../components/common/BaseComponent";
import DoneIcon from "material-ui/svg-icons/action/done";

import WxImageViewer from 'react-wx-images-viewer';

import InputBox from "../../../components/photoAlbum";
import intl from 'react-intl-universal';
import ButtonHeader from '../../../components/common/header/ButtonHeader';
import { setGlobAlert } from '../../../actions/common/actions';
import SubmitLoading from '../../../components/common/SubmitLoading';
import RaisedButton from 'material-ui/RaisedButton';
import MyButton from '../../../components/common/MyButton';

const styles = {
    btn: {
        width: toRem(540),
        height: toRem(80),
        borderRadius: toRem(80)
    },
    btnLabelStyle: {
        lineHeight: toRem(80),
        fontSize: toRem(32)
    }
};
class PhotoAlbum extends BaseComponent {
    constructor(props) {
        super(props);
        super.title('我的相册');

        this.state = {
            params: this.props.match.params,
            dataList: [],
            selectItemIds: [],
            isDeletePage: false,
            deleteLoading: false,
            visible: false,
            viewerInd: 0,
            totalCount: 0,
            albumMaxNum: 0
        };

        this.updateList = this.updateList.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.imgTouch = this.imgTouch.bind(this);
        this.close = this.close.bind(this);
        this.uploadEdit = this.uploadEdit.bind(this);
    }

    componentWillMount() {

        const {edit} = this.state.params;
        const recordingFormDataStr = window.sessionStorage.getItem("recordingFormData");
        const recordingFormData = recordingFormDataStr ? JSON.parse(recordingFormDataStr) : null;

        if (typeof edit !== 'undefined' && recordingFormData !== null) {

            let {selectItemIds} = this.state;
            console.log(recordingFormData);

            const imgArr = recordingFormData[edit];

            imgArr.length > 0 && imgArr.map(item => selectItemIds.push(item.id));

            this.setState({
                selectItemIds: selectItemIds,
                recordingFormData: recordingFormData
            });
        }
    }

    componentDidUpdate(preProps) {
        if (preProps.result.photoAlbumListStamp !== this.props.result.photoAlbumListStamp) {
            this.updateList();
        }
    }

    componentDidMount() {

        this.refreshAlbum();
    }

    render() {
        const {dataList, params, totalCount, albumMaxNum, selectItemIds, isDeletePage, visible, viewerInd, deleteLoading} = this.state;
        const {edit} = params;

        // 相册列表编辑页面判断是否全选状态
        const isSelectAll = selectItemIds.length > 0 && selectItemIds.length === dataList.length;

        // InputBox组件所需数据
        const imgList = (() => {
            let imgList = [];
            dataList.map(item => {
                let imgObj = {};
                imgObj.id = item.id;
                imgObj.imgUrl = item.thumbnail;
                imgObj.isShowBadge = selectItemIds.indexOf(item.id) >= 0;
                imgList.push(imgObj);
            });

            return imgList;
        })();

        // Viewer组件所需数据
        const imgUrlList = (() => {
            let imgUrlList = [];
            dataList.map(item => {
                imgUrlList.push(item.thumbnail);
            });

            return imgUrlList;
        })();

        return (
            <section style={{
                paddingTop: toRem(110),
                paddingBottom: toRem(130)
            }}>
                <header>
                    <ButtonHeader
                        style={{
                            position: 'fixed',
                            top: 0,
                            zIndex: 10
                        }}
                        title="我的相册"

                        rightButtonClick={() => {

                            this.setState({
                                isDeletePage: !isDeletePage,
                                selectItemIds: []
                            });
                        }}
                        rightButtonDisabled={!(totalCount > 0)}
                        rightButtonLabel={typeof edit === 'undefined' ? (isDeletePage ? '取消' : '编辑') : null}
                    />
                    <div style={{
                        position: 'fixed',
                        top: '0',
                        left: toRem(170),
                        color: "#ff6832",
                        fontSize: toRem(24),
                        lineHeight: toRem(110),
                        zIndex: 11
                    }}>({totalCount}/{albumMaxNum})</div>
                </header>

                <InputBox
                    cols={3}
                    stopInput={!(totalCount < albumMaxNum)}
                    isShowAddBtn={!isDeletePage}
                    addBtnTouchTap={() => {
                        !(totalCount < albumMaxNum) && this.props.globAlertAction(`最多只能添加${albumMaxNum}张照片哦`);
                    }}
                    badgeStyle={{
                        width: 0,
                        height: 0,
                        borderRadius: 0,
                        backgroundColor: 'none',
                        borderTop: `${toRem(100)} solid #ff6832`,
                        borderLeft: `${toRem(100)} solid transparent`
                    }}
                    badgeContent={<DoneIcon
                        color="#fff"
                        style={{
                            position: 'absolute',
                            top: `-${toRem(92)}`,
                            right: toRem(8)
                        }} />}
                    isShowSelectBorder={true}
                    data={imgList}
                    inputChange={this.inputChange}
                    imgTouchTap={this.imgTouch} />

                {isDeletePage && <footer>
                    <ButtonHeader
                        style={{
                            position: 'fixed',
                            bottom: 0,
                            border: 'none',
                            borderTop: "2px solid #d7d7d7"
                        }}
                        leftButtonClick={() => {

                            const newSelectItemIds = isSelectAll ? [] : (() => {
                                let ids = [];
                                dataList.map(data => {
                                    ids.push(data.id);
                                });
                                return ids;
                            })();

                            this.setState({
                                selectItemIds: newSelectItemIds
                            });
                        }}
                        leftButtonLabel={!isSelectAll ? "全部选择" : "全部不选"}

                        rightButtonClick={() => {
                            this.deleteImgGetter(selectItemIds);
                        }}
                        rightButtonDisabled={selectItemIds.length <= 0}
                        rightButtonLabel='删除'
                    />
                </footer>}

                {visible && <WxImageViewer
                    maxZoomNum={1}
                    onClose={this.close}
                    urls={imgUrlList}
                    index={viewerInd}/>}

                <SubmitLoading hide={!deleteLoading} />

                {typeof edit !== 'undefined' && <div>
                    <MyButton
                        style={{
                            ...styles.btn,
                            position: "absolute",
                            left: "50%",
                            bottom: toRem(120),
                            marginLeft: `-${toRem(540 / 2)}`,
                        }}
                        labelStyle={styles.btnLabelStyle}
                        onClick={this.uploadEdit}
                        label="上传图片"
                        disabled={selectItemIds.length <= 0}
                    />
                    <MyButton
                        style={{
                            ...styles.btn,
                            position: "absolute",
                            left: "50%",
                            bottom: toRem(20),
                            marginLeft: `-${toRem(540 / 2)}`,
                        }}
                        labelStyle={styles.btnLabelStyle}
                        onClick={() => {
                            window.history.back();
                        }}
                        label="取消"
                    />
                </div>}

            </section>
        );
    }

    /**
     * 预览组件关闭
     */
    close() {
        this.setState({
            visible: false
        });
    }

    /**
     * 录音分享编辑完成调用
     */
    uploadEdit() {
        const {recordingFormData, params, selectItemIds} = this.state;
        const {edit, shareId} = params;

        if (edit === 'cover') {
            const {globAlertAction, changeFirstPageAction} = this.props;
            const params = {
                shareId: shareId,
                firstPageId: selectItemIds.join(',')
            };
            this.setState({deleteLoading: true});
            changeFirstPageAction(params, reqHeader(params), res => {
                const {status} = res;
                globAlertAction(parseInt(status, 10) === 1 ? '操作成功' : '操作失败');
                parseInt(status, 10) === 1 && window.history.back();
            });
        } else {
            recordingFormData[edit] = this.pushImgObj();

            window.sessionStorage.setItem("recordingFormData", JSON.stringify(recordingFormData));
            window.history.back();
        }
    }

    /**
     * 数据拼接
     * @param arr
     */
    pushImgObj() {
        let arr = [];
        const {dataList, selectItemIds} = this.state;
        dataList.map(item => {
            if (selectItemIds.indexOf(item.id) >= 0) {
                let imgObj = {};
                imgObj.id = item.id;
                imgObj.imgUrl = item.thumbnail;
                imgObj.isShowBadge = true;
                arr.push(imgObj);
            }
        });
        return arr;
    }

    /**
     * 图片点击事件
     * @param target 被点击图片对象
     */
    imgTouch(target) {

        const {dataList, isDeletePage, params} = this.state;
        const {edit, maxNum} = params;
        const targetId = target.id;

        if (isDeletePage || typeof edit !== "undefined") {

            let {selectItemIds} = this.state;

            const selectItemIdIdn = selectItemIds.indexOf(targetId);
            if (selectItemIdIdn >= 0) {
                selectItemIds.splice(selectItemIdIdn, 1);
            } else {

                if (edit === 'pagePicture' || edit === 'cover') selectItemIds = [];

                if (edit === 'albums' && selectItemIds.length >= maxNum) {
                    this.props.globAlertAction(`最多只能添加${maxNum}张照片哦`);
                } else {
                    selectItemIds.push(dataList.filter(data => {
                        return data.id === targetId;
                    })[0].id);
                }
            }

            this.setState({
                selectItemIds: selectItemIds
            });

        } else {

            let viewerInd = this.state.viewerInd;

            dataList.forEach((val, ind) => {
                viewerInd = val.id === targetId ? ind : viewerInd;
            });

            this.setState({
                visible: true,
                viewerInd: viewerInd
            });
        }
    }

    /**
     * 获取相册列表
     */
    refreshAlbum() {
        const params = {};
        this.props.getPhotoAlbumListActions(params, reqHeader(params));
    }

    /**
     * 用于当页面state更新时，更新页面数据
     */
    updateList() {
        const {data} = this.props.result.photoAlbumList;
        const {result, totalCount, albumMaxNum} = data;
        this.setState({
            albumMaxNum: albumMaxNum,
            totalCount: totalCount,
            dataList: result
        });
    }

    /**
     * 删除图片
     * @param ids 删除图片id[]
     */
    deleteImgGetter(ids) {
        this.setState({
            deleteLoading: true
        });
        let dataList = this.state.dataList;
        const globAlert = this.props.globAlertAction;

        const params = {
            uid: ids.join(',')
        };
        this.props.deleteImgActions(params, reqHeader(params), res => {
            const {status} = res;

            if (parseInt(status, 10) === 1) {
                const newDataList = dataList.filter(item => {
                    return ids.indexOf(item.id) < 0;
                });

                this.setState({
                    dataList: newDataList,
                    totalCount: newDataList.length,
                    selectItemIds: [],
                    deleteLoading: false,
                    isDeletePage: newDataList.length > 0
                });

                globAlert(intl.get("msg.delete.success"));
            } else {

                globAlert(intl.get("msg.delete.fail"));
                this.setState({
                    deleteLoading: false
                });
            }
        });
    }

    /**
     * 监听添加图片时的input[file] onchange事件
     * @param file 图片文件file[0]
     */
    inputChange(file) {
        // console.log(file);

        const reader = new FileReader();
        reader.onload = () => {
            //处理 android 4.1 兼容问题
            const base64 = reader.result.split(',')[1];
            const dataUrl = 'data:image/png;base64,' + base64;
            const sessionKey = 'uploadImageDataUrl';

            window.sessionStorage.setItem(sessionKey, dataUrl);

            linkTo(`user/crop/${sessionKey}`, false, null);
        };
        reader.readAsDataURL(file);
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
        deleteImgActions: bindActionCreators(deleteImg, dispatch),
        changeFirstPageAction: bindActionCreators(changeFirstPage, dispatch),
        globAlertAction: bindActionCreators(setGlobAlert, dispatch)
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PhotoAlbum));
