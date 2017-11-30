/**
 * Created by Zed on 2017/8/10.
 */

import React from "react";
import BaseComponent from "../../../components/common/BaseComponent";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import bindActionCreators from "redux/es/bindActionCreators";
import PropTypes from "prop-types";
import {getInvoiceOrder} from "../../../actions/userActions";

import {linkTo, reqHeader, toRem, accAdd, subtr} from "../../../utils/comUtils";
import Const from "../../../utils/const";
import NoWifi from "../../../components/common/NoWifi";
import NoOrdering from "../../../components/common/NoOrdering";
import {SvgIcon} from "material-ui";
import SucIcon from "material-ui/svg-icons/navigation/check";


const styles = {
    loading: {
        position: "relative",
        display: "flex",
        justifyContent: "center",
        height: toRem(100),
        fontSize: toRem(28),
        alignItems: "center",
        clear: "both",
        backgroundColor: "#fff"
    },
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
const RightCircleIcon = (props) => (<SvgIcon
    style={props.style}
    viewBox='0 0 32 32'>
    <path style={{fillRule: "evenodd", clipRule: "evenodd"}} d="M20.536,15.121l-7.657-7.657c-0.391-0.391-1.024-0.391-1.414,0c-0.391,0.391-0.391,1.024,0,1.414L18.586,16l-7.121,7.121c-0.391,0.391-0.391,1.024,0,1.414c0.391,0.391,1.024,0.391,1.414,0l7.657-7.657c0.24-0.24,0.314-0.568,0.26-0.879C20.85,15.69,20.775,15.361,20.536,15.121z M16,0C7.163,0,0,7.164,0,16c0,8.837,7.163,16,16,16c8.837,0,16-7.163,16-16C32,7.164,24.837,0,16,0z M16,30C8.268,30,2,23.732,2,16C2,8.268,8.268,2,16,2c7.732,0,14,6.268,14,14C30,23.732,23.732,30,16,30z"/>
</SvgIcon>);

class InvoiceOrder extends BaseComponent {
    constructor(props) {
        super(props);
        super.title("开票");

        this.state = {
            orderForm: {},
            orderList: [],
            offLine: false,
            currentPage: 0,
            pageSize: 999,
            orderChosenIds: [],
            orderChosenTotalMoney: 0
        };
    }

    componentDidUpdate(preProps) {
        if (preProps.orderForm.invoiceOrderStamp !== this.props.orderForm.invoiceOrderStamp) {

            const {data} = this.props.orderForm.invoiceOrderData || {data: {}};
            const {result} = data || {result: []};

            this.setState({
                orderList: result
            });
        }
    }

    componentDidMount() {
        if (this.state.currentPage === 0) {
            this.loadMoreAction();
        }
    }

    render() {
        const orderList = this.state.orderList;
        let orderChosenIds = this.state.orderChosenIds;
        let orderChosenTotalMoney = this.state.orderChosenTotalMoney;
        return (
            <section style={{
                backgroundColor: "#d7d7d7",
                minHeight: document.documentElement.clientHeight || document.body.clientHeight
            }}>
                <header style={{
                    width: "100%",
                    height: toRem(110),
                    backgroundColor: "#fff",
                    borderBottom: "2px solid #d7d7d7"}}>
                    <div style={{
                        float: "left",
                        marginLeft: toRem(20),
                        lineHeight: toRem(110),
                        color: "#212121",
                        fontSize: toRem(36)
                    }}>订单开票</div>
                    <div style={{
                        float: "right",
                        marginRight: toRem(20)
                    }}
                         onClick={() => {
                             linkTo(`user/invoiceList`, false, null);
                         }}>
                            <span style={{
                                lineHeight: toRem(110),
                                color: "#fd6a31",
                                fontSize: toRem(24)
                            }}>开票历史</span>

                        <RightCircleIcon style={{
                            position: "relative",
                            top: toRem(5),
                            marginLeft: toRem(20),
                            color: "#ff7d4f",
                            width: toRem(30),
                            height: toRem(30)
                        }}/>
                    </div>
                </header>

                {orderList.length > 0 ? (<div>
                    {orderList.map((item) => (<section
                        key={item.id}
                        style={{
                            position: "relative",
                            backgroundColor: "#fff",
                            marginBottom: toRem(20)
                        }}
                        onTouchTap={() => {
                            const ind = orderChosenIds.indexOf(item.id);
                            if (ind < 0) {
                                orderChosenIds.push(item.id);
                                orderChosenTotalMoney = accAdd(orderChosenTotalMoney, item.payAmount);
                            } else {
                                orderChosenIds.splice(ind, 1);
                                orderChosenTotalMoney = subtr(orderChosenTotalMoney, item.payAmount);
                            }
                            this.setState({
                                orderChosenIds: orderChosenIds,
                                orderChosenTotalMoney: orderChosenTotalMoney
                            });
                        }}>

                        <header style={orderChosenIds.indexOf(item.id) >= 0 ? styles.selected : styles.deselect}>
                            <SucIcon style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "20px",
                                height: "20px"
                            }} color="#fff" />
                        </header>

                        <ul
                            style={{
                                listStyle: "none",
                                padding: "10px 15px 10px 40px",
                                margin: 0,
                                fontSize: toRem(28),
                                color: "#999",
                                lineHeight: toRem(60)
                            }}>
                            <li style={{

                            }}>{item.orderTime}</li>
                            <li>设备号: <span style={{color: "#212121"}}>{item.deviceId}</span></li>
                            <li>支付金额: <span style={{color: "#212121"}}>&yen;{item.payAmount}</span></li>
                            <li>支付套餐: <span style={{color: "#212121"}}>{item.productName}</span></li>
                        </ul>

                    </section>))}
                    <div style={styles.loading}>
                        <span>亲爱滴，已经到底了</span>
                    </div>
                    <div style={{
                        width: "100%",
                        height: toRem(110)
                    }} />
                </div>) : (<div>
                    {this.state.offLine ? (<NoWifi style={{paddingTop: toRem(350)}} />) : (<NoOrdering style={{paddingTop: toRem(350)}} />)}
                </div>)}

                <footer style={{
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
                        }}>{orderList.length !== 0 && orderChosenIds.length > 0 ? "已选" : "全选"}（{orderChosenIds.length}）</span>
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
                    }}>去开票</div>

                    <div style={{
                        float: "right",
                        marginRight: "10px",
                        height: "100%",
                        fontSize: toRem(34),
                        lineHeight: toRem(110),
                        color: "#666"
                    }}>合计: &yen;{orderChosenTotalMoney}</div>

                </footer>

            </section>
        );
    }

    /**
     * 上拉加载更多动作
     * */
    loadMoreAction() {
        const currentPage = this.state.currentPage + 1;
        const pageSize = this.state.pageSize;
        let param = {page: currentPage, pageSize: pageSize};
        // 请求数据
        this.props.getInvoiceOrderAction(param, reqHeader(param), null, (msg, err) => {
            if (err.code === Const.CODE_OFF_LINE) {
                this.setState({
                    offLine: true,
                    loading: false
                });
            }
        });
    }

}

InvoiceOrder.defaultProps = {
    orderForm: {}
};

InvoiceOrder.propTypes = {
    orderForm: PropTypes.object
};

const mapStateToProps = (state, ownPorps) => {
    return {
        orderForm: state.app.user.orderForm
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getInvoiceOrderAction: bindActionCreators(getInvoiceOrder, dispatch)
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InvoiceOrder));
