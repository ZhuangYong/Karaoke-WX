/**
 * Created by walljack@163.com on 2017/8/7.
 */

import React from "react";
import {ListItem} from "material-ui";
import {withRouter} from "react-router-dom";
import {bindActionCreators} from "redux";
import PropTypes from "prop-types";
import {push} from "../../actions/audioActons";
import BaseComponent from "./BaseComponent";
import {reqHeader} from "../../utils/comUtils";
import {connect} from "react-redux";

class SongItem extends BaseComponent {
    constructor(props) {
        super(props);
        this.pushSong = this.pushSong.bind(this);
    }

    render() {
        const song = this.props.song;
        return (
            <ListItem
                className="song-item"
                key={song.id}
                primaryText={<div>
                    <div className="song-title">{song.nameNorm}<i className="label-vip">{song.charge ? "VIP" : ""}</i></div>
                </div>}
                secondaryText={
                    <div className="song-author">
                        {song.actor && song.actor.map((actor) => (
                            actor.nameNorm
                        )).join(" ")}
                    </div>
                }
                rightToggle={<div className="choose-button" onClick={this.pushSong}>点歌</div>}
            />
        );
    }

    pushSong() {
        const song = this.props.song;
        const param = {id: song, type: 4};
        this.props.action_push(param, reqHeader(param));
    }
}

SongItem.propTypes = {
    song: PropTypes.object
};

SongItem.defaultProps = {
    song: {}
};

// 映射state到props
const mapStateToProps = (state, ownProps) => {
    return {
        songs: state.app.songs,
    };
};
// 映射dispatch到props
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        action_push: bindActionCreators(push, dispatch)
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(SongItem));
