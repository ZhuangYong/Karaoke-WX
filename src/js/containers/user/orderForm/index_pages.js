/**
 * Created by Zed on 2017/8/10.
 */

import React from "react";
import BaseComponent from "../../../components/common/BaseComponent";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import bindActionCreators from "redux/es/bindActionCreators";
import PropTypes from "prop-types";
import {deleteOrder, getOrderForm} from "../../../actions/userActions";

import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import Card from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import RefreshIndicator from "material-ui/RefreshIndicator";

import {linkTo, reqHeader, toRem} from "../../../utils/comUtils";
import Const from "../../../utils/const";


const style = {
    orderings: {
        position: "absolute",
        paddingTop: toRem(20),
        height: "100%",
        overflowY: "auto",
        width: "100%"
    },
    loading: {
        position: "relative",
        display: "flex",
        justifyContent: "center",
        height: toRem(100),
        fontSize: toRem(28),
        alignItems: "center",
        clear: "both"
    },
    loadingBar: {
        boxShadow: "none",
        top: "none",
        left: "none",
        transform: "none",
        marginLeft: -50,
    }
};

class OrderForm extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            orderListData: {},
            orderList: [],
            offLine: false,
            loading: false,
            dataLoaded: true,
            currentPage: 0,
            pageSize: 9999
        };

        this.deleteOrder = this.deleteOrder.bind(this);
    }

    componentDidUpdate(preProps) {
        if (preProps.orderListData.orderFormStamp !== this.props.orderListData.orderFormStamp) {

            const {data} = this.props.orderListData.orderFormData || {data: [], islastpage: false};
            const {result, islastpage} = data;

            this.setState({
                orderList: [...this.state.orderList, ...(result || [])],
                lastPage: islastpage,
                loading: false,
                dataLoaded: true
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
            <Paper
                className="orderings"
                style={style.orderings}
                onScroll={this.onScroll.bind(this)}>
                <AppBar
                    title="全部订单"
                    showMenuIconButton={false}
                    iconElementRight={<FlatButton
                        label="电子发票"
                        onTouchTap={() => {
                            linkTo(`user/invoiceOrder`, false, null);
                        }}
                    />}
                />

                {orderList.map((item) => (<Card
                    key={item.id}
                    style={{marginTop: "10px"}}
                >
                    {(item.nickName && item.headerImg) && (
                        <List>
                            <ListItem
                                disabled={true}
                                leftAvatar={
                                    <Avatar src={item.headerImg}/>
                                }
                                primaryText={item.nickName}
                            />
                        </List>
                    )}
                    <Divider/>
                    <List>
                        <ListItem
                            disabled={true}
                            primaryText={`设备号: ${item.deviceId}`}
                        />
                        <ListItem
                            disabled={true}
                            primaryText={`支付金额: ${item.payAmount} 元`}
                        />
                        <ListItem
                            disabled={true}
                            primaryText={`支付时间: ${item.orderTime}`}
                        />
                        <ListItem
                            disabled={true}
                            primaryText={`支付套餐: ${item.productName}`}
                        />
                        <div onClick={() => {
                            this.deleteOrder(item.id);
                        }}>删除</div>
                    </List>

                </Card>))}

                <div style={style.loading}>
                    {this.state.loading ? (<div><RefreshIndicator
                        size={30}
                        left={70}
                        top={0}
                        loadingColor="#FF9800"
                        status="loading"
                        style={style.loadingBar}
                    />
                        <span>正在加载</span>
                    </div>) : ""}

                    <span>{this.state.lastPage ? "亲爱滴，已经到底了" : ""}</span>
                    <span>{(!this.state.loading && this.state.offLine && this.state.currentPage !== 0 && orderList.length !== 0) ? Const.STRING_NO_WIFI : ""}</span>
                </div>
            </Paper>
        );
    }

    onScroll(e) {
        if (!this.state.loading && e.target.classList && e.target.classList.contains("orderings")) {
            const betweenBottom = e.target.scrollHeight - (e.target.scrollTop + e.target.clientHeight);
            if (betweenBottom < 50) {
                this.loadMoreAction();
            }
        }
    }

    /**
     * 上拉加载更多动作
     * */
    loadMoreAction() {
        if (this.state.loading || this.state.lastPage) return;
        const currentPage = this.state.currentPage + 1;
        const pageSize = this.state.pageSize;
        let param = {page: currentPage, pageSize: pageSize};
        // 请求数据
        this.props.getOrderFormAction(param, reqHeader(param), null, (msg, err) => {
            if (err.code === Const.CODE_OFF_LINE) {
                this.setState({
                    offLine: true,
                    loading: false
                });
            }
        });
        this.setState({
            currentPage: currentPage,
            loading: true
        });
    }

    deleteOrder(id) {
        const deleteOrderParam = {
            id: id
        };

        this.props.deleteOrderAction(deleteOrderParam, reqHeader(deleteOrderParam), (res) => {
            const {status} = res;
            if (status === 1) {
                let orderList = this.state.orderList.filter((item) => {
                    return item.id !== id;
                });
                this.setState({
                    orderList: orderList
                });
            }
        });
    }
}

OrderForm.defaultProps = {
    orderListData: {}
};

OrderForm.propTypes = {
    orderListData: PropTypes.object
};

const mapStateToProps = (state, ownPorps) => {
    return {
        orderListData: state.app.user.orderForm
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getOrderFormAction: bindActionCreators(getOrderForm, dispatch),
        deleteOrderAction: bindActionCreators(deleteOrder, dispatch)
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderForm));
