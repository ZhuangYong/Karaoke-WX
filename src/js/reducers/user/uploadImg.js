/**
 * Created by Zed on 2017/8/15.
 */
import ActionTypes from "../../actions/actionTypes";
import {fetchProcess} from "../../utils/fetchUtils";

let initState = {
    uploadImgStamp: 0
};
export default (state = initState, action = {}) => {
    switch (action.type) {
        case ActionTypes.USER.API_UPLOAD_IMG_BASE64:
            return fetchProcess(state, action, {
                data: "uploadImgData",
                msg: "uploadImgMsg",
                stamp: "uploadImgStamp",
                loading: "uploadImgLoading"
            });
        default:
            return state;
    }
};
