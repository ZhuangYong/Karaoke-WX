import ActionTypes from "../../actions/actionTypes";

let initialState = {
    info: 'common store',
    userStamp: 0,
    userLoading: false,
    msg: ''
};

let common = function (state = initialState, action = {}) {
    switch (action.type) {
        default:
            return state;
    }
};

export default common;
