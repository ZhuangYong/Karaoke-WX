import ActionTypes from "../../actions/actionTypes";
import {fetchProcess} from "../../utils/fetchUtils";

let initialState = {
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case ActionTypes.COMMENT.API_GET_COMMENT_LIST:
            return fetchProcess(state, action, {
                data: "commentList",
                msg: "msg",
                loading: "loading",
                stamp: "commentListStamp"
            });
        default:
            return state;
    }
};
