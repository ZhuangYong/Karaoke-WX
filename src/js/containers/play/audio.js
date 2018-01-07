import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import "../../../sass/audio/playAudio.scss";
import {getShareAudio} from "../../actions/audioActons";
import Audio from "../../components/audio";
import { getQueryString, linkTo, parseTime, reqHeader, toRem, wxAuthorizedUrl, wxShare } from '../../utils/comUtils';
import sysConfig from "../../utils/sysConfig";

import SwipeAbleViews from 'react-swipeable-views';
import {autoPlay} from 'react-swipeable-views-utils';
import PropTypes from "prop-types";
import {Subheader} from "material-ui";
import BaseComponent from "../../components/common/BaseComponent";
import SlidePngMall1 from "../../../img/mall/video.png";
import SlidePng1 from "../../../img/album/1.png";
import SlidePng2 from "../../../img/album/2.png";
import SlidePng3 from "../../../img/album/3.png";
import intl from 'react-intl-universal';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import defaultAvatar from "../../../img/default_avatar.png";
import ButtonHeader from '../../components/common/header/ButtonHeader';
import InputBox from '../../components/photoAlbum/index';
import ClearIcon from "material-ui/svg-icons/content/clear";
import { getAllPics, uploadSoundAlbum } from '../../actions/userActions';
import { setGlobAlert } from '../../actions/common/actions';
import SubmitLoading from '../../components/common/SubmitLoading';
import MyButton from '../../components/common/MyButton';

const AutoPlaySwipeAbleViews = autoPlay(SwipeAbleViews);

const styles = {
    center: {
      marginTop: toRem(20),
      paddingRight: 16,
      textAlign: "center",
      fontSize: '.4rem',
      lineHeight: '.6rem'
    },
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
        width: toRem(540),
        height: toRem(100),
        borderRadius: toRem(100)
    },
    btnLabelStyle: {
        lineHeight: toRem(100),
        fontSize: toRem(32)
    }
};

const defaultRecordingFormData = {
    isEdit: false,
    pagePicture: [],
    albums: [],
    shareId: null
};

const CONFIG = {
    ALBUMS_MAX: 10
};

class PlayAudio extends BaseComponent {

    constructor(props) {
        super(props);
        super.title(intl.get("title.audio.share"));
        this.state = {
            audio: {},
            params: this.props.match.params,
            percent: 0,
            currentTime: 0,
            wxTimer: -1,
            imgUrl: "",
            autoPlayEd: false,
            recordingFormData: {...defaultRecordingFormData},
            loading: false
        };

        this.loadAudioGetter = this.loadAudioGetter.bind(this);
        this.toEdit = this.toEdit.bind(this);
        this.cancel = this.cancel.bind(this);
        this.addBtnTouchTap = this.addBtnTouchTap.bind(this);
        this.submit = this.submit.bind(this);
    }

    componentWillMount() {
        const recordingFormDataStr = window.sessionStorage.getItem("recordingFormData");

        if (recordingFormDataStr === null) {
            this.loadAudioGetter();
        } else {
            const recordingFormData = recordingFormDataStr ? JSON.parse(recordingFormDataStr) : Object.assign({}, defaultRecordingFormData, {pagePicture: [], albums: []});

            this.setState({
                recordingFormData: recordingFormData
            });
        }
    }

    componentDidUpdate() {
        const {imgUrl, autoPlayEd} = this.state;
        const {data} = this.props.audio.audioInfo;
        if (data && !autoPlayEd) {
            const {musicUrl, nameNorm, shareId, headerImg} = data;
            const {isWeixin} = window.sysInfo;
            if (isWeixin) {
                window.wx && window.wx.ready(() => {
                    this.refs.audio.refs.audio.refs.audio.play();
                    this.state.autoPlayEd = true;
                    wxShare({
                        title: intl.get("audio.share.title", {name: nameNorm}),
                        desc: intl.get("audio.share.from"),
                        link: `${location.protocol}//${location.host}/recording/play/${shareId}?language=${getQueryString('language')}`,
                        imgUrl: imgUrl === "" ? headerImg : imgUrl,
                        dataUrl: musicUrl
                    });
                });
            } else {
                this.refs.audio.refs.audio.refs.audio.play();
                this.setState({
                    autoPlayEd: true
                });
            }
        }
    }

    componentWillUnmount() {
        const {isWeixin} = window.sysInfo;
        if (isWeixin) {
            window.wx && window.wx.ready(() => {

                wxShare({
                    title: intl.get("audio.we.chat.song"),
                    desc: intl.get("audio.share.from"),
                    link: wxAuthorizedUrl(sysConfig.appId, sysConfig.apiDomain, location.protocol + "//" + location.host),
                    imgUrl: "http://wx.j-make.cn/img/logo.png",
                    dataUrl: null
                });
            });
        }
    }

    render() {
        this.refs.audio && console.log(window.audio = this.refs.audio.refs.audio.refs.audio);
        const {w, h} = this.props.common;
        const {status, data, msg} = this.props.audio.audioInfo;
        const {musicUrl, musicTime, nameNorm, headerImg, nickName, albums, pagePictureId, pagePictureUrl, shareId} = data || {};
        let swipePanelStyle = {};
        let topPanelStyle = {};
        if (w > h) {
            swipePanelStyle.height = "5.867rem";
            swipePanelStyle.width = "5.867rem";
            // swipePanelStyle.overflow = "hidden";
            topPanelStyle.marginTop = ".4rem";
        }

        super.title((nameNorm || intl.get("title.audio.share")) + "-" + intl.get("audio.bring.karaoke.home"));

        const {params, recordingFormData, loading} = this.state;
        const {isEdit} = recordingFormData || {};
        const ableEdit = params.edit === 'edit';

        const banners = (albums && albums.length > 0) ? albums : (pagePictureId ? [{picid: pagePictureId, picurl: pagePictureUrl}] : [{picid: 123456789, picurl: SlidePng1}]);

        console.log(pagePictureId);

        return (
            <div className="audio-play">

                {
                    isEdit ? <section>
                        <header>
                            <ButtonHeader
                                isShowLeftButton={false}
                                title="编辑录音"
                                rightButtonClick={this.cancel}
                                rightButtonLabel="取消"
                            />
                        </header>

                        <section>
                            <header style={{paddingBottom: toRem(20)}}>
                                <ButtonHeader
                                    style={{
                                        background: "none",
                                        border: "none"
                                    }}
                                    title={`选择封面图（${(recordingFormData.pagePicture.length) || 0}/1）`} />
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
                                    onClick={(e) => {
                                        recordingFormData.pagePicture = [];
                                        this.setState({
                                            recordingFormData: recordingFormData
                                        });
                                    }}
                                />}
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
                                    title={`选择轮播图（${(recordingFormData.albums.length) || 0}/${CONFIG.ALBUMS_MAX}）`} />
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
                                    onClick={(e) => {
                                        const deleteId = e.target.parentNode.parentNode.dataset.id;
                                        recordingFormData.albums = recordingFormData.albums.filter(item => {
                                            return parseInt(item.id, 10) !== parseInt(deleteId, 10);
                                        });
                                        this.setState({
                                            recordingFormData: recordingFormData
                                        });
                                    }}
                                />}
                                badgeStyle={styles.badgeStyle}
                                data={recordingFormData.albums}
                                inputChange={this.inputChange}/>

                        </section>

                        <MyButton
                            style={{
                                ...styles.btn,
                                position: "absolute",
                                left: "50%",
                                bottom: toRem(80),
                                marginLeft: `-${toRem(540 / 2)}`,
                            }}
                            labelStyle={styles.btnLabelStyle}
                            onClick={this.submit}
                            label="提交"
                            disabled={!(recordingFormData.albums.length > 0 || recordingFormData.pagePicture.length > 0)}
                        />

                    </section> : <div>
                        <div className="top-panel" style={topPanelStyle}>
                            <AutoPlaySwipeAbleViews className="swipe-panel" style={{overflow: 'hidden', ...swipePanelStyle}}>
                                {banners.map(item => <div key={item.picid} className="img-div"><img src={item.picurl}/></div>)}
                            </AutoPlaySwipeAbleViews>
                            <Audio ref="audio" source={musicUrl} className="audio-item"/>
                        </div>
                        <p className="song-label">
                            <font style={{fontSize: '.4rem'}}>{nameNorm || "..."}</font>
                        </p>

                        <section style={{paddingTop: toRem(40), borderTop: `${toRem(10)} solid #d7d7d7`}}>

                            <header style={{
                                position: "relative",
                                left: "50%",
                                marginLeft: `-${toRem(130)}`,
                                height: toRem(100)
                            }}>

                                <Avatar style={{
                                    float: "left",
                                    width: toRem(85),
                                    height: toRem(85),
                                    backgroundColor: "rgba(255, 255, 255)",
                                    background: `url(${defaultAvatar}) no-repeat center`,
                                    backgroundSize: "cover"
                                }} src={headerImg} alt=""/>

                                <div style={{
                                    float: "left",
                                    marginLeft: toRem(23)
                                }}>
                                    <div style={{
                                        height: toRem(50),
                                        lineHeight: toRem(50),
                                        fontSize: toRem(30)
                                    }}>{nickName || intl.get("device.anonymous")}</div>
                                    <p style={{fontSize: '.32rem', height: '.4rem', margin: 0, color: "#9a9a9b"}}>{musicTime ? parseTime(parseInt(musicTime, 10)) : "..."}</p>
                                </div>
                            </header>
                            <Subheader style={styles.center}>
                                {ableEdit ? <MyButton
                                    style={styles.btn}
                                    labelStyle={styles.btnLabelStyle}
                                    onClick={() => this.toEdit(shareId)}
                                    label="去编辑"
                                    disabled={parseInt(status, 10) !== 1}
                                /> : <div>{intl.get("audio.nice.song.to.share", {name: nameNorm || "..."})}</div>}

                            </Subheader>

                            <Subheader style={{...styles.center, bottom: '.8rem'}}>
                                <p style={{color: '#ff6832', fontSize: '.32rem'}}>{ableEdit ? "唱得太棒了，不用编辑也可以直接分享哦" : intl.get("msg.from.j.make")}</p>
                            </Subheader>

                        </section>

                        <img src={headerImg} style={{display: "none"}} onError={() => {
                            this.setState({
                                imgUrl: "http://wx.j-make.cn/img/logo.png"
                            });
                        }}/>
                    </div>
                }

                <SubmitLoading hide={!loading} />

            </div>
        );
    }

    /**
     * 获取录音分享数据
     */
    loadAudioGetter(id) {
        const {uid, shareId} = this.state.params;
        let params = {
            uid: uid || null
        };

        id ? params.shareId = id : (shareId ? params.shareId = shareId : params.openid = getQueryString("openid"));

        this.props.getShareAudioAction(params, reqHeader(params));
    }

    /**
     * 编辑提交
     */
    submit() {
        this.setState({loading: true});
        const {uploadActions, globAlertAction} = this.props;
        const {recordingFormData} = this.state;
        const {shareId, pagePicture, albums} = recordingFormData;
        const params = {};

        params.shareId = shareId;

        if (pagePicture[0]) params.firstPageId = pagePicture[0].id;

        if (albums.length > 0) {
            let albumArr = [];
            albums.map(item => {
                albumArr.push(item.id);
            });
            params.albumIds = albumArr.join(',');
        }

        uploadActions(params, reqHeader(params), res => {
            const {status} = res;
            if (parseInt(status, 10) === 1) {

                // this.loadAudioGetter(shareId);
                this.cancel();
            }

            this.setState({loading: false});
            globAlertAction(parseInt(status, 10) === 1 ? "提交成功" : "提交失败");
        });
    }

    /**
     * 添加图片按钮点击事件
     * @param edit
     */
    addBtnTouchTap(edit) {

        window.sessionStorage.setItem("recordingFormData", JSON.stringify(this.state.recordingFormData));

        linkTo(`user/photoAlbum/${edit}/${edit === "albums" ? CONFIG.ALBUMS_MAX : 1}`, false, null);
    }

    /**
     * 跳转编辑页面
     * @param shareId 录音的shareId
     */
    toEdit(shareId) {
        const getAllPicsParams = {shareId: shareId};

        const {getAllPicsActions, globAlertAction} = this.props;

        getAllPicsActions(getAllPicsParams, reqHeader(getAllPicsParams), res => {
            const {status, data} = res;
            if (parseInt(status, 10) === 1) {
                const {albums, pagePictureId, pagePictureUrl} = data;

                let recordingFormData = Object.assign({}, defaultRecordingFormData, {pagePicture: [], albums: []});

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
            } else {
                globAlertAction("获取录音相关图片失败");
            }
        });

    }

    /**
     * 跳转回播放页面
     */
    cancel() {

        this.setState({
            recordingFormData: Object.assign({}, defaultRecordingFormData, {pagePicture: [], albums: []})
        });
        window.sessionStorage.removeItem("recordingFormData");
    }

    handlePercentChange(_percent) {
        const audio = this.state.audio;
        audio.currentTime = _percent / 100 * audio.duration;
        this.setState({
            percent: _percent / 100,
            currentTime: audio.currentTime
        });
    }

}

const mapStateToProps = (state, ownPorps) => {
    return {
        audio: state.app.audio,
        common: state.app.common
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getShareAudioAction: bindActionCreators(getShareAudio, dispatch),
        uploadActions: bindActionCreators(uploadSoundAlbum, dispatch),
        getAllPicsActions: bindActionCreators(getAllPics, dispatch),
        globAlertAction: bindActionCreators(setGlobAlert, dispatch)
    };
};

PlayAudio.defaultProps = {
    audio: {
        audioInfo: {}
    }
};

PlayAudio.propTypes = {
    audio: PropTypes.object
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PlayAudio));
