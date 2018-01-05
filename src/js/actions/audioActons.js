import ActionTypes from "./actionTypes";
import {comFetch} from "../utils/fetchUtils";
import apiUrl from "./apiUrl";
import sysConfig from "../utils/sysConfig";

export function getShareAudio(data, headers, callback, failBack) {
    const url = sysConfig.apiDomain + apiUrl.API_QUERY_USER_SOUND;
    return (dispatch) => {
        comFetch(dispatch, data, {
            url: url,
            headers: headers,
            action: ActionTypes.AUDIO.API_GET_SHARE_AUDIO
        }, callback, failBack);
    };
}

/**
 * 首页下部推荐歌曲（获取热歌）
 * @param data
 * @param headers
 * @param callback
 * @param failBack
 * @returns {function(*=)}
 */
export function getRecommend(data, headers, callback, failBack) {
    const url = sysConfig.apiDomain + apiUrl.API_QUERY_ALBUM;
    return (dispatch) => {
        comFetch(dispatch, data, {
            url: url,
            headers: headers,
            action: ActionTypes.SONG.API_GET_RECOMMEND
        }, callback, failBack);
    };
}

/**
 * 推送
 * @param data
 * @param headers
 * @returns {function(*=)}
 */
export function push(data, headers, callback, failBack) {
    const url = sysConfig.apiDomain + apiUrl.API_PUSH;
    return (dispatch) => {
        comFetch(dispatch, data, {
            url: url,
            headers: headers,
            action: ActionTypes.SONG.API_PUSH
        }, callback, failBack);
    };
}

/**
 * 推送
 * @param urlPri
 * @param data
 * @param headers
 * @returns {function(*=)}
 */
export function pushLocal(urlPri, data, headers, callback, failBack) {
    const url = urlPri + apiUrl.API_PUSH;
    return (dispatch) => {
        comFetch(dispatch, data, {
            url: url,
            type: "get",
            headers: headers,
            timeout: 3000,
            action: ActionTypes.SONG.API_PUSH
        }, callback, failBack);
    };
}

/**
 * 获取已点歌曲列表
 * @param data
 * @param headers
 * @param callback
 * @param failBack
 * @returns {function(*=)}
 */
export function getChooseList(data, headers, callback, failBack) {
    const url = sysConfig.apiDomain + apiUrl.API_CHOOSE_LIST;
    return (dispatch) => {
        comFetch(dispatch, data, {
            url: url,
            headers: headers,
            action: ActionTypes.SONG.API_CHOOSE_LIST
        }, callback, failBack);
    };
}

/**
 * 获取已唱过的歌曲列表
 * @param data
 * @param headers
 * @returns {function(*=)}
 */
export function getHistorySongList(data, headers) {
    const url = sysConfig.apiDomain + apiUrl.API_CHOOSE_LIST;
    return (dispatch) => {
        comFetch(dispatch, data, {
            url: url,
            headers: headers,
            action: ActionTypes.SONG.API_CHOOSE_HISTORY_LIST
        }, null);
    };
}

/**
 * 置顶
 * @param data
 * @param headers
 * @param callback
 * @returns {function(*=)}
 */
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

/**
 * 获取歌手分类列表
 * @param data
 * @param headers
 * @param callback
 * @returns {function(*=)}
 */
export function getSingerCategoryAlbum(data, headers, callback, failBack) {
    const url = sysConfig.apiDomain + apiUrl.API_GET_SINGER_CATEGORY_ALBUM;
    return (dispatch) => {
        comFetch(dispatch, data, {
            url: url,
            headers: headers,
            action: ActionTypes.SONG.API_GET_SINGER_CATEGORY_ALBUM
        }, callback, failBack);
    };
}

/**
 * 获取歌手列表
 * @param data
 * @param headers
 * @param callback
 * @param failBack
 * @returns {function(*=)}
 */
export function getActorsAlbum(data, headers, callback, failBack) {
    const url = sysConfig.apiDomain + apiUrl.API_GET_ACTORS_ALBUM;
    return (dispatch) => {
        comFetch(dispatch, data, {
            url: url,
            headers: headers,
            action: ActionTypes.SONG.API_GET_ACTORS_ALBUM
        }, callback, failBack);
    };
}

/**
 * 获取分类列表
 * @param data
 * @param headers
 * @param callback
 * @returns {function(*=)}
 */
export function getCatAlbum(data, headers, callback) {
    const url = sysConfig.apiDomain + apiUrl.API_GET_CAT_ALBUM;
    return (dispatch) => {
        comFetch(dispatch, data, {
            url: url,
            headers: headers,
            action: ActionTypes.SONG.API_GET_CAT_ALBUM
        }, callback);
    };
}

/**
 * 获取指定分类下的歌曲列表
 * @param data
 * @param headers
 * @param callback
 * @param failBack
 * @returns {function(*=)}
 */
export function getCatSongList(data, headers, callback, failBack) {
    const url = sysConfig.apiDomain + apiUrl.API_GET_CAT_ALBUM;
    return (dispatch) => {
        comFetch(dispatch, data, {
            url: url,
            headers: headers,
            action: ActionTypes.SONG.API_GET_CAT_SONG_LIST
        }, callback, failBack);
    };
}

/**
 * 获取热歌（子栏目）
 * @param data
 * @param headers
 * @param callback
 * @param failBack
 * @returns {function(*=)}
 */
export function getRankAlbum(data, headers, callback, failBack) {
    const url = sysConfig.apiDomain + apiUrl.API_QUERY_ALBUM;
    return (dispatch) => {
        comFetch(dispatch, data, {
            url: url,
            headers: headers,
            action: ActionTypes.SONG.API_GET_RANK_ALBUM
        }, callback, failBack);
    };
}

/**
 * 获取推荐（首页用）
 * @param data
 * @param headers
 * @param callback
 * @returns {function(*=)}
 */
export function getAlbumRecommend(data, headers, callback) {
    const url = sysConfig.apiDomain + apiUrl.API_QUERY_ALBUM_RECOMMEND;
    return (dispatch) => {
        comFetch(dispatch, data, {
            url: url,
            headers: headers,
            action: ActionTypes.SONG.API_QUERY_ALBUM_RECOMMEND
        }, callback);
    };
}

/**
 * 获取推荐歌曲列表
 * @param data
 * @param headers
 * @param callback
 * @param failBack
 * @returns {function(*=)}
 */
export function getAlbumRecommendSongList(data, headers, callback, failBack) {
    const url = sysConfig.apiDomain + apiUrl.API_QUERY_ALBUM_RECOMMEND;
    return (dispatch) => {
        comFetch(dispatch, data, {
            url: url,
            headers: headers,
            action: ActionTypes.SONG.API_QUERY_ALBUM_RECOMMEND_SONG_LIST
        }, callback, failBack);
    };
}

/**
 * 获取排行（首页用）
 * @param data
 * @param headers
 * @param callback
 * @returns {function(*=)}
 */
export function getRanking(data, headers, callback) {
    const url = sysConfig.apiDomain + apiUrl.API_QUERY_ALBUM;
    return (dispatch) => {
        comFetch(dispatch, data, {
            url: url,
            headers: headers,
            action: ActionTypes.SONG.API_QUERY_RANKING
        }, callback);
    };
}
