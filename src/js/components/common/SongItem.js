/**
 * Created by walljack@163.com on 2017/8/7.
 */

import React from "react";
import {CircularProgress, ListItem} from "material-ui";
import {withRouter} from "react-router-dom";
import {bindActionCreators} from "redux";
import PropTypes from "prop-types";
import {push, pushLocal} from "../../actions/audioActons";
import BaseComponent from "./BaseComponent";
import {dynaPush, reqHeader} from "../../utils/comUtils";
import {connect} from "react-redux";
import VIPIcon from "../../../img/common/icon_vip.png";
import {setGlobAlert, setLocalNet} from "../../actions/common/actions";
import sysConfig from "../../utils/sysConfig";

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
        const {song, onPushSongSuccess, onPushSongFail, userInfo, ottInfo, action_setGlobAlert} = this.props;
        if (super.validUserStatus(userInfo.userInfoData, ottInfo, action_setGlobAlert) !== true) return;
        this.state.pushIng[song.serialNo] = true;
        this.setState({
            pushIng: this.state.pushIng
        });
        const param = {id: JSON.stringify(song), type: 4};
        const success = () => {
            this.state.pushIng[song.serialNo] = false;
            setTimeout(() => {
                this.setState({
                    pushIng: this.state.pushIng
                });
                onPushSongSuccess && onPushSongSuccess(song);
            }, 600);
        };
        const fail = (msg) => {
            this.state.pushIng[song.serialNo] = false;
            this.setState({
                pushIng: this.state.pushIng
            });
            this.props.action_setGlobAlert("点歌失败！");
            //onPushSongFail && onPushSongFail(msg);
        };
        dynaPush({
            ottInfo: this.props.ottInfo,
            userInfo: this.props.userInfo,
            param: param,
            localNetIsWork: this.props.localNetIsWork,
            action_pushLocal: this.props.action_pushLocal,
            action_setLocalNet: this.props.action_setLocalNet,
            action_push: this.props.action_push,
            action_setGlobAlert: this.props.action_setGlobAlert,
            success: success,
            fail: fail
        });
        // const param = {id: JSON.stringify(song), type: 4};
        // const {data} = this.props.ottInfo || {};
        // const {userInfoData} = this.props.userInfo || {};
        // const {deviceIp, devicePort, networkType} = data || {};
        //
        // const localParam = Object.assign({}, param, {
        //     debug: sysConfig.environment === "test",
        //     deviceId: userInfoData.data.deviceId
        // });
        // const header = reqHeader(param);
        // const localHeader = reqHeader(localParam);
        // const localPri = `http://${deviceIp}:${devicePort}`;
        // const success = () => {
        //     this.state.pushIng[song.serialNo] = false;
        //     setTimeout(() => {
        //         this.setState({
        //             pushIng: this.state.pushIng
        //         });
        //         onPushSongSuccess && onPushSongSuccess(song);
        //     }, 600);
        // };
        // const fail = (msg) => {
        //     this.state.pushIng[song.serialNo] = false;
        //     this.setState({
        //         pushIng: this.state.pushIng
        //     });
        //     //onPushSongFail && onPushSongFail(msg);
        // };
        // if (this.props.localNetIsWork && (networkType === 'wifi' || networkType === 'eth') && deviceIp && devicePort && userInfoData && userInfoData.data) {
        //     this.props.action_pushLocal(localPri, localParam, localHeader, success, () => {
        //         this.props.action_setLocalNet(false);
        //         this.props.action_push(param, header, success, fail);
        //     });
        // } else {
        //     this.props.action_push(param, header, success, fail);
        // }

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
        userInfo: state.app.user.userInfo,
        ottInfo: state.app.device.ottInfo,
        localNetIsWork: state.app.common.localNetIsWork
    };
};
// 映射dispatch到props
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        action_push: bindActionCreators(push, dispatch),
        action_pushLocal: bindActionCreators(pushLocal, dispatch),
        action_setGlobAlert: bindActionCreators(setGlobAlert, dispatch),
        action_setLocalNet: bindActionCreators(setLocalNet, dispatch)
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(SongItem));
