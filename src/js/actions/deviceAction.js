
import ActionTypes from "./actionTypes";
import {comFetch} from "../utils/fetchUtils";
import apiUrl from "./apiUrl";
import sysConfig from "../utils/sysConfig";

export function getOttStatus(data, headers, callback) {
    const url = sysConfig.apiDomain + apiUrl.API_GET_OTT_DEVICE_STATUS;
    return (dispatch) => {
        comFetch(dispatch, data, {
            url: url,
            headers: headers,
            action: ActionTypes.DEVICE.API_GET_OTT_DEVICE_STATUS
        }, callback);
    };
}

