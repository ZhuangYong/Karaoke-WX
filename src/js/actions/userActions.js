/**
 * Created by walljack@163.com on 2017/7/24.
 */

import {comFetch} from "../utils/fetchUtils";
import api from "./apiUrl";
import ActionTypes from "./actionTypes";

export function login() {
    const url = HYAPP.ApiDomain + api.API_LOGIN;
    return (dispatch) => {
        comFetch(dispatch, {}, {
            url: url,
            type: "post",
            action: ActionTypes.USER.API_LOGIN
        }, null);
    };

}
