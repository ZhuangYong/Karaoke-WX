import ActionTypes from "../../actions/actionTypes";

let initialState = {
    info: 'common store',
    globAlert: ""
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
                globAlert: action.globAlert
            });
        default:
            return state;
    }
};

export default common;
