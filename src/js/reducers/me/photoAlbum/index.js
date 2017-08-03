/**
 * Created by Zed on 2017/8/3.
 */
import ActionTypes from "../../../actions/actionTypes";
import {fetchProcess} from "../../../utils/fetchUtils";

let initialState = {};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case ActionTypes.PHOTOALBUM.API_GET_PHOTOALBUM_LIST:
            return fetchProcess(state, action, {
                data: "photoAlbumListData",
                msg: "photoAlbumListMsg",
                loading: "photoAlbumListLoading"
            });
        default:
            return state;
    }
};
