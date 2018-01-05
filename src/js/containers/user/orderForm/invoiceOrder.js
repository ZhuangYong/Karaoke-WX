/**
 * Created by Zed on 2017/8/10.
 */

import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import bindActionCreators from "redux/es/bindActionCreators";
import PropTypes from "prop-types";
import { getInvoiceOrder } from '../../../actions/userActions';
import BaseOrderList from '../../../components/common/BaseOrderList';
import intl from 'react-intl-universal';
import SucIcon from "material-ui/svg-icons/navigation/check";
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
        super.title(intl.get("title.invoice"));

        this.state = {
            ...this.defaultState,
            title: intl.get("invoice.order"),
            rightTitle: intl.get("title.invoice.history"),
            dataKey: 'invoiceOrder',
            itemRules: [
                {name: '', key: 'orderTime'},
                {name: intl.get("order.no") + '：', key: 'orderNo'},
                {name: intl.get("order.device.no") + "：", key: 'deviceId'},
                {name: intl.get("order.payment.amount") + "：", content: (item) => {
                    return '￥' + item.payAmount;
                }},
                {name: intl.get("order.payment.package") + "：", key: 'productName'}
            ],
            orderChosenIds: [],
            orderChosenTotalMoney: 0,
            itemStyle: {
                padding: "10px 15px 10px 40px"
            }
        };
    }

    itemClick(item) {

        const {orderChosenIds, orderChosenTotalMoney} = this.state;
        const ind = orderChosenIds.indexOf(item.id);
        let totalMoney;

        if (ind < 0) {
            orderChosenIds.push(item.id);
            totalMoney = accAdd(orderChosenTotalMoney, item.payAmount);
        } else {
            orderChosenIds.splice(ind, 1);
            totalMoney = subtr(orderChosenTotalMoney, item.payAmount);
        }
        this.setState({
            orderChosenIds: orderChosenIds,
            orderChosenTotalMoney: totalMoney
        });
    }

    rightClick() {
        linkTo(`user/invoiceList`, false, null);
    }

    itemHeaderHtml(item) {
        const orderChosenIds = this.state.orderChosenIds;
        return <header style={orderChosenIds.indexOf(item.id) >= 0 ? styles.selected : styles.deselect}>
            <SucIcon style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "20px",
                height: "20px"
            }} color="#fff" />
        </header>;
    }

    footerHtml() {
        const {orderChosenIds, orderList, orderChosenTotalMoney} = this.state;
        return <footer style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            width: "100%",
            height: toRem(110),
            borderTop: "1px solid #ddd",
            backgroundColor: "#fff"
        }}>
            <header
                style={{
                    float: "left",
                    position: "relative",
                    width: "auto",
                    height: "100%"
                }}
                onClick={() => {
                    let chosenItems = [];
                    let totalMoney = 0;
                    if (orderChosenIds.length < orderList.length) {
                        orderList.map((item) => {

                            chosenItems.push(item.id);

                            totalMoney = accAdd(item.payAmount, totalMoney);
                        });
                    }
                    this.setState({
                        orderChosenIds: chosenItems,
                        orderChosenTotalMoney: totalMoney
                    });
                }}>
                <div style={(orderChosenIds.length !== 0) && (orderChosenIds.length === orderList.length) ? styles.selected : styles.deselect}>

                    <SucIcon style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "20px",
                        height: "20px"
                    }} color="#fff" />
                </div>
                <span style={{
                    marginLeft: "40px",
                    lineHeight: toRem(110),
                    fontSize: toRem(34),
                    color: "#666"
                }}>{orderList.length !== 0 && orderChosenIds.length > 0 ? intl.get("order.choose.ed") : intl.get("order.choose.all")}（{orderChosenIds.length}）</span>
            </header>

            <div style={(() => {
                let style = {
                    float: "right",
                    width: toRem(250),
                    height: "100%",
                    fontSize: toRem(34),
                    lineHeight: toRem(110),
                    textAlign: "center",
                    backgroundColor: "#ff6832",
                    color: "#fff"
                };
                if (orderChosenIds.length <= 0) {
                    style.backgroundColor = "#ccc";
                }
                return style;
            })()}
                 onClick={() => {
                     if (orderChosenIds.length <= 0) return;
                     linkTo(`user/invoiceSubmit/${orderChosenIds.join("-")}/${orderChosenTotalMoney.toString().replace(".", "-")}`, false, null);
                 }}>{intl.get("invoice.go")}</div>

            <div style={{
                float: "right",
                marginRight: "10px",
                height: "100%",
                fontSize: toRem(34),
                lineHeight: toRem(110),
                color: "#666"
            }}>{intl.get("total")}: &yen;{orderChosenTotalMoney}</div>

        </footer>;
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
        getListAction: bindActionCreators(getInvoiceOrder, dispatch)
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InvoiceOrder));
