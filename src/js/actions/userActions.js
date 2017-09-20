/**
 * Created by walljack@163.com on 2017/7/24.
 */

import {comFetch} from "../utils/fetchUtils";
import apiUrl from "./apiUrl";
import ActionTypes from "./actionTypes";
import sysConfig from "../utils/sysConfig";

export function OTTLogin(data, headers, callback) {
    const url = sysConfig.apiDomain + apiUrl.API_OTT_LOGIN;
    return (dispatch) => {
        comFetch(dispatch, data, {
            url: url,
            type: "post",
            headers: headers,
            action: ActionTypes.USER.API_OTT_LOGIN
        }, callback);
    };
}

export function getUserInfo(data, headers, callback) {
    const url = sysConfig.apiDomain + apiUrl.API_GET_USER_INFO;
    return (dispatch) => {
        comFetch(dispatch, data, {
            url: url,
            type: "post",
            headers: headers,
            action: ActionTypes.USER.API_GET_USER_INFO
        }, callback);
    };
}

export function getUserConfig(data, headers, callback) {
    const url = sysConfig.apiDomain + apiUrl.API_GET_USER_CONFIG;
    return (dispatch) => {
        comFetch(dispatch, data, {
            url: url,
            type: "post",
            headers: headers,
            action: ActionTypes.USER.API_GET_USER_CONFIG
        }, callback);
    };

}

export function getRecordsList(data, headers) {

    const url = sysConfig.apiDomain + apiUrl.API_RECORDS_LIST;
    return (dispatch) => {
        comFetch(dispatch, data, {
            url: url,
            type: "post",
            headers: headers,
            action: ActionTypes.USER.API_GET_RECORDS_LIST
        }, null);
    };
}

export function deleteRecording(data, headers, callback) {

    const url = sysConfig.apiDomain + apiUrl.API_DELETE_RECORDING;
    return (dispatch) => {
        comFetch(dispatch, data, {
            url: url,
            type: "post",
            headers: headers,
            action: ActionTypes.USER.API_DELETE_RECORDING
        }, callback);
    };
}

export function getPhotoAlbumList(data, headers) {

    const url = apiUrl.API_PHOTO_ALBUM_LIST;

    return (dispatch) => {
        comFetch(dispatch, data, {
            url: url,
            type: "get",
            headers: headers,
            action: ActionTypes.USER.API_GET_PHOTO_ALBUM_LIST
        }, null);
    };
}

export function uploadImg(data, headers, callback) {

    const url = apiUrl.API_PHOTO_ALBUM_UPLOAD;

    return (dispatch) => {
        comFetch(dispatch, data, {
            url: url,
            type: "get",
            headers: headers,
            action: ActionTypes.USER.API_PHOTO_ALBUM_UPLOAD
        }, callback);
    };
}

export function deleteImg(data, headers, callback) {

    const url = apiUrl.API_PHOTO_ALBUM_DELETE;

    return (dispatch) => {
        comFetch(dispatch, data, {
            url: url,
            type: "get",
            headers: headers,
            action: ActionTypes.USER.API_PHOTO_ALBUM_DELETE
        }, callback);
    };
}

export function getOrderForm(data, headers, callback) {

    const url = apiUrl.API_GET_ORDER_FORM;

    return (dispatch) => {
        comFetch(dispatch, data, {
            url: url,
            type: "get",
            headers: headers,
            action: ActionTypes.USER.API_GET_ORDER_FORM
        }, callback);
    };
}

export function getFeedbackQuestionList(data, headers) {
    const url = sysConfig.apiDomain + apiUrl.API_GET_FEEDBACK_QUESTION_LIST;
    return (dispatch) => {
        comFetch(dispatch, data, {
            url: url,
            type: "post",
            headers: headers,
            action: ActionTypes.USER.API_GET_FEEDBACK_QUESTION_LIST
        }, null);
    };

}

export function uploadImgBase64(data, headers, callback) {

    const url = sysConfig.apiDomain + apiUrl.API_UPLOAD_IMG_BASE64;

    return (dispatch) => {
        comFetch(dispatch, data, {
            url: url,
            type: "post",
            headers: headers,
            action: ActionTypes.USER.API_UPLOAD_IMG_BASE64
        }, callback);
    };
}

export function uploadImgWeiXin(data, headers, callback) {

    const url = sysConfig.apiDomain + apiUrl.API_UPLOAD_IMG_WX;

    return (dispatch) => {
        comFetch(dispatch, data, {
            url: url,
            type: "post",
            headers: headers,
            action: ActionTypes.USER.API_UPLOAD_IMG_WX
        }, callback);
    };
}

export function feedbackSubmit(data, headers, callback) {

    const url = sysConfig.apiDomain + apiUrl.API_GET_FEEDBACK_SUBMIT;

    return (dispatch) => {
        comFetch(dispatch, data, {
            url: url,
            type: "post",
            headers: headers,
            action: ActionTypes.USER.API_GET_FEEDBACK_SUBMIT
        }, callback);
    };
}

export function bindDevice(data, headers, callback) {

    const url = sysConfig.apiDomain + apiUrl.API_BIND_DEVICE;

    return (dispatch) => {
        comFetch(dispatch, data, {
            url: url,
            type: "post",
            headers: headers,
            action: ActionTypes.USER.API_BIND_DEVICE
        }, callback);
    };
}

