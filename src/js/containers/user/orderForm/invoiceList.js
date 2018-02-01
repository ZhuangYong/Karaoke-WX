/**
 * Created by Zed on 2017/8/10.
 */

import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import bindActionCreators from "redux/es/bindActionCreators";
import PropTypes from "prop-types";
import { getInvoiceList, getInvoiceOrder } from '../../../actions/userActions';
import BaseOrderList from '../../../components/common/BaseOrderList';
import intl from 'react-intl-universal';
import { accAdd, linkTo, subtr, toRem } from '../../../utils/comUtils';

const styles = {
    deselect: {
        position: "absolute",
        top: "50%",
        left: "10px",
        marginTop: "-10px",
        width: "20px",
        height: "20px",
        border: "1px solid #999",
        borderRadius: "20px"
    },
    selected: {
        position: "absolute",
        top: "50%",
        left: "10px",
        marginTop: "-10px",
        width: "20px",
        height: "20px",
        backgroundColor: "#ff6832",
        borderRadius: "20px"
    }
};

class InvoiceOrder extends BaseOrderList {
    constructor(props) {
        super(props);
        super.title(intl.get("title.invoice.history"));

        this.state = {
            ...this.defaultState,
            dataKey: 'invoiceList',
            itemStyle: {
                padding: `${toRem(20)} ${toRem(20)}`,
            },
            itemRules: [
                {name: '', key: 'time', rightBtn: true},
                {name: intl.get("invoice.type") + "：", label: intl.get("invoice.vat")},
                {name: intl.get("invoice.amount") + "：", content: (item) => {
                    return '￥' + item.amount;
                }},
            ]
        };
    }

    headerHtml() {
        return <div style={{width: "100%", height: toRem(20)}} />;
    }

    itemClick(item) {
        if (parseInt(item.status, 10) !== 3) return;
        linkTo(`user/InvoiceDetail/${item.id}`, false, null);
    }

}

InvoiceOrder.defaultProps = {
    orderList: {}
};

InvoiceOrder.propTypes = {
    orderList: PropTypes.object
};

const mapStateToProps = (state, ownPorps) => {
    return {
        orderList: state.app.user.orderForm
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getListAction: bindActionCreators(getInvoiceList, dispatch)
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InvoiceOrder));
