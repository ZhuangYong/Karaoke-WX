import ActionTypes from "../../actions/actionTypes";

let initialState = {
    info: 'common store',
    userStamp: 0,
    userLoading: false,
    msg: ''
};

let common = function (state = initialState, action = {}) {

    switch (action.type) {
        case ActionTypes.COMMON.COMMON_UPDATE_SCREEN:
            return Object.assign({}, state, {
                w: HYAPP.APP_W,
                h: HYAPP.APP_H
            });
        default:
            return state;
    }
};

export default common;
