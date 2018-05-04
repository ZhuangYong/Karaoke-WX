import ActionTypes from "../../actions/actionTypes";
import {fetchProcess} from "../../utils/fetchUtils";

let initialState = {
    commentListStamp: 0,
    commentReplyListStamp: 0
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
        case ActionTypes.COMMENT.API_GET_COMMENT_REPLY_LIST:
            return fetchProcess(state, action, {
                data: "commentReplyList",
                msg: "msg",
                loading: "loading",
                stamp: "commentReplyListStamp"
            });
        default:
            return state;
    }
};
