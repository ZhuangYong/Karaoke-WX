/**
 * Created by walljack@163.com on 2017/7/24.
 */

import ActionTypes from "../../../js/actions/actionTypes";
import {fetchProcess} from "../../../js/utils/fetchUtils";

const initState = {
    userInfoStamp: 0
};

let UserInfo = (state = initState, action) => {
    switch (action.type) {
        case ActionTypes.USER.API_GET_USER_INFO:
            return fetchProcess(state, action, {
                data: "userInfoData",
                msg: "userInfoMsg",
                loading: "userInfoLoading",
                stamp: "userInfoStamp"
            });
        default:
            return state;
    }
};

export default UserInfo;
