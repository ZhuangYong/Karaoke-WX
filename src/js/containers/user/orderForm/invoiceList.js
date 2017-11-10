/**
 * Created by Zed on 2017/8/10.
 */

import React from "react";
import BaseComponent from "../../../components/common/BaseComponent";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import bindActionCreators from "redux/es/bindActionCreators";
import PropTypes from "prop-types";
import {getInvoiceList, getInvoiceOrder} from "../../../actions/userActions";

import AppBar from 'material-ui/AppBar';
import Card from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';

import {linkTo, reqHeader, toRem, accAdd, subtr} from "../../../utils/comUtils";
import Const from "../../../utils/const";
import NoWifi from "../../../components/common/NoWifi";
import NoResult from "../../../components/common/NoResult";
import {SvgIcon} from "material-ui";


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
        backgroundColor: "#878979",
        borderRadius: "20px"
    }
};
const RightIcon = (props) => (<SvgIcon
    style={props.style}>
    <path style={{fillRule: "evenodd", clipRule: "evenodd"}} d="M13.729,11.236L1.722,0.294c-0.394-0.392-1.033-0.392-1.427,0c-0.394,0.392-0.394,1.028,0,1.42l11.283,10.283L0.296,22.28c-0.394,0.392-0.394,1.028,0,1.42c0.394,0.392,1.033,0.392,1.427,0l12.007-10.942c0.21-0.209,0.3-0.486,0.286-0.76C14.029,11.723,13.939,11.446,13.729,11.236z"/>
</SvgIcon>);

class invoiceList extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            orderForm: {},
            orderList: [],
            offLine: false,
            currentPage: 0,
            pageSize: 999
        };
    }

    componentDidUpdate(preProps) {
        if (preProps.orderForm.invoiceListStamp !== this.props.orderForm.invoiceListStamp) {

            const {data} = this.props.orderForm.invoiceListData || {data: {}};
            const {result} = data || {result: []};

            /*const result = [
                {
                    time: "2017-10-17  19:06",
                    deviceId: "123",
                    amount: "123",
                    name: "sdsd",
                    status: "2",
                    id: "3"
                },
                {
                    time: "2017-10-17  19:06",
                    deviceId: "123",
                    amount: "234",
                    name: "dfdf",
                    status: "3",
                    id: "2"
                },
                {
                    time: "2017-10-17  19:06",
                    deviceId: "123",
                    amount: "235",
                    name: "fafaf",
                    status: "2",
                    id: "1"
                }
            ];*/
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
        return (
            <section style={{
                backgroundColor: "#d7d7d7"
            }}>

                {orderList.length > 0 ? (<div>
                    {orderList.map((item) => (<section
                        key={item.id}
                        style={{
                            position: "relative",
                            marginBottom: toRem(20),
                            backgroundColor: "#fff"
                        }}>

                        <ul
                            style={{
                                listStyle: "none",
                                padding: `${toRem(20)} ${toRem(20)}`,
                                margin: 0,
                                fontSize: toRem(28),
                                color: "#999",
                                lineHeight: toRem(60)
                            }}
                            onClick={() => {
                                if (parseInt(item.status, 10) !== 3) return;
                                linkTo(`user/InvoiceDetail/${item.id}`, false, null);
                            }}>
                            <li>
                                <span>{item.time}</span>
                                <span style={{
                                    color: parseInt(item.status, 10) === 3 ? "#fd6934" : "#999",
                                    float: "right"
                                }}>
                                    <span>{item.status === 3 ? "已开票" : "待出票"}</span>
                                    <RightIcon style={{
                                        marginLeft: toRem(10),
                                        width: toRem(16.5),
                                        height: toRem(24),
                                        color: parseInt(item.status, 10) === 3 ? "#fd6934" : "#999"
                                    }}/>
                                </span>
                            </li>
                            <li>发票类型: <span style={{color: "#212121"}}>{item.name}</span></li>
                            <li>发票金额: <span style={{color: "#212121"}}>&yen;{item.amount}</span></li>
                        </ul>

                    </section>))}
                    <div style={styles.loading}>
                        <span>亲爱滴，已经到底了</span>
                    </div>
                </div>) : (<div>
                    {this.state.offLine ? (<NoWifi/>) : (<NoResult/>)}
                </div>)}

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
        this.props.getInvoiceListAction(param, reqHeader(param), null, (msg, err) => {
            if (err.code === Const.CODE_OFF_LINE) {
                this.setState({
                    offLine: true,
                    loading: false
                });
            }
        });
    }

}

invoiceList.defaultProps = {
    orderForm: {}
};

invoiceList.propTypes = {
    orderForm: PropTypes.object
};

const mapStateToProps = (state, ownPorps) => {
    return {
        orderForm: state.app.user.orderForm
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getInvoiceListAction: bindActionCreators(getInvoiceList, dispatch)
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(invoiceList));
