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
} from '../../utils/comUtils';
import intl from 'react-intl-universal';
import { setGlobAlert } from '../../actions/common/actions';

class RedirectAudio extends BaseComponent {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {uid, edit, shareId} = this.props.match.params;
        window.sessionStorage.setItem('isRecordingEdit', edit === 'edit');

        if (uid && shareId) {

            this.replaceLink(uid, shareId);
        } else {

            this.loadAudioGetter();
        }
    }
    render() {
        return (
            <div>
            </div>
        );
    }

    replaceLink(uid, shareId) {
        const link = `recordingPlay/${uid}/${shareId}?language=${getQueryString('language')}`;
        const {isIos} = window.sysInfo;
        if (isIos) {
            location.href = "/" + link;
        } else {
            this.props.history.replace("/" + link);
        }
    }

    /**
     * 获取录音分享数据
     */
    loadAudioGetter() {
        const { globAlertAction, getShareAudioAction } = this.props;
        const {uid} = this.props.match.params;
        let params = {};

        if (typeof uid === 'undefined') {
            globAlertAction(intl.get('msg.audio.can.not.get.the.recording'));
            return;
        }

        params.uid = uid;

        const openid = getQueryString('openid');
        if (openid === null) {
            globAlertAction(intl.get('msg.audio.can.not.get.the.recording'));
            return;
        }

        params.openid = openid;

        getShareAudioAction(params, reqHeader(params), res => {
            const {status, data} = res;
            const {isWeixin} = window.sysInfo;
            if (parseInt(status, 10) === 1 && isWeixin) {
                const {shareId} = data;

                this.replaceLink(uid, shareId);
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
