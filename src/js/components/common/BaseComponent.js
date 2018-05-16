/**
 * Created by walljack@163.com on 2017/7/18.
 */

import {Component} from "react";
import navUtils from "../../utils/navUtils";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import ActionTypes from "../../actions/actionTypes";
import intl from "react-intl-universal";

export default class BaseComponent extends Component {

    constructor(props) {
        super(props);
        this.bindState.bind(this);
        this.title = this.title.bind(this);
        navUtils.setHistory(this.props.history);
    }

    render() {
        return (
            <div/>
        );
    }

    bindState(stateName) {
        return (value) => {
            let state = {};
            state[stateName] = value;
            this.setState(state);
        };
    }

    title(title) {
        document.title = title;
    }

    /**
     * 验证用户是否是绑定了设备、是否vip、是否可以免费激活
     * 如果任何一个条件不满足将返回false并做出相应的提示
     * @param userInfoData app.state.userInfo.userInfoData
     * @param actionSetGlobAlert actions/common/actions.js/setGlobAlert
     * @returns {*} 如果正在获取用户信息将返回字符串的提示，如果条件都满足将返回true，否则返回false并做出相应的提示
     */
    validUserStatus(userInfoData = {}, ottInfo = {}, actionSetGlobAlert) {
        const {systemTime, timeStamp} = ottInfo || {};
        const isVip = this.isVip(userInfoData);
        const isBindDevice = this.isBindDevice(userInfoData);
        const isFreeActivation = this.isFreeActivation(userInfoData);
        const ottIsOnLine = () => {
            if (systemTime && timeStamp) return !(systemTime - timeStamp > 12 * 60 * 1000);
            return false;
        };
        if (typeof isBindDevice === 'string') {
            actionSetGlobAlert && actionSetGlobAlert(isBindDevice, ActionTypes.COMMON.ALERT_TYPE_BIND_DEVICE);
            return false;
            // return intl.get("getting.user.info");
        } else if (isBindDevice === false) {
            actionSetGlobAlert && actionSetGlobAlert("", ActionTypes.COMMON.ALERT_TYPE_BIND_DEVICE);
            return false;
        } else if (isBindDevice === true) {
            if (ottIsOnLine()) {
                if (isVip === false) {

                    if (isFreeActivation === true) {
                        actionSetGlobAlert && actionSetGlobAlert("", ActionTypes.COMMON.ALERT_TYPE_FREE_ACTIVE);
                        return false;
                    } else if (isFreeActivation === false) {

                        actionSetGlobAlert && actionSetGlobAlert("", ActionTypes.COMMON.ALERT_TYPE_BE_VIP);
                        return false;
                    }
                } else {
                    return true;
                }
            } else {
                actionSetGlobAlert && actionSetGlobAlert("", ActionTypes.COMMON.ALERT_TYPE_DEVICE_NOT_ONLINE);
                return false;
            }
        }
    }

    /**
     * 验证用户是否是绑定了设备，若没有将返回false并做出相应的提示
     * @param userInfoData app.state.userInfo.userInfoData
     * @param actionSetGlobAlert actions/common/actions.js/setGlobAlert
     * @param noAlert boolean
     * @returns {*}
     */
    validUserBindDevice(userInfoData = {}, actionSetGlobAlert, noAlert) {
        const isBindDevice = this.isBindDevice(userInfoData);
        if (typeof isBindDevice === 'string') {
            !noAlert && actionSetGlobAlert && actionSetGlobAlert(isBindDevice, ActionTypes.COMMON.ALERT_TYPE_BIND_DEVICE);
            return isBindDevice;
        } else if (isBindDevice === false) {
            !noAlert && actionSetGlobAlert && actionSetGlobAlert("", ActionTypes.COMMON.ALERT_TYPE_BIND_DEVICE);
            return false;
        } else if (isBindDevice === true) {
            return true;
        }
    }

   validUserDeviceOnline(ottInfo = {}, actionSetGlobAlert) {
       const {systemTime, timeStamp} = ottInfo || {};
       if (systemTime && timeStamp) {
           const online = !(systemTime - timeStamp > 12 * 60 * 1000);
           if (!online) {
               actionSetGlobAlert && actionSetGlobAlert("", ActionTypes.COMMON.ALERT_TYPE_DEVICE_NOT_ONLINE);
               return false;
           }
           return true;
       }
       actionSetGlobAlert && actionSetGlobAlert("", ActionTypes.COMMON.ALERT_TYPE_DEVICE_NOT_ONLINE);
       return false;
    }

    /**
     * 判断用户是否可以免费激活
     * @param userInfoData
     * @returns {*}
     */
    isFreeActivation(userInfoData = {}) {
        const {isFreeActivation} = userInfoData;
        // 是否可以免费激活1（可以）0（不可以）
        return isFreeActivation === 1;
    }

    /**
     * 判断用户是否绑定了设备
     * @param userInfoData
     * @returns {*}
     */
   isBindDevice(userInfoData = {}) {
        const {isReDevice, bindExpireTime} = userInfoData;
        //是否绑定设备1（已绑定）2（未绑定设备）3（绑定过期）
        if (isReDevice === 3) {
            return intl.get("bind.expired.re.bind");
        } else if (isReDevice === 2) {
            return intl.get("unbind.device");
        } else {
            return true;
        }
   }

    /**
     * 判断用户是否是vip
     * @param userInfoData
     * @returns {*}
     */
    isVip(userInfoData = {}) {
        const {vipStatus, expireTime} = userInfoData;
        // vip状态-1（从未开通过vip）0（vip已过期）1（在vip有效期）
        return vipStatus === 1 && new Date().getTime() < expireTime ;
    }

    /**
     * vip 时间剩余
     * @param userInfoData
     * @returns {*}
     */
    vipTime(userInfoData = {}) {
        const {vipStatus, expireTime} = userInfoData;
        // vip状态-1（从未开通过vip）0（vip已过期）1（在vip有效期）
        if (vipStatus === 1) {
            return expireTime - new Date().getTime();
        } else {
            return '0';
        }
    }
}
