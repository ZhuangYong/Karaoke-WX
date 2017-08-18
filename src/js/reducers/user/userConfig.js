/**
 * Created by Zed on 2017/8/15.
 */

import ActionTypes from "../../../js/actions/actionTypes";
import {fetchProcess} from "../../../js/utils/fetchUtils";

const initState = {
    getUserConfigStamp: 0
};

export default (state = initState, action) => {
    switch (action.type) {
        case ActionTypes.USER.API_GET_USER_CONFIG:
            return fetchProcess(state, action, {
                data: "getUserConfig",
                msg: "getUserConfigMsg",
                loading: "loading",
                stamp: "getUserConfigStamp"
            });
        default:
            return state;
    }
};
