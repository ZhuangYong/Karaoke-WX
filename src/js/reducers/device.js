/**
 * Created by walljack@163.com on 2017/8/2.
 */
import ActionTypes from "../actions/actionTypes";
import {fetchProcess} from "../utils/fetchUtils";

let initState = {
};

export default (state = initState, action = {}) => {
    switch (action.type) {
        case ActionTypes.DEVICE.API_GET_OTT_DEVICE_STATUS :
            return fetchProcess(state, action, {
                data: "ottInfo",
                msg: "ottInfoMsg",
                loading: "loading"
            });
        default:
            return state;
    }
};
