import ActionTypes from '../actionTypes';
import apiUrl from "../apiUrl";
import {comFetch} from "../../utils/fetchUtils";
import sysConfig from "../../utils/sysConfig";

export function updateScreen() {
    return {
        type: ActionTypes.COMMON.COMMON_UPDATE_SCREEN,
        info: 'update screen w, h'
    };
}

export function getLocalesData(language, callback, failBack) {
    switch (language) {
        case 'EN':
            language = 'en-US';
            break;
        case 'TW':
        case 'HK':
            language = 'zh-Hk';
            break;
        case 'CN':
            language = 'zh-CN';
            break;
        default:
            break;
    }
    const url = apiUrl.API_GET_LOCAL_LANGUAGE + language + ".json";
    return (dispatch) => {
        comFetch(dispatch, {}, {
            url: url,
            type: "get",
            action: ActionTypes.COMMON.COMMON_GET_LOCAL_DATA
        }, callback, failBack);
    };
}

export function getUserInfoFromSession() {
    return {
        type: ActionTypes.COMMON.COMMON_UPDATE_USER_INFO,
        info: 'update user info'
    };
}

export function setGlobAlert(msg, data) {
    return {
        type: ActionTypes.COMMON.COMMON_GLOB_ALERT,
        alertData: data,
        globAlert: msg
    };
}

export function setLocalNet(iswork) {
    return {
        type: ActionTypes.COMMON.COMMON_LOCAL_NETWORK_STATUS,
        localNetIsWork: iswork
    };
}

export function setWeixinConfigFinished(finished) {
    return {
        type: ActionTypes.COMMON.COMMON_WEIXIN_CONFIG_FINISHED,
        weixinConfigFinish: finished
    };
}

export function checkLocal(urlPri, data, headers, callback, failBack) {
    const url = urlPri + apiUrl.API_LOCAL_TEST_PUSH;
    return (dispatch) => {
        comFetch(dispatch, data, {
            url: url,
            type: "get",
            headers: headers,
            action: ActionTypes.COMMON.API_LOCAL_TEST_PUSH
        }, callback, failBack);
    };
}

export function setSingerList(data) {
    return {
        type: ActionTypes.COMMON.COMMON_SET_SINGER_LIST,
        singerList: data
    };
}

export function setCommonInfo(data) {
    return {
        type: ActionTypes.COMMON.COMMON_SET_COMMON_INOF,
        commonInfo: data
    };
}
