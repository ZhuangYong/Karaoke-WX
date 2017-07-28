import ActionTypes from "./actionTypes";
import {comFetch} from "../utils/fetchUtils";
import apiUrl from "./apiUrl";
import sysConfig from "../utils/sysConfig";

export function getShareAudio(data, headers) {

    const url = sysConfig.apiDomain + apiUrl.API_QUERY_USER_SOUND;
    return (dispatch) => {
        comFetch(dispatch, data, {
            url: url,
            type: "get",
            headers: headers,
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
