/**
 * Created by Zed on 2017/8/18.
 */
import React from "react";
import BaseComponent from "../../components/common/BaseComponent";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import bindActionCreators from "redux/es/bindActionCreators";
import PropTypes from "prop-types";
import {alipayPay, deviceRegister, getPayList, getWXPayParams} from "../../actions/payAction";
import {getEncryptHeader, getQueryString, linkTo, reqHeader} from "../../utils/comUtils";
import navUtils from "../../utils/navUtils";

import CheckboxIcon from '../../../img/pay_checkbox.png';
import CheckboxSelectedIcon from '../../../img/pay_checkbox_selected.png';
import PaySuccessIcon from "../../../img/pay_success.png";
import PayFailedIcon from "../../../img/pay_failed.png";
import DeviceRegisterIcon from "../../../img/device_register.png";
import ButtonPage from "../../components/common/ButtonPage";

import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import {setGlobAlert} from "../../actions/common/actions";
import {getUserInfo} from "../../actions/userActions";
import ActionTypes from "../../actions/actionTypes";
import {Checkbox, ListItem, Subheader} from "material-ui";
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import ActionCheck from 'material-ui/svg-icons/action/check-circle';
import Const from "../../utils/const";

const styles = {
    itemBox: {
        width: "100%",
        height: "50px",
        backgroundColor: "#fff",
        boxSizing: "border-box",
        borderBottom: "1px solid #b2b2b2"
    },
    itemBoxActive: {
        width: "100%",
        height: "50px",
        backgroundColor: "#e8e2d8",
        boxSizing: "border-box",
        borderBottom: "1px solid #b2b2b2"
    },
    itemLeft: {
        float: "left",
        marginLeft: "20px",
        maxWidth: "70%",
        lineHeight: "50px",
        fontSize: "16px",
        color: "#252525"
    },
    itemRight: {
        float: "right",
        marginRight: "20px",
        maxWidth: "20%",
        lineHeight: "50px",
        fontSize: "16px",
        color: "#c48848"
    }
};

class Pay extends BaseComponent {
    constructor(props) {
        super(props);
        super.title("支付");
        const matchParams = {
            state: getQueryString("state") || "",
            pollingId: getQueryString("pollingId") || "",
            deviceId: getQueryString("deviceId") || "",
            openid: getQueryString("openid") || ""
        };
        this.state = {
            matchParams: matchParams,
            payListActiveItem: {
                productId: null,
                price: null
            },
            isCheckboxChecked: true,
            payList: [],
            buttonPage: null,
            openDialog: false,
            payType: ""
        };

        this.pay = this.pay.bind(this);
        this.wxPay = this.wxPay.bind(this);
        this.aliPay = this.aliPay.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleAction = this.handleAction.bind(this);
    }

    componentDidUpdate(preProps) {
        if (preProps.result.payListStamp !== this.props.result.payListStamp) {
            this.updatePayList();
        }
    }

    componentDidMount() {
        this.matchPages();
    }

    render() {
        const payList = this.state.payList;
        const payListActiveItem = this.state.payListActiveItem;
        const isCheckboxChecked = this.state.isCheckboxChecked;
        const matchParams = this.state.matchParams;
        const actions = [
            <FlatButton
                className="cancel-button"
                label="以后再说"
                primary={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                className="sure-button"
                label="立即开通"
                primary={true}
                onClick={this.handleAction}
            />,
        ];

        return (
            <div>
                {matchParams.state === "home" ? (<div>
                    <section>
                        {
                            this.state.payType !== Const.PAY_TYPE_GONG_XIANG ? <header style={styles.itemBox}>
                                <div style={styles.itemLeft}>VIP会员套餐</div>
                            </header> : ""
                        }

                        <ul style={{
                            padding: 0,
                            margin: 0,
                            listStyle: "none"
                        }}>
                            {
                                this.state.payType === Const.PAY_TYPE_GONG_XIANG ? payList.map((item) => (
                                    <ListItem
                                        key={item.productId}
                                        innerDivStyle={{paddingTop: '.7rem'}}
                                        style={{height: '3.4rem', borderBottom: '.01rem solid gray', paddingBottom: '3.5rem'}}
                                        primaryText={
                                            <span style={{marginLeft: '2.4rem', marginTop: '.1rem', marginBottom: '.2rem', fontSize: '.48rem'}}>
                                                <div style={{position: 'absolute', left: '.2rem', top: '1.4rem'}}>
                                                    {
                                                        payListActiveItem.productId === item.productId ? <ActionCheck color="#ff6832" className='payCircle'/> : <div style={{width: '.64rem', margin: '.067rem', height: '.64rem', border: '1px solid gray', borderRadius: '50%'}}/>
                                                    }
                                                </div>
                                                {item.productName}
                                            </span>
                                        }
                                        secondaryText={
                                            <div style={{marginLeft: '2.4rem', marginTop: '.4rem', overflow: 'visible'}}>
                                                <p style={{margin: '.5rem 0', color: 'red'}}>
                                                    {item.description}
                                                </p>

                                                <p style={{margin: '.5rem 0', color: '#ff6832', fontSize: '.62rem'}}>
                                                    ￥{item.price}
                                                </p>
                                            </div>
                                        }
                                        leftAvatar={
                                            <div style={{height: '2.8rem', width: '2.8rem', left: '1.16rem', overflow: 'hidden'}}>
                                                <img src={item.wxImg} style={{width: '100%'}}/>
                                            </div>
                                        }
                                        onTouchTap={() => {
                                            this.setState({
                                                payListActiveItem: item
                                            });
                                        }}
                                    />
                                )) : payList.map((tile) => (<li
                                    key={tile.productId}
                                    style={payListActiveItem.productId === tile.productId ? styles.itemBoxActive : styles.itemBox}
                                    onTouchTap={() => {
                                        this.setState({
                                            payListActiveItem: tile
                                        });
                                    }}
                                >
                                    <div style={styles.itemLeft}>{tile.productName}</div>
                                    <div style={styles.itemRight}>{tile.price}</div>
                                </li>))
                            }

                        </ul>

                        {
                            this.state.payType === Const.PAY_TYPE_GONG_XIANG ? <Subheader inset={true} style={{paddingLeft: '1.067rem', marginBottom: '1rem', textAlign: 'left', fontSize: '.32rem', color: '#002222'}}>购买时长越多越优惠，马上支付开始欢唱吧！</Subheader> : ""
                        }
                        <ListItem
                            primaryText={
                                    <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                        <span>
                                            {
                                                isCheckboxChecked ? <ActionCheck color="#ff6832" className='payCircle'/> : <div style={{width: '.64rem', margin: '.067rem', height: '.64rem', border: '1px solid gray', borderRadius: '50%'}}/>
                                            }
                                        </span>

                                        <a style={{color: isCheckboxChecked ? '#ff6832' : 'gray', fontSize: '.4rem', textDecoration: 'underline'}}>
                                            同意 <font onTouchTap={() => {
                                            linkTo(`protocol`, false, null);
                                        }}>《金麦客支付协议》</font>
                                        </a>
                                    </span>

                            }
                            onTouchTap={() => {
                            this.setState({
                                isCheckboxChecked: !isCheckboxChecked
                            });
                        }}
                        />
                    </section>

                    <ButtonPage
                        style={{
                            position: "relative",
                            paddingTop: "20px",
                            height: "100px",
                            clear: "both"
                        }}
                        headerDom={<div style={{
                            marginBottom: "20px",
                            textAlign: "center",
                            color: "#252525",
                            fontSize: "14px"
                        }}>支付金额: <span style={{color: "#c48848"}}>{payListActiveItem && payListActiveItem.price}元</span></div>}
                        disabled={!(isCheckboxChecked && payListActiveItem && payListActiveItem.productId !== null)}
                        raisedButtonStyles={{
                            bottom: 0
                        }}
                        buttonLabel="确认支付"
                        touchTap={this.pay}
                    />
                </div>) : this.state.buttonPage}

                <div>
                    <Dialog
                        className="dialog-panel"
                        actionsContainerStyle={{borderTop: ".01rem solid #e0e0e0", textAlign: 'center'}}
                        contentStyle={{textAlign: 'center'}}
                        actions={actions}
                        modal={false}
                        open={this.state.openDialog}
                        onRequestClose={this.handleClose}
                    >
                        确定开通金麦客VIP体验权
                    </Dialog>
                </div>
            </div>
        );
    }

    handleAction() {
        const actionSetGlobAlert = this.props.action_setGlobAlert;
        const getUserInfoAction = this.props.getUserInfoAction;
        this.setState({openDialog: false});
        const params = {};
        this.props.deviceRegisterAction(params, reqHeader(params), (res) => {
            const {status} = res;
            if (status === 1) {
                actionSetGlobAlert("成功开通");

                getUserInfoAction({}, reqHeader({}));
            } else {
                actionSetGlobAlert("开通失败");
            }
            window.history.back();
        });
    }
    handleClose() {
        this.setState({openDialog: false});
    }

    // 点击支付
    pay() {
        const {isWeixin} = window.sysInfo;
        if (isWeixin) {
            this.wxPay();
        } else {
            this.aliPay();
        }
    }

    // 微信支付
    wxPay() {
        const actionSetGlobAlert = this.props.action_setGlobAlert;
        const getUserInfoAction = this.props.getUserInfoAction;
        const productId = this.state.payListActiveItem.productId;
        const matchParams = this.state.matchParams;
        let header = null;
        let params = {
            productId: productId
        };
        if (matchParams.openid !== "") {
            params.uuid = matchParams.pollingId;
            params.openid = matchParams.openid;
            header = reqHeader(params, getEncryptHeader({
                deviceId: matchParams.deviceId
            }));
        } else {
            header = reqHeader(params);
        }
        this.props.getWXPayParamsAction(params, header, (res) => {
            const {data} = res;
            window.wx && window.wx.chooseWXPay({
                timestamp: data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
                package: data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                signType: data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                paySign: data.paySign, // 支付签名
                success: (res) => {
                    // 支付成功后的回调函数
                    actionSetGlobAlert("支付成功");
                    if (matchParams.openid !== "") {
                        setTimeout(() => {
                            window.WeixinJSBridge.call('closeWindow');
                        }, 500);
                    } else {
                        getUserInfoAction({}, reqHeader({}));
                        window.history.back();
                    }
                },
                cancel: (res) => {
                    actionSetGlobAlert("取消支付");
                    if (matchParams.openid !== "") {
                        setTimeout(() => {
                            window.WeixinJSBridge.call('closeWindow');
                        }, 500);
                    } else {
                        window.history.back();
                    }
                },
                fail: (res) => {
                    actionSetGlobAlert("", ActionTypes.COMMON.ALERT_TYPE_WX_API_FAIL);
                }
            });
        });
    }

    // 支付宝支付
    aliPay() {
        const productId = this.state.payListActiveItem.productId;
        const matchParams = this.state.matchParams;
        const params = {
            uuid: matchParams.pollingId,
            productId: productId
        };
        const header = getEncryptHeader({
            deviceId: matchParams.deviceId
        });
        this.props.alipayAction(params, reqHeader(params, header), (res) => {
            const {data} = res;

            window.location.href = data.payUrl;
        });
    }

    // 更新支付列表
    updatePayList() {
        const {data} = this.props.result.payListData || {data: []};
        if (data)
            this.setState({
                payListActiveItem: data[0],
                payList: data,
                payType: data[0]['productType']
            });

    }

    // 识别页面状态
    matchPages() {
        const matchParams = this.state.matchParams;
        switch (matchParams.state) {
            case "home": {
                const getPayListParams = {};
                let header = null;
                if (matchParams.deviceId !== "") {
                    header = reqHeader(getPayListParams, getEncryptHeader({deviceId: matchParams.deviceId}));
                } else {
                    header = reqHeader(getPayListParams);
                }
                this.props.getPayListAction(getPayListParams, header);
            }
                break;
            case "aliPaySuccess":
                this.setState({
                    buttonPage: <ButtonPage
                        src={PaySuccessIcon}
                        content="充值成功"
                        buttonLabel="关闭"
                        touchTap={() => {
                            window.AlipayJSBridge.call('closeWebview');
                        }}/>
                });
                break;
            case "aliPayFailed":
                this.setState({
                    buttonPage: <ButtonPage
                        src={PayFailedIcon}
                        content="充值失败，请重新充值"
                        buttonLabel="关闭"
                        touchTap={() => {
                            window.AlipayJSBridge.call('closeWebview');
                        }}/>
                });
                break;
            case "deviceRegister":
                this.setState({
                    buttonPage: <ButtonPage
                        src={DeviceRegisterIcon}
                        imgStyle={{width: "162.5px"}}
                        content="恭喜你获得金麦客VIP体验资格哟！"
                        contentStyle={{color: "#c48848"}}
                        buttonLabel="马上体验"
                        touchTap={() => {
                            this.setState({openDialog: true});
                        }}/>
                });
                break;
            default:
                navUtils.replace("/*");
                break;
        }
    }
}


Pay.defaultProps = {
    result: {}
};

Pay.propTypes = {
    result: PropTypes.object
};

const mapStateToProps = (state, ownPorps) => {
    return {
        result: state.app.pay
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getPayListAction: bindActionCreators(getPayList, dispatch),
        action_setGlobAlert: bindActionCreators(setGlobAlert, dispatch),
        getWXPayParamsAction: bindActionCreators(getWXPayParams, dispatch),
        deviceRegisterAction: bindActionCreators(deviceRegister, dispatch),
        getUserInfoAction: bindActionCreators(getUserInfo, dispatch),
        alipayAction: bindActionCreators(alipayPay, dispatch)
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Pay));

