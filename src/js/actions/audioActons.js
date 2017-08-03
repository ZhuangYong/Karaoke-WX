import ActionTypes from "./actionTypes";
import {comFetch} from "../utils/fetchUtils";
import apiUrl from "./apiUrl";
import sysConfig from "../utils/sysConfig";

export function getShareAudio(data, headers) {
    const url = sysConfig.apiDomain + apiUrl.API_QUERY_USER_SOUND;
    return (dispatch) => {
        comFetch(dispatch, data, {
            url: url,
            headers: headers,
            action: ActionTypes.AUDIO.API_GET_SHARE_AUDIO
        }, null);
    };
}

export function getRecommend(data, headers) {
    const url = sysConfig.apiDomain + apiUrl.API_QUERY_ALBUM;
    return (dispatch) => {
        comFetch(dispatch, data, {
            url: url,
            headers: headers,
            action: ActionTypes.SONG.API_GET_RECOMMEND
        }, null);
    };
}

export function push(data, headers) {
    const url = sysConfig.apiDomain + apiUrl.API_PUSH;
    return (dispatch) => {
        comFetch(dispatch, data, {
            url: url,
            headers: headers,
            action: ActionTypes.SONG.API_PUSH
        }, null);
    };
}

export function getChooseList(data, headers) {
    const url = sysConfig.apiDomain + apiUrl.API_CHOOSE_LIST;
    return (dispatch) => {
        comFetch(dispatch, data, {
            url: url,
            headers: headers,
            action: ActionTypes.SONG.API_CHOOSE_LIST
        }, null);
    };
}

export function setSongTop(data, headers, callback) {
    const url = sysConfig.apiDomain + apiUrl.API_SET_SONG_TOP;
    return (dispatch) => {
        comFetch(dispatch, data, {
            url: url,
            headers: headers,
            action: ActionTypes.SONG.API_SET_SONG_TOP
        }, callback);
    };
}
