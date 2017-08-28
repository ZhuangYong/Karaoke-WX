import ActionTypes from "../../actions/actionTypes";
import {fetchProcess} from "../../utils/fetchUtils";

let initialState = {
    info: 'common store',
    globAlert: "",
    testLocalPushStamp: 0,
    localNetIsWork: true
};

let common = function (state = initialState, action = {}) {

    switch (action.type) {
        case ActionTypes.COMMON.COMMON_UPDATE_SCREEN:
            return Object.assign({}, state, {
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
        case ActionTypes.COMMON.API_LOCAL_TEST_PUSH:
            return fetchProcess(state, action, {
                data: "testLocalPush",
                stamp: "testLocalPushStamp",
                msg: "testLocalPushMsg",
                loading: "loading"
            });

        default:
            return state;
    }
};

export default common;
