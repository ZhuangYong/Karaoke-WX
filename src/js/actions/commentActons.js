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

export function getCommentReplys(data, headers, callback) {
    const url = sysConfig.apiDomain + apiUrl.API_GET_COMMENT_REPLY_LIST;
    return (dispatch) => {
        comFetch(dispatch, data, {
            url: url,
            type: "post",
            headers: headers,
            action: ActionTypes.COMMENT.API_GET_COMMENT_REPLY_LIST
        }, callback);
    };
}
export function saveComments(data, headers, callback, fail) {
    const url = sysConfig.apiDomain + apiUrl.API_GET_COMMENT_OR_REPLY;
    return (dispatch) => {
        comFetch(dispatch, data, {
            url: url,
            type: "post",
            headers: headers,
            action: ActionTypes.COMMENT.API_GET_COMMENT_OR_REPLY
        }, callback, fail);
    };
}

export function deleteCommentOrReply(data, headers, callback, fail) {
    const url = sysConfig.apiDomain + apiUrl.API_GET_COMMENT_OR_REPLY_DELETE;
    return (dispatch) => {
        comFetch(dispatch, data, {
            url: url,
            type: "post",
            headers: headers,
            action: ActionTypes.COMMENT.API_GET_COMMENT_OR_REPLY_DELETE
        }, callback, fail);
    };
}
export function getCommentLikeCount(data, headers, callback, fail) {
    const url = sysConfig.apiDomain + apiUrl.API_GET_COMMENT_GET_LIKE;
    return (dispatch) => {
        comFetch(dispatch, data, {
            url: url,
            type: "post",
            headers: headers,
            action: ActionTypes.COMMENT.API_GET_COMMENT_GET_LIKE
        }, callback, fail);
    };
}

export function setCommentLikeOrCancel(data, headers, callback, fail) {
    const url = sysConfig.apiDomain + apiUrl.API_GET_COMMENT_LIKE_OR_CANCEL;
    return (dispatch) => {
        comFetch(dispatch, data, {
            url: url,
            type: "post",
            headers: headers,
            action: ActionTypes.COMMENT.API_GET_COMMENT_LIKE_OR_CANCEL
        }, callback, fail);
    };
}
