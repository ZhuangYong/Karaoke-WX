/**
 * Created by Zed on 2017/8/4.
 */
import ActionTypes from "../../../actions/actionTypes";
import {fetchProcess} from "../../../utils/fetchUtils";

let initState = {
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
        case ActionTypes.USER.API_PHOTO_ALBUM_UPLOAD:
            return fetchProcess(state, action, {
                data: "photoAlbumUpload",
                msg: "photoAlbumUploadMsg",
                stamp: "photoAlbumUploadStamp",
                loading: "photoAlbumUploadLoading"
            });
        case ActionTypes.USER.API_PHOTO_ALBUM_DELETE:
            return fetchProcess(state, action, {
                data: "photoAlbumDelete",
                msg: "photoAlbumDeleteMsg",
                loading: "photoAlbumDeleteLoading"
            });
        default:
            return state;
    }
};
