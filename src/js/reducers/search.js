/**
 * Created by walljack@163.com on 2017/8/2.
 */
import ActionTypes from "../actions/actionTypes";
import {fetchProcess} from "../utils/fetchUtils";

let initState = {
    hotKeyWords: null,
    searchResult: null
};

export default (state = initState, action = {}) => {
    switch (action.type) {
        case ActionTypes.SEARCH.API_GET_HOT_WORD :
            return fetchProcess(state, action, {
                data: "hotKeyWords",
                msg: "hotKeyWordsMsg",
                loading: "loading"
            });
        case ActionTypes.SEARCH.API_SEARCH :
            return fetchProcess(state, action, {
                data: "searchResult",
                msg: "searchResultMsg",
                loading: "loading"
            });
        default:
            return state;
    }
};
