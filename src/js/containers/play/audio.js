import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import ReactDOM from "react-dom";
import {withRouter} from "react-router-dom";

import * as audioActions from "../../actions/audioActons";
import Audio from "../../components/audio";
import {reqHeader} from "../../utils/comUtils";

import PropTypes from "prop-types";

class PlayAudio extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            audio: {},
            params: this.props.match.params,
            percent: 0,
            currentTime: 0
        };
    }

    componentWillMount() {
        const params = this.state.params;
        this.props.actions.getShareAudio(params, reqHeader(params));
        this.setState({
            audio: ReactDOM.findDOMNode(this.refs.audio)
        });
    }

    render() {
        const {status, data, msg} = this.props.audio.audioInfo;
        const {musicUrl} = data || {};
        return (
            <Audio source={musicUrl}/>
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
