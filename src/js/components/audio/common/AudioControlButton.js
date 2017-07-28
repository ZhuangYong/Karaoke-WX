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

        return (
            <div className={`audio-control ${get(this.props, 'className', '')}`}>
                <div style={{position: "relative"}}>
                    <button className="audio-control_btn" disabled={this.props.disabled}
                            onClick={this.props.onClick}>
                        {icon}
                    </button>
                    {
                        this.props.showProgress && range(0, this.props.progress.length).map((i) => {
                            const d = this.props.duration;
                            const start = this.props.progress.start(i);
                            const end = this.props.progress.end(i);
                            const buffer = (end - start) / d;

                            return (<div key={i} style={{transform: `rotate(${360 * (start / d)} deg)`}}
                                         className="audio-control_progress-container">
                                <Circle percent={buffer * 100}
                                        strokeColor="#D9D9D9" strokeWidth={8} trailColor="#FFFFFFFF"/>
                            </div>);
                        })
                    }
                    { this.props.showProgress &&
                    <Circle percent={this.props.percent} strokeColor="#E76161" strokeWidth={8}
                            trailColor="#FFFFFFFF"/> }


                </div>
                <Slider min={0} max={100} step={0.1} value={percent} included={true}
                        onChange={this.handlePercentChange.bind(this)}/>
            </div>

        );
    }

    handlePercentChange(_percent) {
        this.props.handlePercentChange(_percent);
    }
}

AudioControlButton.defaultProps = {
    mode: 'play',
    showProgress: true,
    percent: 0,
    duration: 0,
    progress: {},
    handlePercentChange: () => {
    }
};

AudioControlButton.propTypes = {
    mode: PropTypes.oneOf(['play', 'pause']),
    showProgress: PropTypes.bool,
    percent: PropTypes.number,
    duration: PropTypes.number,
    progress: PropTypes.object
};
