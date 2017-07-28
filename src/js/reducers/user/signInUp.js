/**
 * Created by walljack@163.com on 2017/7/24.
 */

import ActionTypes from "../../../js/actions/actionTypes";
import {fetchProcess} from "../../../js/utils/fetchUtils";

const initState = {};

let SinInUp = (state = initState, action) => {
    switch (action.type) {
        case ActionTypes.USER.API_LOGIN:
            return fetchProcess(state, action, {
                data: "loginData",
                msg: "loginMsg",
                loading: "loginLoading"
            });
        default:
            return state;
    }
};

export default SinInUp;
