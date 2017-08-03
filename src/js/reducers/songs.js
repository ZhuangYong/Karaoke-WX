/**
 * Created by walljack@163.com on 2017/8/1.
 */
import ActionTypes from "../actions/actionTypes";
import {fetchProcess} from "../utils/fetchUtils";

let initState = {
    recommendSongs: null,
    chooseListStamp: 0
};
export default (state = initState, action = {}) => {
    switch (action.type) {
        case ActionTypes.SONG.API_GET_RECOMMEND:
            return fetchProcess(state, action, {
                data: "recommendSongs",
                msg: "recommendSongsMsg",
                loading: "loading"
            });
        case ActionTypes.SONG.API_PUSH:
            return fetchProcess(state, action, {
                data: "push",
                msg: "pushMsg",
                loading: "loading"
            });
        case ActionTypes.SONG.API_CHOOSE_LIST:
            return fetchProcess(state, action, {
                data: "chooseList",
                msg: "chooseListMsg",
                stamp: "chooseListStamp",
                loading: "loading"
            });
        case ActionTypes.SONG.API_SET_SONG_TOP:
            return fetchProcess(state, action, {
                data: "setSongTop",
                msg: "setSongTopMsg",
                loading: "loading"
            });
        default:
            return state;
    }
};
