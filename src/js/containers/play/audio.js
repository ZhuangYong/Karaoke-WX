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
const style = {

};
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
    }

    render() {
        const {status, data, msg} = this.props.audio.audioInfo;
        const {musicUrl, musicTime, nameNorm} = data || {};
        return (
            <div>
                <div className="top-panel">
                    <AutoPlaySwipeAbleViews className="swipe-panel">
                        <div className="img-div"><img src={defaultImg}/></div>
                        <div className="img-div"><img src={defaultImg2}/></div>
                        <div className="img-div"><img src={defaultImg}/></div>
                    </AutoPlaySwipeAbleViews>
                    <Audio source={musicUrl} className="audio-item"/>
                </div>
                <ListItem
                    className="user-info"
                    disabled={true}
                    leftAvatar={
                        <Avatar src={defaultImg2} />
                    }
                >
                    名字
                </ListItem>
                <Divider style={{width: "90%", marginLeft: "auto", marginRight: "auto"}}/>

                <Subheader style={{lineHeight: "18px", marginTop: 10}}>
                    一首好听的《{nameNorm}》，快去分享吧
                    <p>{musicTime}</p>
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
