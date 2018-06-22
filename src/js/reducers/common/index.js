import ActionTypes from "../../actions/actionTypes";
import {fetchProcess} from "../../utils/fetchUtils";

let initialState = {
    info: 'common store',
    globAlert: "",
    testLocalPushStamp: 0,
    localNetIsWork: true,
    weixinConfigFinish: false,
    singerList: {},
    commonInfo: {}
};

let common = function (state = initialState, action = {}) {

    switch (action.type) {
        case ActionTypes.COMMON.COMMON_UPDATE_SCREEN:
            return Object.assign({}, state, {
                r: HYAPP.APP_PX,
                w: HYAPP.APP_W,
                h: HYAPP.APP_H
            });
        case ActionTypes.COMMON.COMMON_GLOB_ALERT:
            return Object.assign({}, state, {
                globAlert: action.globAlert,
                alertData: action.alertData
            });
        case ActionTypes.COMMON.COMMON_LOCAL_NETWORK_STATUS:
            return Object.assign({}, state, {
                localNetIsWork: action.localNetIsWork
            });
        case ActionTypes.COMMON.COMMON_WEIXIN_CONFIG_FINISHED:
            return Object.assign({}, state, {
                weixinConfigFinish: action.weixinConfigFinish
            });
        case ActionTypes.COMMON.API_LOCAL_TEST_PUSH:
            return fetchProcess(state, action, {
                data: "testLocalPush",
                stamp: "testLocalPushStamp",
                msg: "testLocalPushMsg",
                loading: "loading"
            });
        case ActionTypes.COMMON.COMMON_SET_SINGER_LIST:
            return Object.assign({}, state, {
                singerList: action.singerList
            });
        case ActionTypes.COMMON.COMMON_SET_COMMON_INOF:
            return Object.assign({}, state, {
                commonInfo: action.commonInfo
            });
        case ActionTypes.COMMON.COMMON_GET_LOCAL_DATA:
            return fetchProcess(state, action, {
                data: "language",
                stamp: "languageStamp",
                msg: "languageMsg",
                loading: "loading"
            });
        case ActionTypes.COMMON.API_GET_SYS_CONFIG:
            return fetchProcess(state, action, {
                data: "channelConfig",
                stamp: "channelConfigStamp",
                msg: "channelConfigMsg",
                loading: "loading"
            });
        default:
            return state;
    }
};

export default common;
