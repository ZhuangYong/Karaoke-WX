import ActionTypes from "./actionTypes";
import {comFetch} from "../utils/fetchUtils";

export function getShareAudio() {
    const url = HYAPP.ApiDomain + 'api/getShareAudio.json';
    return (dispatch) => {
        comFetch(dispatch, {}, {
            url: url,
            type: "get",
            action: ActionTypes.AUDIO.API_GET_SHARE_AUDIO
        }, null);
    };
}

function resetAudio(audio) {
    audio.currentTime = 0;
    const src = audio.src;
    audio.src = null;
    audio.src = src;
}
