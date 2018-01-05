/**
 * Created by Zed on 2017/8/10.
 */

import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import bindActionCreators from "redux/es/bindActionCreators";
import PropTypes from "prop-types";
import { getInvoiceOrderForDetail } from '../../../actions/userActions';
import BaseOrderList from '../../../components/common/BaseOrderList';
import { parseTime, reqHeader } from '../../../utils/comUtils';
import intl from 'react-intl-universal';
import Const from "../../../utils/const";

class InvoiceOrderForDetail extends BaseOrderList {
    constructor(props) {
        super(props);
        super.title("所含订单");

        this.state = {
            ...this.defaultState,
            dataKey: 'invoiceOrderForDetail',
            deleteItem: null,
            itemRules: [
                {name: '', content: (item) => {
                    return parseTime(item.orderTime);
                }},
                {name: intl.get("order.no") + '：', key: 'orderNo'},
                // {name: intl.get("order.device.no") + "：", key: 'deviceId'},
                {name: intl.get("order.payment.amount") + "：", content: (item) => {
                    return '￥' + item.payAmount;
                }},
                {name: intl.get("order.payment.package") + "：", key: 'productName'}
            ]
        };
    }

    componentDidUpdate(preProps) {

        if (preProps.orderList[this.state.dataKey + 'Stamp'] !== this.props.orderList[this.state.dataKey + 'Stamp']) {

            const {data} = this.props.orderList[this.state.dataKey + 'Data'];

            this.setState({
                orderList: data
            });
        }
    }

    headerHtml() {
        return '';
    }


    /**
     * 上拉加载更多动作
     * */
    loadMoreAction() {
        const {getListAction, match} = this.props;
        let param = {
            id: match.params.id
        };
        // 请求数据
        getListAction && getListAction(param, reqHeader(param), null, (msg, err) => {
            if (err.code === Const.CODE_OFF_LINE) {
                this.setState({
                    offLine: true,
                    loading: false
                });
            }
        });
    }

}

InvoiceOrderForDetail.defaultProps = {
    orderList: {}
};

InvoiceOrderForDetail.propTypes = {
    orderList: PropTypes.object
};

const mapStateToProps = (state, ownPorps) => {
    return {
        orderList: state.app.user.orderForm
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getListAction: bindActionCreators(getInvoiceOrderForDetail, dispatch)
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InvoiceOrderForDetail));
