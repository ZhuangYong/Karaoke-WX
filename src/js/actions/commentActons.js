import ActionTypes from "./actionTypes";
import {comFetch} from "../utils/fetchUtils";
import apiUrl from "./apiUrl";
import sysConfig from "../utils/sysConfig";

export function getComments(data, headers, callback) {
    const url = sysConfig.apiDomain + apiUrl.API_GET_COMMENT_LIST;
    return (dispatch) => {
        comFetch(dispatch, data, {
            url: url,
            type: "post",
            headers: headers,
            action: ActionTypes.COMMENT.API_GET_COMMENT_LIST
        }, callback);
    };
}
export function saveComments(data, headers, callback) {
    const url = sysConfig.apiDomain + apiUrl.API_GET_COMMENT_OR_REPLY;
    return (dispatch) => {
        comFetch(dispatch, data, {
            url: url,
            type: "post",
            headers: headers,
            action: ActionTypes.COMMENT.API_GET_COMMENT_OR_REPLY
        }, callback);
    };
}
