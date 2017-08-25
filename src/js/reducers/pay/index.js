/**
 * Created by Zed on 2017/8/18.
 */
import ActionTypes from "../../actions/actionTypes";
import {fetchProcess} from "../../utils/fetchUtils";

let initialState = {
    payListStamp: 0
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case ActionTypes.Pay.API_GET_PAY_LIST:
            return fetchProcess(state, action, {
                data: "payListData",
                msg: "payListMsg",
                loading: "payListLoading",
                stamp: "payListStamp"
            });
        case ActionTypes.Pay.API_ALI_PAY:
            return fetchProcess(state, action, {
                data: "alipayData",
                msg: "alipayMsg",
                loading: "alipayLoading"
            });
        case ActionTypes.Pay.API_GET_WX_PAY_PARAMS:
            return fetchProcess(state, action, {
                data: "wxPayParamsData",
                msg: "wxPayParamsMsg",
                loading: "wxPayParamsLoading"
            });
        case ActionTypes.Pay.API_DEVICE_REGISTER:
            return fetchProcess(state, action, {
                data: "deviceRegisterData",
                msg: "deviceRegisterMsg",
                loading: "deviceRegisterLoading"
            });
        default:
            return state;
    }
};
