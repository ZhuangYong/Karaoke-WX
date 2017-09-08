import ActionTypes from "./actionTypes";
import {comFetch} from "../utils/fetchUtils";
import apiUrl from "./apiUrl";
import sysConfig from "../utils/sysConfig";

export function getHotWords(data, headers) {
    const url = sysConfig.apiDomain + apiUrl.API_GET_HOT_WORD;
    return (dispatch) => {
        comFetch(dispatch, data, {
            url: url,
            headers: headers,
            action: ActionTypes.SEARCH.API_GET_HOT_WORD
        }, null);
    };
}

export function search(data, headers, callback, failBack) {
    const url = sysConfig.apiDomain + apiUrl.API_SEARCH;
    return (dispatch) => {
        comFetch(dispatch, data, {
            url: url,
            headers: headers,
            action: ActionTypes.SEARCH.API_SEARCH
        }, callback, failBack);
    };
}
