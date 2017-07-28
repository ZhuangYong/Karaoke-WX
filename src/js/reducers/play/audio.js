import ActionTypes from "../../actions/actionTypes";
import {fetchProcess} from "../../utils/fetchUtils";

let initialState = {
    audioInfo: {}
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case ActionTypes.AUDIO.API_GET_SHARE_AUDIO:
            return fetchProcess(state, action, {
                data: "audioInfo",
                msg: "msg",
                loading: "loading"
            });
        default:
            return state;
    }
};
