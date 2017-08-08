/**
 * Created by Zed on 2017/8/3.
 */
import ActionTypes from "./actionTypes";
import {comFetch} from "../utils/fetchUtils";
import apiUrl from "./apiUrl";
import sysConfig from "../utils/sysConfig";

export function getPhotoAlbumList(data, headers) {

    const url = apiUrl.API_PHOTOALBUM_LIST;

    return (dispatch) => {
        comFetch(dispatch, data, {
            url: url,
            type: "get",
            headers: headers,
            action: ActionTypes.PHOTOALBUM.API_GET_PHOTOALBUM_LIST
        }, null);
    };
}
