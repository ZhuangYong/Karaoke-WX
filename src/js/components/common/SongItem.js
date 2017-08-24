/**
 * Created by walljack@163.com on 2017/8/7.
 */

import React from "react";
import {CircularProgress, ListItem} from "material-ui";
import {withRouter} from "react-router-dom";
import {bindActionCreators} from "redux";
import PropTypes from "prop-types";
import {push} from "../../actions/audioActons";
import BaseComponent from "./BaseComponent";
import {reqHeader} from "../../utils/comUtils";
import {connect} from "react-redux";
import VIPIcon from "../../../img/common/icon_vip.png";
import {setGlobAlert} from "../../actions/common/actions";

class SongItem extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            pushIng: {}
        };
        this.pushSong = this.pushSong.bind(this);
    }

    render() {
        const song = this.props.song;
        return (
            <ListItem
                className="song-item"
                key={song.id}
                primaryText={<div>
                    <div className="song-title">{song.nameNorm}<i className="label-vip">{song.charge ? <img src={VIPIcon} style={{height: '.4rem'}}/> : ""}</i>
                    </div>
                </div>}
                secondaryText={
                    <div className="song-author">
                        {song.actor && song.actor.map((actor) => (
                            actor.nameNorm
                        )).join(" ")}
                    </div>
                }
                rightToggle={
                    this.state.pushIng[song.serialNo] ? <CircularProgress size={16} thickness={1} style={{right: 3, textAlign: "center"}}/> : <div className="choose-button" onTouchTap={this.pushSong}>点歌</div>
                }
            />
        );
    }

    pushSong() {
        const {song, onPushSongSuccess, onPushSongFail, userInfo, action_setGlobAlert} = this.props;
        if (super.validUserStatus(userInfo.userInfoData, action_setGlobAlert) !== true) return;
        const param = {id: JSON.stringify(song), type: 4};
        this.state.pushIng[song.serialNo] = true;
        this.setState({
            pushIng: this.state.pushIng
        });
        this.props.action_push(param, reqHeader(param), () => {
            this.state.pushIng[song.serialNo] = false;
            setTimeout(() => {
                this.setState({
                    pushIng: this.state.pushIng
                });
                onPushSongSuccess && onPushSongSuccess(song);
            }, 600);
        }, (msg) => {
            this.state.pushIng[song.serialNo] = false;
            this.setState({
                pushIng: this.state.pushIng
            });
            //onPushSongFail && onPushSongFail(msg);
        });
    }

}

SongItem.propTypes = {
    song: PropTypes.object,
    onPushSongSuccess: PropTypes.func,
    onPushSongFail: PropTypes.func
};

SongItem.defaultProps = {
    song: {}
};

// 映射state到props
const mapStateToProps = (state, ownProps) => {
    return {
        songs: state.app.songs,
        userInfo: state.app.user.userInfo
    };
};
// 映射dispatch到props
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        action_push: bindActionCreators(push, dispatch),
        action_setGlobAlert: bindActionCreators(setGlobAlert, dispatch)
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(SongItem));
