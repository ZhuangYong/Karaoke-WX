/**
 * Created by Zed on 2017/8/15.
 */

import ActionTypes from "../../../js/actions/actionTypes";
import {fetchProcess} from "../../../js/utils/fetchUtils";

const initState = {};

export default (state = initState, action) => {
    switch (action.type) {
        case ActionTypes.USER.API_OTT_LOGIN:
            return fetchProcess(state, action, {
                data: "ottLoginData",
                msg: "ottLoginMsg",
                loading: "ottLoginLoading"
            });
        default:
            return state;
    }
};
