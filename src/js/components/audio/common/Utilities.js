import React from 'react';
import AudioControl from './AudioControlButton.js';
import PropTypes from 'prop-types';

export default class Utilities extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const playMode = this.props.isPlaying ? "pause" : "play";

        return (
            <div className="utilities">
                <AudioControl
                    className="utilities_play splash-anim"
                    mode={playMode}
                    showProgress={true}
                    handlePercentChange={this.props.handlePercentChange}
                    percent={this.props.percent}
                    duration={this.props.duration}
                    progress={this.props.progress}
                    onClick={this.props.onPlay}/>
            </div>
        );
    }
}

Utilities.defaultProps = {
    isPlaying: false,
    isFavorite: false,
    progress: {},
    percent: 0,
    handlePercentChange: () => {}
};

Utilities.propTypes = {
    isPlaying: PropTypes.bool,
    percent: PropTypes.number,
    isFavorite: PropTypes.bool,
    onPlay: PropTypes.func,
    onNext: PropTypes.func,
    onPrevious: PropTypes.func,
    progress: PropTypes.object,
    onToggleFavorite: PropTypes.func,
    onToggleRepeat: PropTypes.func
};
