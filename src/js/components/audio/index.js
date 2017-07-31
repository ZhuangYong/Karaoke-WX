/**
 * Created by walljack@163.com on 2017/7/24.
 */

import React from "react";
import ReactDOM from "react-dom";
import ReactAudio from "../../components/audio/common/ReactAudio";
import Utilities from "../../components/audio/common/Utilities";

class Audio extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            audio: {},
            paused: false,
            source: this.props.source,
            percent: 0,
            currentTime: 0
        };
    }

    componentDidMount() {
        this.setState({
            audio: ReactDOM.findDOMNode(this.refs.audio)
        });
    }

    render() {
        const audio = this.state.audio;
        const {
            buffered
        } = audio || {};
        const paused = this.state.paused;
        const percent = this.state.percent * 100;
        return (
            <div style={{marginTop: '100px'}}>
                <ReactAudio
                    ref="audio"
                    autoplay={true}
                    source={this.props.source}
                    onProgress={this.handleProgress.bind(this)}
                    onTimeupdate={this.handleTimeUpdate.bind(this)}
                />
                <Utilities
                    isPlaying={!paused}
                    percent={percent}
                    progress={buffered}
                    handlePercentChange={this.handlePercentChange.bind(this)}
                    onPlay={this.handlePlay.bind(this)}/>
            </div>
        );
    }

    handleProgress() {
        this.setState({
            audio: ReactDOM.findDOMNode(this.refs.audio)
        });
    }

    handlePercentChange(_percent) {
        const audio = this.state.audio;
        if (!audio.duration) return;
        audio.currentTime = _percent / 100 * audio.duration;
        this.setState({
            percent: _percent / 100,
            currentTime: audio.currentTime
        });
    }

    handleTimeUpdate() {
        const audio = this.state.audio;
        if (!audio.duration || audio.paused) return;
        this.setState({
            percent: audio.currentTime / audio.duration
        });
    }

    handleError(e) {
        this.props.actions.setError(ReactDOM.findDOMNode(this.refs.audio));
    }

    handlePlay() {
        const audio = this.state.audio;
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }

        this.setState({
            paused: audio.paused
        });
    }

    handleLoadedData() {
        const audio = ReactDOM.findDOMNode(this.refs.audio);
        if (this.props.audio.isRepeating) {
            this.props.play(audio);
        }
    }

}

export default Audio;
