import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import "../../../sass/audio/palyAudio.scss";
import * as audioActions from "../../actions/audioActons";
import Audio from "../../components/audio";
import {reqHeader} from "../../utils/comUtils";

import SwipeAbleViews from 'react-swipeable-views';
import {autoPlay} from 'react-swipeable-views-utils';
import defaultImg from "../../../img/common/tile_default.jpg";
import defaultImg2 from "../../../img/picture.jpg";
import PropTypes from "prop-types";
import {Avatar, Divider, ListItem, Subheader} from "material-ui";

const AutoPlaySwipeAbleViews = autoPlay(SwipeAbleViews);
const style = {};
class PlayAudio extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            audio: {},
            params: this.props.match.params,
            percent: 0,
            currentTime: 0,
            wxTimer: -1,
            musicUrl: ""
        };
    }

    componentWillMount() {
        const params = this.state.params;
        this.props.actions.getShareAudio(params, reqHeader(params));
    }

    componentDidUpdate() {
        const {isWeixin} = window.sysInfo;
        if (isWeixin) {
            const {data} = this.props.audio.audioInfo;
            if (data && data.musicUrl) {
                window.wx.ready(() => {
                    this.refs.audio.refs.audio.refs.audio.play();
                });
            }
        }
    }

    render() {
        const {status, data, msg} = this.props.audio.audioInfo;
        const {musicUrl, musicTime, nameNorm} = data || {};
        return (
            <div className="audio-play">
                <div className="top-panel">
                    <AutoPlaySwipeAbleViews className="swipe-panel">
                        <div className="img-div"><img src={defaultImg}/></div>
                        <div className="img-div"><img src={defaultImg2}/></div>
                        <div className="img-div"><img src={defaultImg}/></div>
                    </AutoPlaySwipeAbleViews>
                    <Audio ref="audio" source={musicUrl} className="audio-item"/>
                </div>
                <p className="song-label">
                    {nameNorm}&nbsp;
                </p>
                <Subheader style={{lineHeight: "18px", marginTop: '.267rem', textAlign: "center", fontSize: '.4rem'}}>
                    一首好听的《{nameNorm}》，快去分享吧
                    <p style={{fontSize: '.32rem'}}>&nbsp;{musicTime}&nbsp;</p>
                </Subheader>
                <Subheader style={{lineHeight: "18px", textAlign: "center", bottom: '.8rem'}}>
                    <p style={{color: '#ff6832', fontSize: '.32rem'}}>来自金麦客专业家庭卡拉OK</p>
                </Subheader>
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
        audio: state.app.audio
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
