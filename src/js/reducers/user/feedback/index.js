/**
 * Created by Zed on 2017/8/14.
 */
import ActionTypes from "../../../../js/actions/actionTypes";
import {fetchProcess} from "../../../../js/utils/fetchUtils";

const initState = {
    questionListStamp: 0
};

export default (state = initState, action) => {
    switch (action.type) {
        case ActionTypes.USER.API_GET_FEEDBACK_QUESTION_LIST:
            return fetchProcess(state, action, {
                data: "questionListData",
                msg: "questionListMsg",
                stamp: "questionListStamp",
                loading: "questionListLoading"
            });
        case ActionTypes.USER.API_GET_FEEDBACK_SUBMIT:
            return fetchProcess(state, action, {
                data: "questionSubmitData",
                msg: "questionSubmitMsg",
                loading: "questionSubmitLoading"
            });
        default:
            return state;
    }
};

