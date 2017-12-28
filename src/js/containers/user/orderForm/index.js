/**
 * Created by Zed on 2017/8/10.
 */

import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import bindActionCreators from "redux/es/bindActionCreators";
import PropTypes from "prop-types";
import { deleteOrder, getOrderForm } from '../../../actions/userActions';
import BaseOrderList from '../../../components/common/BaseOrderList';
import { setGlobAlert } from '../../../actions/common/actions';
import { getEncryptHeader, linkTo, reqHeader, toRem } from '../../../utils/comUtils';
import intl from 'react-intl-universal';

class OrderForm extends BaseOrderList {
    constructor(props) {
        super(props);
        super.title("VIP充值订单");

        this.state = {
            ...this.defaultState,
            title: "全部订单",
            rightTitle: "我要开票",
            dataKey: 'orderForm',
            deleteItem: null,
            itemRules: [
                {name: '', key: 'orderTime'},
                {name: '订单号：', key: 'orderNo'},
                {name: intl.get("order.device.no") + "：", key: 'deviceId'},
                {name: intl.get("order.payment.amount") + "：", content: (item) => {
                    return '￥' + item.payAmount;
                }},
                {name: intl.get("order.payment.package") + "：", key: 'productName'}
            ]
        };
    }

    rightClick() {
        linkTo(`user/invoiceOrder`, false, null);
    }

    itemFooterHtml(item) {
        return <footer style={{
            height: toRem(92),
            borderTop: "1px solid #d7d7d7"}}>
            <div style={{
                    float: "right",
                    marginTop: toRem(16),
                    marginRight: toRem(20),
                    width: toRem(170),
                    height: toRem(60),
                    lineHeight: toRem(65),
                    textAlign: "center",
                    color: "#212121",
                    fontSize: toRem(28),
                    border: "1px solid #d7d7d7",
                    borderRadius: toRem(60)
                }}
                onClick={() => {
                    this.setState({
                        openDialog: true,
                        deleteItem: item
                    });
                }}>删除订单</div>
        </footer>;
    }

    handleAction() {
        const item = this.state.deleteItem;
        this.deleteOrder(item.id, item.deviceId);
    }

    /**
     * 删除订单
     * @param id: 订单id
     * @param deviceId: 订单对应设备号
     */
    deleteOrder(id, deviceId) {

        const header = getEncryptHeader({deviceId: deviceId});

        const deleteOrderParam = {
            id: id
        };

        this.props.deleteAction(deleteOrderParam, reqHeader(deleteOrderParam, header), (res) => {
            const {status} = res;
            if (parseInt(status, 10) === 1) {
                let orderList = this.state.orderList.filter((item) => {
                    return item.id !== id;
                });
                this.setState({
                    orderList: orderList,
                    openDialog: false
                });
                this.props.action_setGlobAlert("删除成功");
            } else {
                this.setState({
                    openDialog: false
                });
                this.props.action_setGlobAlert("删除失败");
            }
        });
    }

}

OrderForm.defaultProps = {
    orderList: {}
};

OrderForm.propTypes = {
    orderList: PropTypes.object
};

const mapStateToProps = (state, ownPorps) => {
    return {
        orderList: state.app.user.orderForm
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getListAction: bindActionCreators(getOrderForm, dispatch),
        deleteAction: bindActionCreators(deleteOrder, dispatch),
        action_setGlobAlert: bindActionCreators(setGlobAlert, dispatch)
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderForm));
