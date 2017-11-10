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

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

import {linkTo, reqHeader, toRem} from "../../../utils/comUtils";
import Const from "../../../utils/const";
import NoWifi from "../../../components/common/NoWifi";
import NoResult from "../../../components/common/NoResult";
import {SvgIcon} from "material-ui";
import {setGlobAlert} from "../../../actions/common/actions";


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
        clear: "both",
        backgroundColor: "#fff"
    },
    loadingBar: {
        boxShadow: "none",
        top: "none",
        left: "none",
        transform: "none",
        marginLeft: -50,
    }
};
const RightCircleIcon = (props) => (<SvgIcon
    style={props.style}
    viewBox='0 0 32 32'>
    <path style={{fillRule: "evenodd", clipRule: "evenodd"}} d="M20.536,15.121l-7.657-7.657c-0.391-0.391-1.024-0.391-1.414,0c-0.391,0.391-0.391,1.024,0,1.414L18.586,16l-7.121,7.121c-0.391,0.391-0.391,1.024,0,1.414c0.391,0.391,1.024,0.391,1.414,0l7.657-7.657c0.24-0.24,0.314-0.568,0.26-0.879C20.85,15.69,20.775,15.361,20.536,15.121z M16,0C7.163,0,0,7.164,0,16c0,8.837,7.163,16,16,16c8.837,0,16-7.163,16-16C32,7.164,24.837,0,16,0z M16,30C8.268,30,2,23.732,2,16C2,8.268,8.268,2,16,2c7.732,0,14,6.268,14,14C30,23.732,23.732,30,16,30z"/>
</SvgIcon>);

class OrderForm extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            orderListData: {},
            orderList: [],
            offLine: false,
            currentPage: 0,
            pageSize: 999,
            deleteOrderId: null,
            openDialog: false
        };

        this.deleteOrder = this.deleteOrder.bind(this);
        this.handleAction = this.handleAction.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidUpdate(preProps) {
        if (preProps.orderListData.orderFormStamp !== this.props.orderListData.orderFormStamp) {

            const {data} = this.props.orderListData.orderFormData || {data: {}};
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
        const actions = [
            <FlatButton
                className="cancel-button"
                label="取消"
                primary={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                className="sure-button"
                label="确认"
                primary={true}
                onClick={this.handleAction}
            />,
        ];

        return (
            <section style={{
                backgroundColor: "#d7d7d7"
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
                    }}>全部订单</div>
                    <div style={{
                        float: "right",
                        marginRight: toRem(20)
                    }}
                         onClick={() => {
                             linkTo(`user/invoiceOrder`, false, null);
                         }}>
                            <span style={{
                                lineHeight: toRem(110),
                                color: "#fd6a31",
                                fontSize: toRem(24)
                            }}>我要开票</span>

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
                        style={{
                            backgroundColor: "#fff",
                            marginBottom: toRem(20)
                        }}
                        key={item.id}>
                        {(item.nickName && item.headerImg) && (<header>
                            <ListItem
                                disabled={true}
                                leftAvatar={
                                    <Avatar src={item.headerImg}/>
                                }
                                primaryText={item.nickName}
                            />
                        </header>)}

                        <ul style={{
                            listStyle: "none",
                            padding: "0 15px",
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
                        <footer style={{
                            height: toRem(92),
                            borderTop: "1px solid #d7d7d7"}}>
                            <div
                                style={{
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
                                        deleteOrderId: item.id
                                    });
                                }}>删除订单</div>
                        </footer>
                    </section>))}
                    <div style={style.loading}>
                        <span>亲爱滴，已经到底了</span>
                    </div>

                    <Dialog
                        className="dialog-panel"
                        actionsContainerStyle={{borderTop: ".01rem solid #e0e0e0", textAlign: 'center'}}
                        contentStyle={{textAlign: 'center'}}
                        actions={actions}
                        modal={false}
                        open={this.state.openDialog}
                        onRequestClose={this.handleClose}>
                        确认删除订单吗？
                    </Dialog>
                </div>) : (<div>
                    {this.state.offLine ? (<NoWifi/>) : (<NoResult/>)}
                </div>)}

            </section>
        );
    }

    handleAction() {
        this.deleteOrder(this.state.deleteOrderId);
    }

    handleClose() {
        this.setState({openDialog: false});
    }

    /**
     * 上拉加载更多动作
     * */
    loadMoreAction() {
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
    }

    // 删除订单
    deleteOrder(id) {
        const deleteOrderParam = {
            id: id
        };

        this.props.deleteOrderAction(deleteOrderParam, reqHeader(deleteOrderParam), (res) => {
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
        action_setGlobAlert: bindActionCreators(setGlobAlert, dispatch),
        deleteOrderAction: bindActionCreators(deleteOrder, dispatch)
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderForm));
