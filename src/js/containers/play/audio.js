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
import Avatar from 'material-ui/Avatar';
import defaultAvatar from "../../../img/default_avatar.png";
import { getAllPics, uploadSoundAlbum } from '../../actions/userActions';
import { setGlobAlert } from '../../actions/common/actions';
import MyButton from '../../components/common/MyButton';
import navUtils from '../../utils/navUtils';

const AutoPlaySwipeAbleViews = autoPlay(SwipeAbleViews);

const styles = {
    center: {
      marginTop: toRem(20),
      paddingRight: 16,
      textAlign: "center",
      fontSize: '.4rem',
      lineHeight: '.6rem'
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
            autoPlayEd: false
        };

        this.loadAudioGetter = this.loadAudioGetter.bind(this);
        this.toEdit = this.toEdit.bind(this);
    }

    componentWillMount() {
        this.loadAudioGetter();
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
                        link: `${location.protocol}//${location.host}/recording/play/${this.state.params.uid}/${shareId}?language=${getQueryString('language')}`,
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

        const {params} = this.state;
        const ableEdit = params.edit === 'edit';

        const banners = (albums && albums.length > 0) ? albums : (pagePictureId ? [{picid: pagePictureId, picurl: pagePictureUrl}] : [{picid: 123456789, picurl: SlidePng1}]);

        console.log(pagePictureId);

        return (
            <div className="audio-play">
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
        );
    }

    /**
     * 获取录音分享数据
     */
    loadAudioGetter() {
        const {uid, shareId} = this.state.params;
        let params = {
            uid: uid || null
        };

        shareId ? params.shareId = shareId : params.openid = getQueryString("openid");

        this.props.getShareAudioAction(params, reqHeader(params));
    }

    /**
     * 跳转编辑页面
     * @param uid 录音的uid
     * @param shareId 录音的shareId
     */
    toEdit(shareId) {
        navUtils.replace(`${this.state.params.uid}/${shareId}?language=${getQueryString('language')}`);
        linkTo(`editRecord/${shareId}`, false, null);
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
