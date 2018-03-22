import ActionTypes from "../../actions/actionTypes";
import {fetchProcess} from "../../utils/fetchUtils";

let initialState = {
    audioInfo: {},
    allPicsData: {},
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case ActionTypes.AUDIO.API_GET_SHARE_AUDIO:
            return fetchProcess(state, action, {
                data: "audioInfo",
                msg: "msg",
                loading: "loading"
            });
        case ActionTypes.AUDIO.API_UPLOAD_SOUND_ALBUM:
            return fetchProcess(state, action, {
                data: "uploadData",
                msg: "uploadMsg",
                loading: "uploadLoading"
            });
        case ActionTypes.AUDIO.API_GET_ALL_PICS:
            return fetchProcess(state, action, {
                data: "allPicsData",
                msg: "allPicsMsg",
                loading: "allPicsLoading"
            });
        default:
            return state;
    }
};
