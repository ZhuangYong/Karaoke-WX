import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import { linkTo, reqHeader, toRem } from '../../utils/comUtils';

import PropTypes from "prop-types";
import BaseComponent from "../../components/common/BaseComponent";
import ButtonHeader from '../../components/common/header/ButtonHeader';
import InputBox from '../../components/photoAlbum/index';
import ClearIcon from "material-ui/svg-icons/content/clear";
import { getAllPics, uploadSoundAlbum } from '../../actions/audioActons';
import { setGlobAlert } from '../../actions/common/actions';
import SubmitLoading from '../../components/common/SubmitLoading';
import MyButton from '../../components/common/MyButton';
import intl from 'react-intl-universal';
import Const from '../../utils/const';


const styles = {
    itemStyle: {
        margin: 0,
        padding: `0 ${toRem(5)}`,
        width: toRem(140),
        height: toRem(140)
    },
    badgeStyle: {
        top: `-${toRem(5)}`,
        right: `-${toRem(2)}`,
        width: "20px",
        height: "20px"
    },
    clearIconStyle: {
        width: "20px",
        height: "20px",
        color: "#fff"
    },
    btn: {
        position: "absolute",
        left: "50%",
        bottom: toRem(80),
        marginLeft: `-${toRem(540 / 2)}`,
        width: toRem(540),
        height: toRem(100),
        borderRadius: toRem(100)
    },
    btnLabelStyle: {
        lineHeight: toRem(100),
        fontSize: toRem(32)
    }
};

const CONFIG = {
    ALBUMS_MAX: 3
};

class EditRecord extends BaseComponent {

    constructor(props) {
        super(props);
        super.title(intl.get('title.recording.edit'));
        this.state = {
            params: this.props.match.params,
            recordingFormData: {pagePicture: [], albums: []},
            loading: false,
            isRemoveSession: false
        };

        this.cancel = this.cancel.bind(this);
        this.addBtnTouchTap = this.addBtnTouchTap.bind(this);
        this.submit = this.submit.bind(this);
    }

    componentWillMount() {
        const recordingFormDataStr = window.sessionStorage.getItem(Const.ALBUM_SESSION_KEY);

        if (recordingFormDataStr === null) {
            this.getAllPicsGetter();
        } else {
            const recordingFormData = recordingFormDataStr ? JSON.parse(recordingFormDataStr) : {pagePicture: [], albums: []};

            this.setState({
                recordingFormData: recordingFormData
            });
        }
    }

    componentWillUnmount() {
        this.state.isRemoveSession && window.sessionStorage.removeItem(Const.ALBUM_SESSION_KEY);
    }

    render() {

        const {recordingFormData, loading} = this.state;

        return (
            <section>
                <header>
                    <ButtonHeader
                        isShowLeftButton={false}
                        title={intl.get('title.recording.edit')}
                        rightButtonClick={this.cancel}
                        rightButtonLabel={intl.get('button.cancel')}
                    />
                </header>

                <section style={{clear: 'both'}}>
                    <header style={{paddingBottom: toRem(20)}}>
                        <ButtonHeader
                            style={{
                                background: "none",
                                border: "none"
                            }}
                            title={`${intl.get('recording.chose.cover')}（${(recordingFormData.pagePicture.length) || 0}/1）`} />
                    </header>

                    <InputBox
                        cols={5}
                        stopInput={true}
                        addBtnTouchTap={() => {
                            this.addBtnTouchTap("pagePicture");
                        }}
                        isShowAddBtn={!recordingFormData.pagePicture.length}
                        itemStyle={styles.itemStyle}
                        badgeBackgroundColor="#ce0000"
                        badgeContent={<ClearIcon
                            style={styles.clearIconStyle}
                        />}
                        badgeContentClick={id => {
                            recordingFormData.pagePicture = [];
                            this.setState({
                                recordingFormData: recordingFormData
                            });
                        }}
                        badgeStyle={styles.badgeStyle}
                        data={recordingFormData.pagePicture}
                        inputChange={this.inputChange}/>

                </section>

                <section>
                    <header style={{paddingBottom: toRem(20)}}>
                        <ButtonHeader
                            style={{
                                background: "none",
                                border: "none"
                            }}
                            title={`${intl.get('recording.chose.carousel')}（${(recordingFormData.albums.length) || 0}/${CONFIG.ALBUMS_MAX}）`} />
                    </header>

                    <InputBox
                        cols={5}
                        stopInput={true}
                        addBtnTouchTap={() => {
                            this.addBtnTouchTap("albums");
                        }}
                        isShowAddBtn={recordingFormData.albums.length < CONFIG.ALBUMS_MAX}
                        itemStyle={styles.itemStyle}
                        badgeBackgroundColor="#ce0000"
                        badgeContent={<ClearIcon
                            style={styles.clearIconStyle}
                        />}
                        badgeContentClick={id => {
                            recordingFormData.albums = recordingFormData.albums.filter(item => {
                                return parseInt(item.id, 10) !== parseInt(id, 10);
                            });
                            this.setState({
                                recordingFormData: recordingFormData
                            });
                        }}
                        badgeStyle={styles.badgeStyle}
                        data={recordingFormData.albums}
                        inputChange={this.inputChange}/>

                </section>

                <MyButton
                    style={styles.btn}
                    labelStyle={styles.btnLabelStyle}
                    onClick={this.submit}
                    label={intl.get('button.submit')}
                    disabled={this.checkDataChange(recordingFormData)}
                />

                <SubmitLoading hide={!loading} />

            </section>
        );
    }

    /**
     * 检查图片数据是否变化
     */
    checkDataChange(recordingFormData) {
        const { data } = this.props.audio.allPicsData;
        const { albums, pagePictureId } = data || {};
        // console.log(pagePictureId);

        let isCoverEquals = false;
        if (pagePictureId && recordingFormData.pagePicture[0]) {
            isCoverEquals = pagePictureId === recordingFormData.pagePicture[0].id;
        } else if (pagePictureId === 0 && typeof recordingFormData.pagePicture[0] === 'undefined') {
            isCoverEquals = true;
        }


        let isAlbumsEquals = false;
        if (albums && (albums.length === recordingFormData.albums.length)) {
            let bools = [];
            albums && albums.map(originAlbum => {
                recordingFormData.albums.map(cacheAlbum => {
                    originAlbum.picid === cacheAlbum.id && bools.push(true);
                });
            });

            isAlbumsEquals = bools.length === albums.length;
        }

        return isCoverEquals && isAlbumsEquals;
    }

    /**
     * 获取录音分享数据
     */
    getAllPicsGetter() {

        const getAllPicsParams = {shareId: this.state.params.shareId};

        const {getAllPicsActions, globAlertAction} = this.props;
        getAllPicsActions(getAllPicsParams, reqHeader(getAllPicsParams), data => {
            const {albums, pagePictureId, pagePictureUrl, shareId} = data;

            let recordingFormData = {pagePicture: [], albums: []};

            albums && albums.map(item => {
                recordingFormData.albums.push({
                    id: item.picid,
                    imgUrl: item.picurl,
                    isShowBadge: true
                });
            });

            pagePictureId && recordingFormData.pagePicture.push({
                id: pagePictureId,
                imgUrl: pagePictureUrl,
                isShowBadge: true
            });

            recordingFormData.isEdit = true;
            recordingFormData.shareId = shareId;

            this.setState({
                recordingFormData: recordingFormData
            });
        });
    }

    /**
     * 编辑提交
     */
    submit() {
        this.setState({loading: true});
        const {uploadActions, globAlertAction} = this.props;
        const {recordingFormData, params} = this.state;
        const {pagePicture, albums} = recordingFormData;
        const uploadParams = {};

        uploadParams.shareId = params.shareId;

        if (pagePicture[0]) uploadParams.firstPageId = pagePicture[0].id;

        if (albums.length > 0) {
            let albumArr = [];
            albums.map(item => {
                albumArr.push(item.id);
            });
            uploadParams.albumIds = albumArr.join(',');
        }

        uploadActions(uploadParams, reqHeader(uploadParams), res => {
            this.cancel();
            this.setState({loading: false});
            globAlertAction(intl.get('feedback.submit.success'));
        }, err => {
            this.setState({loading: false});
        });
    }

    /**
     * 添加图片按钮点击事件
     * @param edit
     */
    addBtnTouchTap(edit) {

        window.sessionStorage.setItem(Const.ALBUM_SESSION_KEY, JSON.stringify(this.state.recordingFormData));

        linkTo(`user/photoAlbum/${edit}/${edit === "albums" ? CONFIG.ALBUMS_MAX : 1}`, false, null);
    }

    /**
     * 跳转回播放页面
     */
    cancel() {
        window.history.back();
        this.setState({
           isRemoveSession: true
        });
    }

}

const mapStateToProps = (state, ownPorps) => {
    return {
        audio: state.app.audio,
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        uploadActions: bindActionCreators(uploadSoundAlbum, dispatch),
        getAllPicsActions: bindActionCreators(getAllPics, dispatch),
        globAlertAction: bindActionCreators(setGlobAlert, dispatch)
    };
};

EditRecord.defaultProps = {
    audio: {
        audioInfo: {},
        allPicsData: {},
    }
};

EditRecord.propTypes = {
    audio: PropTypes.object
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditRecord));

