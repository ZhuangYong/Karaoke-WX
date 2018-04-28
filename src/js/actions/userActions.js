/**
 * Created by walljack@163.com on 2017/7/24.
 */

import {comFetch} from "../utils/fetchUtils";
import apiUrl from "./apiUrl";
import ActionTypes from "./actionTypes";
import sysConfig from "../utils/sysConfig";

// ott登录
export function OSSAccessToken(data, headers, callback) {
    const url = sysConfig.apiDomain + apiUrl.API_OSS_TOKEN;
    return (dispatch) => {
        comFetch(dispatch, data, {
            url: url,
            type: "post",
            headers: headers,
            action: ActionTypes.USER.API_OSS_TOKEN
        }, callback);
    };
}

// ott登录
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

// ott退出登录
export function OTTLogout(data, headers, callback) {
    const url = sysConfig.apiDomain + apiUrl.API_OTT_LOGOUT;
    return (dispatch) => {
        comFetch(dispatch, data, {
            url: url,
            type: "post",
            headers: headers,
            action: ActionTypes.USER.API_OTT_LOGOUT
        }, callback);
    };
}

// 获取用户信息
export function getUserInfo(data, headers, callback) {
    const url = sysConfig.apiDomain + apiUrl.API_GET_USER_INFO;
    // const url = `api/userInfo.json`;
    return (dispatch) => {
        comFetch(dispatch, data, {
            url: url,
            type: "post",
            headers: headers,
            action: ActionTypes.USER.API_GET_USER_INFO
        }, callback);
    };
}

// 获取微信js sdk config参数
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

// 获取录音列表
export function getRecordsList(data, headers, callback, failBack) {

    const url = sysConfig.apiDomain + apiUrl.API_RECORDS_LIST;
    return (dispatch) => {
        comFetch(dispatch, data, {
            url: url,
            type: "post",
            headers: headers,
            action: ActionTypes.USER.API_GET_RECORDS_LIST
        }, callback, failBack);
    };
}

// 删除录音列表
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

// 更换录音封面图
export function changeFirstPage(data, headers, callback) {

    const url = sysConfig.apiDomain + apiUrl.API_CHANGE_FIRST_PAGE;
    return (dispatch) => {
        comFetch(dispatch, data, {
            url: url,
            type: "post",
            headers: headers,
            action: ActionTypes.USER.API_CHANGE_FIRST_PAGE
        }, callback);
    };
}

// 获取我的相册列表
export function getPhotoAlbumList(data, headers) {

    const url = sysConfig.apiDomain + apiUrl.API_PHOTO_ALBUM_LIST;

    return (dispatch) => {
        comFetch(dispatch, data, {
            url: url,
            type: "post",
            headers: headers,
            action: ActionTypes.USER.API_GET_PHOTO_ALBUM_LIST
        }, null);
    };
}

// 我的相册上传图片
export function uploadImg(data, headers, callback) {

    const url = sysConfig.apiDomain + apiUrl.API_OSS_UPLOAD_ALBUM;

    return (dispatch) => {
        comFetch(dispatch, data, {
            url: url,
            type: "post",
            headers: headers,
            action: ActionTypes.USER.API_OSS_UPLOAD_ALBUM
        }, callback);
    };
}

// 上传已存储到微信服务器的图片（自建后台）
export function ossUploadWxPic(data, headers, callback) {

    const url = sysConfig.apiDomain + apiUrl.API_OSS_UPLOAD_WX_PIC;

    return (dispatch) => {
        comFetch(dispatch, data, {
            url: url,
            type: "post",
            headers: headers,
            action: ActionTypes.USER.API_OSS_UPLOAD_ALBUM
        }, callback);
    };
}

// 删除图片
export function deleteImg(data, headers, callback) {

    const url = sysConfig.apiDomain + apiUrl.API_PHOTO_ALBUM_DELETE;

    return (dispatch) => {
        comFetch(dispatch, data, {
            url: url,
            type: "post",
            headers: headers,
            action: ActionTypes.USER.API_PHOTO_ALBUM_DELETE
        }, callback);
    };
}

// 获取订单列表
export function getOrderForm(data, headers, callback, failBack) {

    const url = sysConfig.apiDomain + apiUrl.API_GET_ORDER_FORM;

    return (dispatch) => {
        comFetch(dispatch, data, {
            url: url,
            type: "post",
            headers: headers,
            action: ActionTypes.USER.API_GET_ORDER_FORM
        }, callback, failBack);
    };
}

// 删除订单
export function deleteOrder(data, headers, callback, fail) {

    const url = sysConfig.apiDomain + apiUrl.API_GET_DELETE_ORDER;

    return (dispatch) => {
        comFetch(dispatch, data, {
            url: url,
            type: "post",
            headers: headers,
            action: ActionTypes.USER.API_GET_DELETE_ORDER
        }, callback, fail);
    };
}

// 获取未开发票的订单
export function getInvoiceOrder(data, headers, callback) {

    const url = sysConfig.apiDomain + apiUrl.API_GET_INVOICE_ORDER;

    return (dispatch) => {
        comFetch(dispatch, data, {
            url: url,
            type: "post",
            headers: headers,
            action: ActionTypes.USER.API_GET_INVOICE_ORDER
        }, callback);
    };
}

// 查开票历史
export function getInvoiceList(data, headers, callback) {

    const url = sysConfig.apiDomain + apiUrl.API_GET_INVOICE_LIST;

    return (dispatch) => {
        comFetch(dispatch, data, {
            url: url,
            type: "post",
            headers: headers,
            action: ActionTypes.USER.API_GET_INVOICE_LIST
        }, callback);
    };
}

// 查询开票详情
export function getInvoiceDetail(data, headers, callback) {

    const url = sysConfig.apiDomain + apiUrl.API_GET_INVOICE_DETAIL;

    return (dispatch) => {
        comFetch(dispatch, data, {
            url: url,
            type: "post",
            headers: headers,
            action: ActionTypes.USER.API_GET_INVOICE_DETAIL
        }, callback);
    };
}

// 查询发票包含订单列表
export function getInvoiceOrderForDetail(data, headers, callback) {

    const url = sysConfig.apiDomain + apiUrl.API_GET_INVOICE_DETAIL_ORDER;

    return (dispatch) => {
        comFetch(dispatch, data, {
            url: url,
            type: "post",
            headers: headers,
            action: ActionTypes.USER.API_GET_INVOICE_DETAIL_ORDER
        }, callback);
    };
}

// 提交电子发票开票信息
export function submitInvoice(data, headers, callback) {

    const url = sysConfig.apiDomain + apiUrl.API_GET_INVOICE_SUBMIT;

    return (dispatch) => {
        comFetch(dispatch, data, {
            url: url,
            type: "post",
            headers: headers,
            action: ActionTypes.USER.API_GET_INVOICE_SUBMIT
        }, callback);
    };
}

// 获取意见反馈问题列表
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

// 上传图片base64数据
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

// 调用微信api上传图片
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

// 提交意见反馈
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

// 绑定设备
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

