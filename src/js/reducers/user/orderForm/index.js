
/**
 * Created by Zed on 2017/8/10.
 */
import ActionTypes from "../../../../js/actions/actionTypes";
import {fetchProcess} from "../../../../js/utils/fetchUtils";

const initState = {
    orderFormStamp: 0,
    invoiceListStamp: 0,
    invoiceOrderStamp: 0
};

export default (state = initState, action) => {
    switch (action.type) {
        case ActionTypes.USER.API_GET_ORDER_FORM:
            return fetchProcess(state, action, {
                data: "orderFormData",
                msg: "orderFormMsg",
                loading: "orderFormLoading",
                stamp: "orderFormStamp"
            });
        case ActionTypes.USER.API_GET_DELETE_ORDER:
            return fetchProcess(state, action, {
                data: "deleteOrderData",
                msg: "deleteOrderMsg",
                loading: "deleteOrderLoading",
                stamp: "deleteOrderStamp"
            });
        case ActionTypes.USER.API_GET_INVOICE_ORDER:
            return fetchProcess(state, action, {
                data: "invoiceOrderData",
                msg: "invoiceOrderMsg",
                loading: "invoiceOrderLoading",
                stamp: "invoiceOrderStamp"
            });
        case ActionTypes.USER.API_GET_INVOICE_LIST:
            return fetchProcess(state, action, {
                data: "invoiceListData",
                msg: "invoiceListMsg",
                loading: "invoiceListLoading",
                stamp: "invoiceListStamp"
            });
        case ActionTypes.USER.API_GET_INVOICE_DETAIL:
            return fetchProcess(state, action, {
                data: "invoiceDetailData",
                msg: "invoiceDetailMsg",
                loading: "invoiceDetailLoading"
            });
        case ActionTypes.USER.API_GET_INVOICE_SUBMIT:
            return fetchProcess(state, action, {
                data: "submitInvoiceData",
                msg: "submitInvoiceMsg",
                loading: "submitInvoiceLoading"
            });
        default:
            return state;
    }
};
