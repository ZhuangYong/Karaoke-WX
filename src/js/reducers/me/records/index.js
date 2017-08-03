/**
 * Created by Zed on 2017/7/31.
 */
import ActionTypes from "../../../actions/actionTypes";
import {fetchProcess} from "../../../utils/fetchUtils";

let initialState = {};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case ActionTypes.RECORDSLIST.API_GET_RECORDS_LIST:
            return fetchProcess(state, action, {
                data: "recordsListData",
                msg: "recordsListMsg",
                loading: "recordsListLoading"
            });
        default:
            return state;
    }
};
