import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import "../../../sass/audio/playAudio.scss";
import * as audioActions from "../../actions/audioActons";
import Audio from "../../components/audio";
import {reqHeader, wxAuthorizedUrl, wxShare} from "../../utils/comUtils";
import sysConfig from "../../utils/sysConfig";

import SwipeAbleViews from 'react-swipeable-views';
import {autoPlay} from 'react-swipeable-views-utils';
import PropTypes from "prop-types";
import {Subheader} from "material-ui";
import BaseComponent from "../../components/common/BaseComponent";
import SlidePng1 from "../../../img/album/1.png";
import SlidePng2 from "../../../img/album/2.png";
import SlidePng3 from "../../../img/album/3.png";

const AutoPlaySwipeAbleViews = autoPlay(SwipeAbleViews);
class PlayAudio extends BaseComponent {

    constructor(props) {
        super(props);
        super.title("录音分享");
        this.state = {
            audio: {},
            params: this.props.match.params,
            percent: 0,
            currentTime: 0,
            wxTimer: -1,
            musicUrl: "",
            imgUrl: ""
        };
    }

    componentWillMount() {
        const params = this.state.params;
        this.props.actions.getShareAudio(params, reqHeader(params));
    }

    componentDidUpdate() {
        const imgUrl = this.state.imgUrl;
        const {isWeixin} = window.sysInfo;
        if (isWeixin) {
            const {data} = this.props.audio.audioInfo;
            if (data && data.musicUrl) {
                window.wx && window.wx.ready(() => {
                    this.refs.audio.refs.audio.refs.audio.play();

                    wxShare({
                        title: `刚刚唱了一首《${data.nameNorm}》快点来听`,
                        desc: "分享自金麦客家庭卡拉OK",
                        // link: wxAuthorizedUrl(sysConfig.appId, sysConfig.apiDomain, location.href),
                        link: location.href,
                        imgUrl: imgUrl === "" ? data.image : imgUrl,
                        dataUrl: data.musicUrl
                    });
                });
            }
        }
    }

    componentWillUnmount() {
        const {isWeixin} = window.sysInfo;
        if (isWeixin) {
            window.wx && window.wx.ready(() => {

                wxShare({
                    title: `金麦客微信点歌`,
                    desc: "分享自金麦客家庭卡拉OK",
                    link: wxAuthorizedUrl(sysConfig.appId, sysConfig.apiDomain, location.protocol + "//" + location.host),
                    imgUrl: "http://wx.j-make.cn/img/logo.png",
                    dataUrl: null
                });
            });
        }
    }

    render() {
        const {w, h} = this.props.common;
        const {status, data, msg} = this.props.audio.audioInfo;
        const {image, musicUrl, musicTime, nameNorm} = data || {};
        let swipePanelStyle = {};
        let topPanelStyle = {};
        if (w > h) {
            swipePanelStyle.height = "5.867rem";
            swipePanelStyle.width = "5.867rem";
            // swipePanelStyle.overflow = "hidden";
            topPanelStyle.marginTop = ".4rem";
        }

        super.title(nameNorm || "录音分享");
        return (
            <div className="audio-play">
                <div className="top-panel" style={topPanelStyle}>
                    <AutoPlaySwipeAbleViews className="swipe-panel" style={swipePanelStyle}>
                        <div className="img-div"><img src={SlidePng1}/></div>
                        <div className="img-div"><img src={SlidePng2}/></div>
                        <div className="img-div"><img src={SlidePng3}/></div>
                    </AutoPlaySwipeAbleViews>
                    <Audio ref="audio" source={musicUrl} className="audio-item"/>
                </div>
                <p className="song-label">
                    <font style={{fontSize: '.4rem'}}>{nameNorm}</font>
                </p>
                <Subheader style={{textAlign: "center", fontSize: '.4rem', lineHeight: '.6rem'}}>
                    <font style={{fontSize: '.4rem'}}>{`一首好听的《${nameNorm}》，快去分享吧`}</font>
                    <p style={{fontSize: '.32rem', height: '.4rem', margin: 0}}>&nbsp;{`${musicTime}`}&nbsp;</p>
                </Subheader>
                <Subheader style={{textAlign: "center", bottom: '.8rem'}}>
                    <p style={{color: '#ff6832', fontSize: '.32rem'}}>来自金麦客专业家庭卡拉OK</p>
                </Subheader>

                <img src={image} style={{display: "none"}} onError={() => {
                    this.setState({
                        imgUrl: "http://wx.j-make.cn/img/logo.png"
                    });
                }}/>
            </div>
        );
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
        actions: bindActionCreators(audioActions, dispatch)
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
