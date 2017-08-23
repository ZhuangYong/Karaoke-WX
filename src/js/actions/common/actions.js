import ActionTypes from '../actionTypes';

export function updateScreen() {
    return {
        type: ActionTypes.COMMON.COMMON_UPDATE_SCREEN,
        info: 'update screen w, h'
    };
}

export function getUserInfoFromSession() {
    return {
        type: ActionTypes.COMMON.COMMON_UPDATE_USER_INFO,
        info: 'update user info'
    };
}

export function setGlobAlert(msg) {
    return {
        type: ActionTypes.COMMON.COMMON_GLOB_ALERT,
        globAlert: msg
    };
}
