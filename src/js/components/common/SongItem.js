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
import {dynaPush} from "../../utils/comUtils";
import {connect} from "react-redux";
import VIPIcon from "../../../img/common/icon_vip.png";
import {setGlobAlert, setLocalNet} from "../../actions/common/actions";
import SucIcon from "material-ui/svg-icons/navigation/check";
import FailIcon from "material-ui/svg-icons/navigation/close";
import Const from "../../utils/const";
// import sysConfig from "../../utils/sysConfig";

class SongItem extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            pushIng: {},
            showSuc: {},
            showFail: {}
        };
        this.pushSong = this.pushSong.bind(this);
        this.pushSuccess = this.pushSuccess.bind(this);
        this.pushFail = this.pushFail.bind(this);
    }

    render() {
        const song = this.props.song;
        return (
            <ListItem
                className="song-item"
                key={song.id || song.serialNo}
                primaryText={<div>
                    <div className="song-title"><font>{song.nameNorm}</font><i className="label-vip">{song.charge ? <img src={VIPIcon} style={{height: '.4rem'}}/> : ""}</i>
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
                    this.getBut(song.id || song.serialNo)
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
            //this.state.pushIng[song.serialNo] = false;
            this.pushSuccess(song.serialNo);
            setTimeout(() => {
                this.setState({
                    pushIng: this.state.pushIng
                });
                onPushSongSuccess && onPushSongSuccess(song);
            }, 600);
        };
        const fail = (msg) => {
            //this.state.pushIng[song.serialNo] = false;
            this.pushFail(song.serialNo);
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

    getBut(serialNo) {
        if (this.state.pushIng[serialNo]) {
            return (
                <CircularProgress className="choose-button no-border" color="#ff6932" size={16} thickness={1}/>
            );
        } else if (this.state.showSuc[serialNo]) {
            return (
                <SucIcon className="choose-button no-border" color="#ff6932"/>
            );
        } else if (this.state.showFail[serialNo]) {
            return (
                <FailIcon className="choose-button no-border" color="red"/>
            );
        } else {
            return (
                <div className="choose-button" onClick={this.pushSong}>点歌</div>
            );
        }
    }

    pushSuccess(serialNo) {
        this.state.pushIng[serialNo] = false;
        this.state.showSuc[serialNo] = true;
        this.setState({
            pushIng: this.state.pushIng,
            showSuc: this.state.showSuc
        });
        setTimeout(() => {
            this.state.showSuc[serialNo] = false;
            this.setState({
                showSuc: this.state.showSuc
            });
        }, Const.PUSH_SONG_RESULT_ICON_SHOW);
    }

    pushFail(serialNo) {
        this.state.pushIng[serialNo] = false;
        this.state.showFail[serialNo] = true;
        this.setState({
            pushIng: this.state.pushIng,
            showFail: this.state.showFail
        });
        setTimeout(() => {
            this.state.showFail[serialNo] = false;
            this.setState({
                showFail: this.state.showFail
            });
        }, Const.PUSH_SONG_RESULT_ICON_SHOW);
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
