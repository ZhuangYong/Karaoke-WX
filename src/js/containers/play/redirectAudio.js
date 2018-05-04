import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import BaseComponent from "../../components/common/BaseComponent";
import {bindActionCreators} from "redux";
import "../../../sass/audio/playAudio.scss";
import {getShareAudio} from "../../actions/audioActons";
import {
    getQueryString,
    reqHeader,
    wxShare,
} from '../../utils/comUtils';
import intl from 'react-intl-universal';
import { setGlobAlert } from '../../actions/common/actions';
import projectConfig from '../../utils/sysConfig';

const defaultCover = 'http://wechat.j-make.cn/img/logo.png';

class RedirectAudio extends BaseComponent {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {uid, edit} = this.props.match.params;
        window.sessionStorage.setItem('isRecordingEdit', edit === 'edit');

        this.loadAudioGetter(uid);
    }
    render() {
        return (
            <div>
            </div>
        );
    }

    replaceLink(audioData) {
        const {musicUrl, nameNorm, shareId, pagePictureUrl, uid} = audioData;

        const link = `recordingPlay/${uid}/${shareId}?language=${getQueryString('language')}`;
        const {isIos} = window.sysInfo;
        if (isIos) {
            location.href = "/" + link;
        } else {
            this.props.history.replace("/" + link);
        }

        window.wx && window.wx.ready(() => {
            wxShare({
                title: intl.get("audio.share.title", {name: nameNorm}),
                desc: intl.get("audio.share.from"),
                link: `${location.protocol}//${location.host}/recordingPlay/${uid}/${shareId}?language=${getQueryString('language')}`,
                // link: `${projectConfig.apiDomain}/user/shareSoundUrl?soundId=${uid}&shareId=${shareId}&language=${getQueryString('language')}`,
                imgUrl: typeof pagePictureUrl !== 'undefined' ? pagePictureUrl : defaultCover,
                dataUrl: musicUrl
            });
        });
    }

    /**
     * 获取录音分享数据
     */
    loadAudioGetter(uid) {
        const { globAlertAction, getShareAudioAction } = this.props;
        let params = {
            uid,
        };

        getShareAudioAction(params, reqHeader(params), res => {
            const {isWeixin} = window.sysInfo;
            if (isWeixin) {
                this.replaceLink({...res, uid});
            } else {
                globAlertAction(intl.get('msg.audio.can.not.get.the.recording'));
            }
        });
    }
}

// 映射state到props
const mapStateToProps = (state, ownProps) => {
    return {
        audio: state.app.audio,
    };
};
// 映射dispatch到props
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        globAlertAction: bindActionCreators(setGlobAlert, dispatch),
        getShareAudioAction: bindActionCreators(getShareAudio, dispatch),
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(RedirectAudio));
