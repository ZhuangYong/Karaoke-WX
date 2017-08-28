import React from "react";
import {Circle} from "rc-progress";
import Slider from "rc-slider";
import "../../../../sass/audio/audioControlButton.scss";
import get from "lodash/get";
import PauseIcon from "./PauseIcon.js";
import PlayIcon from "./PlayIcon.js";
import range from "lodash/range";
import PropTypes from "prop-types";

export default class AudioControlButton extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let percent = this.props.percent;
        let icon = <PauseIcon />;
        switch (this.props.mode) {
            case 'play':
                icon = <PlayIcon className="audio-control_play"/>;
                break;
            default:
                break;
        }
        const currentTime = parseInt(this.props.currentTime, 10);
        const duration = parseInt(this.props.duration, 10) || 0;
        return (
            <div className={`audio-control ${get(this.props, 'className', '')}`}>
                <div className="control-buttons">
                    <button className="audio-control_btn" disabled={this.props.disabled} onClick={this.props.onClick}>
                        {icon}
                    </button>
                    {
                        this.props.showProgress && range(0, this.props.progress.length).map((i) => {
                            const d = this.props.duration;
                            const start = this.props.progress.start(i);
                            const end = this.props.progress.end(i);
                            const buffer = (end - start) / d;

                            return (<div key={i} style={{transform: `rotate(${360 * (start / d)} deg)`}} className="audio-control_progress-container">
                                <Circle percent={buffer * 100} strokeColor="#D9D9D9" strokeWidth={8} trailColor="#FFFFFFFF"/>
                            </div>);
                        })
                    }
                    { this.props.showProgress &&
                    <Circle percent={this.props.percent} strokeColor="#E76161" strokeWidth={8} trailColor="#FFFFFFFF"/> }
                </div>

                <div className="slider-panel">
                    <Slider min={0} max={100} step={0.1} value={percent} included={true} onChange={this.handlePercentChange.bind(this)} onAfterChange={this.handleAfterChange.bind(this)}>
                        <div className="current-time">{this.formatTime(currentTime)}</div>
                        <div className="duration">{this.formatTime(duration)}</div>
                    </Slider>
                </div>

            </div>

        );
    }

    handlePercentChange(_percent) {
        this.props.handlePercentChange(_percent);
        if (_percent === 100) this.props.handelReset();
    }

    handleAfterChange() {
        this.props.handleAfterChange();
    }

    formatTime(second) {
        const last = 100 + parseInt(second % 60, 10) + '';
        const mini = 100 + parseInt(((second - second % 60) / 60), 10) + '';
        return mini.substring(1) + ":" + last.substring(1);
    }
}

AudioControlButton.defaultProps = {
    mode: 'play',
    showProgress: true,
    percent: 0,
    duration: 0,
    progress: {},
    handelReset: f => f,
    handleAfterChange: f => f,
    handlePercentChange: () => {
    }
};

AudioControlButton.propTypes = {
    mode: PropTypes.oneOf(['play', 'pause']),
    showProgress: PropTypes.bool,
    percent: PropTypes.number,
    duration: PropTypes.number,
    progress: PropTypes.object,
    handelReset: PropTypes.func,
    handleAfterChange: PropTypes.func,
    handlePercentChange: PropTypes.func
};
