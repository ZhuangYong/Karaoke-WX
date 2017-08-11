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
        const {source, ...param} = this.props;
        return (
            <div {...param}>
                <ReactAudio
                    ref="audio"
                    autoplay={true}
                    source={this.props.source}
                    onEnded={this.onEnded.bind(this)}
                    onProgress={this.handleProgress.bind(this)}
                    onTimeupdate={this.handleTimeUpdate.bind(this)}
                />
                <Utilities
                    isPlaying={!paused}
                    percent={percent}
                    duration={audio.duration}
                    currentTime={audio.currentTime}
                    progress={buffered}
                    handlePercentChange={this.handlePercentChange.bind(this)}
                    handleAfterChange={this.handleAfterChange.bind(this)}
                    handelReset={this.handelReset.bind(this)}
                    onPlay={this.handlePlay.bind(this)}/>
            </div>
        );
    }

    handleProgress() {
    }

    /**
     * 手动修改播放时间
     * @param _percent
     */
    handlePercentChange(_percent) {
        const audio = this.state.audio;
        this.setState({
            manualChangeIng: true
        });
        if (!audio.duration) return;
        audio.currentTime = _percent / 100 * audio.duration;
        this.setState({
            percent: _percent / 100,
            currentTime: audio.currentTime
        });
        if (_percent === 100) {
            audio.pause();
            this.onEnded();
        }
    }

    /**
     * 手动修改时间结束
     */
    handleAfterChange() {
        const audio = this.state.audio;
        const percent = this.state.percent;
        if (audio.paused) {
            audio.play();
            this.setState({
                paused: false
            });
        }
        this.setState({
            manualChangeIng: false
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
        // TODO should show error information here
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

    handelReset() {
        const manualChangeIng = this.state.manualChangeIng;
        if (manualChangeIng) return;
        const audio = this.state.audio;
        audio.currentTime = 0;
        audio.pause();
        this.setState({
            percent: 0,
            paused: true
        });
    }

    onEnded() {
        this.setState({
            percent: 100,
            paused: true
        });
    }

}

export default Audio;
