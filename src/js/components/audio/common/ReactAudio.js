import React from 'react';
import ReactDOM from 'react-dom';
import isFunction from 'lodash/isFunction';
import partialRight from 'lodash/partialRight';
import forEach from 'lodash/forEach';
import PropTypes from 'prop-types';

class ReactAudio extends React.Component {

    constructor(props) {
        super(props);
        props = Object.assign({}, props, {
            autoplay: false,
            preload: true,
            source: "",
            loop: false,
            volume: 0.8,
            onTimeupdate: null,
            onError: null,
            onProgress: null,
            onEnded: null
        });
        this.state = {
            listeners: []
        };
    }

    get audio() {
        if (!this.refs)
            return {};

        return ReactDOM.findDOMNode(this.refs.audio);
    }

    set audio(a) {
        this.audio = a;
    }

    handler(e, func) {
        if (isFunction(func)) {
            func(e);
        }
    }

    addListener(event, func) {
        let audio = ReactDOM.findDOMNode(this.refs.audio);
        audio.addEventListener(event, partialRight(this.handler, func));
        this.state.listeners.push({event: event, func: func});
    }

    removeAllListeners() {
        let audio = ReactDOM.findDOMNode(this.refs.audio);
        forEach(this.state.listeners, (obj) => {
            audio.removeEventListener(obj.event, obj.func);
        });
        this.state.listeners = [];
    }

    componentDidMount() {
        this.addListener('timeupdate', this.props.onTimeupdate);
        this.addListener('progress', this.props.onProgress);
        this.addListener('error', this.props.onError);
        this.addListener('ended', this.props.onEnded);
        this.addListener('loadeddata', this.props.onLoadedData);
    }

    componentWillUnmount() {
        this.removeAllListeners();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.autoplay === true && this.props.autoplay === false) {
            this.audio.play();
        }
    }

    render() {
        const audioUrl = this.props.source;
        return (
                <audio
                    ref="audio"
                    preload={this.props.preload}
                    controls={false}
                    //crossOrigin="anonymous"
                    autoPlay={this.props.autoplay}
                    loop={this.props.loop}
                    src={audioUrl}/>
        );
    }
}
ReactAudio.propTypes = {
    autoplay: PropTypes.bool,
    preload: PropTypes.bool,
    source: PropTypes.string,
    loop: PropTypes.bool,
    volume: PropTypes.number,
    onTimeupdate: PropTypes.func,
    onError: PropTypes.func,
    onProgress: PropTypes.func,
    onEnded: PropTypes.func
};
export default ReactAudio;
