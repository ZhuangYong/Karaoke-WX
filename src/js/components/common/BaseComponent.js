/**
 * Created by walljack@163.com on 2017/7/18.
 */

import {Component} from "react";
import navUtils from "../../utils/navUtils";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import ActionTypes from "../../actions/actionTypes";

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
    validUserStatus(userInfoData, actionSetGlobAlert) {
        const isVip = this.isVip(userInfoData);
        const isBindDevice = this.isBindDevice(userInfoData);
        const isFreeActivation = this.isFreeActivation(userInfoData);
        if (typeof isBindDevice === 'string') {
            actionSetGlobAlert && actionSetGlobAlert("正在获取用户信息，请稍后重试！");
            return '正在获取用户信息';
        } else if (isBindDevice === false) {
            actionSetGlobAlert && actionSetGlobAlert("", ActionTypes.COMMON.ALERT_TYPE_BIND_DEVICE);
            return false;
        } else if (isBindDevice === true) {
            if (isFreeActivation === true) {
                actionSetGlobAlert && actionSetGlobAlert("", ActionTypes.COMMON.ALERT_TYPE_FREE_ACTIVE);
                return false;
            } else if (isFreeActivation === false) {
                if (isVip === false) {
                    actionSetGlobAlert && actionSetGlobAlert("", ActionTypes.COMMON.ALERT_TYPE_BE_VIP);
                    return false;
                } else {
                    return true;
                }
            }
        }
    }

    /**
     * 验证用户是否是绑定了设备，若没有将返回false并做出相应的提示
     * @param userInfoData app.state.userInfo.userInfoData
     * @param actionSetGlobAlert actions/common/actions.js/setGlobAlert
     * @returns {*}
     */
    validUserBindDevice(userInfoData, actionSetGlobAlert) {
        const isBindDevice = this.isBindDevice(userInfoData);
        if (typeof isBindDevice === 'string') {
            actionSetGlobAlert && actionSetGlobAlert("正在获取用户信息，请稍后重试！");
            return '正在获取用户信息';
        } else if (isBindDevice === false) {
            actionSetGlobAlert && actionSetGlobAlert("", ActionTypes.COMMON.ALERT_TYPE_BIND_DEVICE);
            return false;
        } else if (isBindDevice === true) {
            return true;
        }
    }

    /**
     * 判断用户是否可以免费激活
     * @param userInfoData
     * @returns {*}
     */
    isFreeActivation(userInfoData) {
        const {status, data} = userInfoData || {};
        if (typeof status !== 'undefined') {
            const {isFreeActivation} = data;
            // 是否可以免费激活1（可以）0（不可以）
            if (isFreeActivation === 1) {
                return true;
            } else {
                return false;
            }
        }
        return '正在获取用户信息';
    }

    /**
     * 判断用户是否绑定了设备
     * @param userInfoData
     * @returns {*}
     */
    isBindDevice(userInfoData) {
        const {status, data} = userInfoData || {};
        if (typeof status !== 'undefined') {
            const {isReDevice, bindExpireTime} = data;
            //是否绑定设备1（已绑定）2（未绑定设备）3（绑定过期）
            if (isReDevice === 1) {
                return true;
            } else {
                return false;
            }
        }
        return '正在获取用户信息';
    }

    /**
     * 判断用户是否是vip
     * @param userInfoData
     * @returns {*}
     */
    isVip(userInfoData) {
        const {status, data} = userInfoData || {};
        if (typeof status !== 'undefined') {
            const {vipStatus, expireTime} = data;
            // vip状态-1（从未开通过vip）0（vip已过期）1（在vip有效期）
            if (vipStatus === 1 && new Date().getTime() < expireTime) {
                return true;
            } else {
                return false;
            }
        }
        return '正在获取用户信息';
    }
}
