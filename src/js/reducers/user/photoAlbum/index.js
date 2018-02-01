/**
 * Created by Zed on 2017/8/4.
 */
import ActionTypes from "../../../actions/actionTypes";
import {fetchProcess} from "../../../utils/fetchUtils";

let initState = {
    OSSTokenData: {},
    photoAlbumListStamp: 0,
    photoAlbumUploadStamp: 0
};
export default (state = initState, action = {}) => {
    switch (action.type) {
        case ActionTypes.USER.API_GET_PHOTO_ALBUM_LIST:
            return fetchProcess(state, action, {
                data: "photoAlbumList",
                msg: "photoAlbumListMsg",
                stamp: "photoAlbumListStamp",
                loading: "photoAlbumListLoading"
            });
        case ActionTypes.USER.API_PHOTO_ALBUM_DELETE:
            return fetchProcess(state, action, {
                data: "photoAlbumDelete",
                msg: "photoAlbumDeleteMsg",
                loading: "photoAlbumDeleteLoading"
            });
        case ActionTypes.USER.API_OSS_TOKEN:
            return fetchProcess(state, action, {
                data: "OSSTokenData",
                msg: "OSSTokenMsg"
            });
        case ActionTypes.USER.API_OSS_UPLOAD_ALBUM:
            return fetchProcess(state, action, {
                data: "OSSUploadData",
                msg: "OSSUploadMsg"
            });
        case ActionTypes.USER.API_OSS_UPLOAD_WX_PIC:
            return fetchProcess(state, action, {
                data: "OSSUploadWxPicData",
                msg: "OSSUploadWxPicMsg"
            });
        default:
            return state;
    }
};
