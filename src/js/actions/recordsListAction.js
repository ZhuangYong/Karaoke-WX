/**
 * Created by Zed on 2017/7/31.
 */

import ActionTypes from "./actionTypes";
import {comFetch} from "../utils/fetchUtils";
import apiUrl from "./apiUrl";
import sysConfig from "../utils/sysConfig";

export function getRecordsList(data, headers) {

    const url = sysConfig.apiDomain + apiUrl.API_RECORDS_LIST;
    return (dispatch) => {
        comFetch(dispatch, data, {
            url: url,
            type: "post",
            headers: headers,
            action: ActionTypes.RECORDSLIST.API_GET_RECORDS_LIST
        }, null);
    };
}
