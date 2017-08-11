/**
 * Created by Zed on 2017/8/10.
 */
import ActionTypes from "../../../../js/actions/actionTypes";
import {fetchProcess} from "../../../../js/utils/fetchUtils";

const initState = {
    orderFormStamp: 0
};

let OrderForm = (state = initState, action) => {
    switch (action.type) {
        case ActionTypes.USER.API_GET_ORDER_FORM:
            return fetchProcess(state, action, {
                data: "orderFormData",
                msg: "orderFormMsg",
                loading: "orderFormLoading",
                stamp: "orderFormStamp"
            });
        default:
            return state;
    }
};

export default OrderForm;
