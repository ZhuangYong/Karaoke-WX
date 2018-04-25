import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import "../../../sass/audio/playAudio.scss";
import {getShareAudio} from "../../actions/audioActons";
import Audio from "../../components/audio";
import {
    getEncryptHeader, getQueryString, linkTo, parseTime, reqHeader, toRem, wxAuthorizedUrl,
    wxShare
} from '../../utils/comUtils';
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
import SlideK1Png1 from "../../../img/album/k1/1.png";
import SlideK1Png2 from "../../../img/album/k1/2.png";
import _ from "lodash";
import intl from 'react-intl-universal';
import Avatar from 'material-ui/Avatar';
import defaultAvatar from "../../../img/default_avatar.png";
import { setGlobAlert } from '../../actions/common/actions';
import MyButton from '../../components/common/MyButton';
import Const from "../../utils/const";

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

const defaultCover = 'http://wechat.j-make.cn/img/logo.png';

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
            musicUrl: "",
            imgUrl: "",
            customerSliders: [], // 客户需求轮播图
            customerAd: intl.get("msg.from.j.make"), // 客户需求广告语
            autoPlayEd: false
        };

        this.loadAudioGetter = this.loadAudioGetter.bind(this);
        this.toEdit = this.toEdit.bind(this);
    }

    componentDidMount() {

        this.loadAudioGetter();
    }

    componentDidUpdate() {
        const {autoPlayEd, params} = this.state;
        const {data} = this.props.audio.audioInfo;
        if (data && !autoPlayEd) {
            const {isWeixin} = window.sysInfo;
            if (isWeixin) {
                window.wx && window.wx.ready(() => {
                    this.refs.audio.refs.audio.refs.audio.play();
                    this.state.autoPlayEd = true;
                });
            } else {
                this.refs.audio.refs.audio.refs.audio.play();
                this.setState({
                    autoPlayEd: true
                });
            }

            // k1特性
            const {channel} = data;
            if (Const.CHANNEL_CODE_K1_LIST.indexOf(channel) >= 0) {
                const sliderImgs = [SlideK1Png1, SlideK1Png2];
                if (!_.isEqual(sliderImgs, this.state.customerSliders)) {
                    this.setState({
                        customerAd: intl.get("audio.share.from.k1"),
                        customerSliders: sliderImgs
                    });
                }
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
                    imgUrl: defaultCover,
                    dataUrl: null
                });
            });
        }

        window.sessionStorage.removeItem('isRecordingEdit');
    }

    render() {
        if (this.refs.audio) window.audio = this.refs.audio.refs.audio.refs.audio;
        const {w, h} = this.props.common;
        const {status, data, msg} = this.props.audio.audioInfo;
        const {musicUrl, musicTime, nameNorm, headerImg, nickName, albums, pagePictureId, pagePictureUrl, shareId, channel} = data || {};
        // const isK1 = Const.CHANNEL_CODE_K1_LIST.indexOf(channel) >= 0;
        let swipePanelStyle = {};
        let topPanelStyle = {};
        if (w > h) {
            swipePanelStyle.height = "5.867rem";
            swipePanelStyle.width = "5.867rem";
            // swipePanelStyle.overflow = "hidden";
            topPanelStyle.marginTop = ".4rem";
        }

        super.title((nameNorm || intl.get("title.audio.share")) + "-" + intl.get("audio.bring.karaoke.home"));

        const ableEdit = window.sessionStorage.getItem('isRecordingEdit') === 'true';
        // const ableEdit = params.edit === false;

        const banners = (albums && albums.length > 0) ? albums : (pagePictureId ? [{picid: pagePictureId, picurl: pagePictureUrl}] : [{picid: 123456789, picurl: SlidePng1}]);

        const { customerSliders, customerAd } = this.state;

        return (
            <div className="audio-play">
                <div className="top-panel" style={topPanelStyle}>
                    <AutoPlaySwipeAbleViews disabled className="swipe-panel" style={{overflow: 'hidden', ...swipePanelStyle}}>
                        {
                            customerSliders.map((imgUrl, index) => {
                                return imgUrl.indexOf("/mall/") >= 0 ? <div key={index + 'slider'} className="img-div" onTouchTap={f => location.href = sysConfig.mallIndex}>
                                    <img src={imgUrl}/>
                                </div> : <div key={index} className="img-div">
                                    <img src={imgUrl}/>
                                </div>;
                            })
                        }
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

                    <Subheader style={{...styles.center, bottom: '.8rem'}}>

                        <p>{intl.get("audio.nice.song.to.share", {name: nameNorm || "..."})}</p>
                    </Subheader>

                    <Subheader style={{...styles.center, bottom: '.8rem'}}>
                        {/*<p style={{color: '#ff6832', fontSize: '.32rem'}}>{ableEdit ? intl.get("audio.text.edit") : intl.get("msg.from.j.make")}</p>*/}
                        <p style={{color: '#ff6832', fontSize: '.32rem'}}>{customerAd}</p>
                    </Subheader>

                    {ableEdit && <Subheader style={styles.center}>

                        <MyButton
                            style={{...styles.btn, marginBottom: toRem(40)}}
                            labelStyle={styles.btnLabelStyle}
                            onClick={() => this.toEdit(shareId)}
                            label={intl.get("button.edit")}
                            disabled={parseInt(status, 10) !== 1}
                        />

                    </Subheader>}

                </section>

                {/*{pagePictureUrl && <img src={pagePictureUrl} style={{display: "none"}} onError={() => {
                    this.setState({
                        imgUrl: 'http://wechat.j-make.cn/img/album/1.png',
                    });
                }}/>}*/}

            </div>
        );
    }

    /**
     * 获取录音分享数据
     */
    loadAudioGetter() {
        const { globAlertAction, getShareAudioAction } = this.props;
        const {uid, shareId} = this.state.params;
        let params = {};

        if (typeof uid === 'undefined') {
            globAlertAction(intl.get('msg.audio.can.not.get.the.recording'));
            return;
        }

        params.uid = uid;

        const {status, data, msg} = this.props.audio.audioInfo;

        if (shareId) {
            params.shareId = shareId;
        } else if (data && data.shareId) {
            params.shareId = data.shareId;
        } else {
            const openid = getQueryString('openid');
            if (openid === null) {
                globAlertAction(intl.get('msg.audio.can.not.get.the.recording'));
                return;
            }

            params.openid = openid;
        }

        getShareAudioAction(params, reqHeader(params), res => {
            const {status, data} = res;
            if (parseInt(status, 10) === 1) {
                const {musicUrl, nameNorm, shareId, pagePictureUrl} = data;

                window.wx && window.wx.ready(() => {
                    wxShare({
                        title: intl.get("audio.share.title", {name: nameNorm}),
                        desc: intl.get("audio.share.from"),
                        link: `${location.protocol}//${location.host}/recordingPlay/${params.uid}/${shareId}?language=${getQueryString('language')}`,
                        imgUrl: typeof pagePictureUrl !== 'undefined' ? pagePictureUrl : defaultCover,
                        dataUrl: musicUrl
                    });
                });
            }
        });
    }

    /**
     * 跳转编辑页面
     * @param uid 录音的uid
     * @param shareId 录音的shareId
     */
    toEdit(shareId) {
        // navUtils.replace(`${this.state.params.uid}/${shareId}?language=${getQueryString('language')}`);
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
        globAlertAction: bindActionCreators(setGlobAlert, dispatch),
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
