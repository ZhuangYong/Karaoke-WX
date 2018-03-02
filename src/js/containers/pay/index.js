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
import { getEncryptHeader, getQueryString, linkTo, reqHeader, toRem } from '../../utils/comUtils';
import navUtils from "../../utils/navUtils";

import CheckboxIcon from '../../../img/pay_checkbox.png';
import CheckboxSelectedIcon from '../../../img/pay_checkbox_selected.png';
import PaySuccessIcon from "../../../img/pay_success.png";
import PayFailedIcon from "../../../img/pay_failed.png";
import ButtonPage from "../../components/common/ButtonPage";

import {setGlobAlert} from "../../actions/common/actions";
import {getUserInfo} from "../../actions/userActions";
import ActionTypes from "../../actions/actionTypes";
import {Checkbox, CircularProgress, ListItem, Paper, RaisedButton, RefreshIndicator, Subheader} from "material-ui";
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import ActionCheck from 'material-ui/svg-icons/action/check-circle';
import Const from "../../utils/const";
import intl from 'react-intl-universal';
import MallImg from "../../../img/mall/me.png";
import sysConfig from "../../utils/sysConfig";
import MyButton from '../../components/common/MyButton';

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
    },
    submitButton: {
        height: '50px',
        position: 'fixed',
        bottom: '1rem',
        left: "50%",
        marginLeft: "-120px",
        width: "240px",
        borderRadius: "50px",
        overflow: "hidden",
        label: {
            fontSize: 18,
            fontWeight: 500
        }
    },
    payResult: {
        title: {
            textAlign: 'center', margin: '3rem 0 1rem 0'
        },
        subTitle: {
            textAlign: 'center'
        }
    }
};
const PAY_RESULT_SUCCESS = "PAY_RESULT_SUCCESS";
const PAY_RESULT_FAIL = "PAY_RESULT_FAIL";
class Pay extends BaseComponent {
    constructor(props) {
        super(props);
        super.title(intl.get("title.pay"));
        const matchParams = {
            state: getQueryString("state") || "",
            pollingId: getQueryString("pollingId") || "",
            deviceId: getQueryString("deviceId") || "",
            openid: getQueryString("openid") || "",
            defaultChooseProductId: getQueryString("productId") || ""
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
            payType: "",
            payResult: ""
        };

        this.pay = this.pay.bind(this);
        this.wxPay = this.wxPay.bind(this);
        this.aliPay = this.aliPay.bind(this);
    }

    componentDidUpdate(preProps) {
        if (preProps.result.payListStamp !== this.props.result.payListStamp) {
            this.updatePayList();
        }
    }

    componentDidMount() {
        this.matchPages();
        this.state.payResult = "";
    }

    componentWillUnmount() {
        this.state.payResult = "";
    }
    render() {
        const payList = this.state.payList;
        const payListActiveItem = this.state.payListActiveItem;
        const isCheckboxChecked = this.state.isCheckboxChecked;
        const matchParams = this.state.matchParams;
        const {isWeixin} = window.sysInfo;
        const {weixinConfigFinish} = this.props;
        const disableSubmitButton = isWeixin && !weixinConfigFinish;

        return (
            <div>
                {
                    this.state.payResult ? <div>
                        {
                            this.state.payResult === PAY_RESULT_SUCCESS ? <div>
                                <h2 style={styles.payResult.title}>{intl.get("msg.congratulations.pay.success")}</h2>
                                <p style={styles.payResult.subTitle}>{payListActiveItem && payListActiveItem.productName}</p>
                                <Paper
                                    zDepth={0}
                                    style={{position: 'fixed', bottom: '2rem', marginBottom: '2rem', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                                >
                                    <img src={MallImg} style={{maxWidth: 320}} onClick={f => location.href = sysConfig.mallIndex}/>
                                </Paper>
                                <RaisedButton
                                    backgroundColor="#ff6832"
                                    buttonStyle={styles.submitButton}
                                    label={intl.get("button.make.sure")}
                                    labelStyle={styles.submitButton.label}
                                    labelColor="white"
                                    onClick={() => {
                                        if (matchParams.openid !== "") {
                                            setTimeout(() => {
                                                window.WeixinJSBridge && window.WeixinJSBridge.call('closeWindow');
                                                window.AlipayJSBridge && window.AlipayJSBridge.call('closeWebview');
                                            }, 100);
                                        } else {
                                            window.history.back();
                                        }
                                    }}/>
                            </div> : <div>
                                <h2 style={styles.payResult.title}>{intl.get("msg.woo.pay.fail")}</h2>
                                <p style={styles.payResult.subTitle}>{intl.get("Unwilling, try again")}</p>

                                <RaisedButton
                                    backgroundColor="#ff6832"
                                    buttonStyle={styles.submitButton}
                                    label={intl.get("button.sure")}
                                    labelStyle={styles.submitButton.label}
                                    labelColor="white"
                                    onClick={() => {
                                        this.setState({
                                            payResult: ""
                                        });
                                    }}/>
                            </div>
                        }
                    </div> : <div>
                        {matchParams.state === "home" ? (<div>
                            <section>
                                {
                                    this.state.payType !== Const.PAY_TYPE_GONG_XIANG ? <header style={styles.itemBox}>
                                        <div style={styles.itemLeft}>{intl.get("pay.vip.package")}</div>
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
                                                innerDivStyle={{paddingTop: '.56rem', paddingLeft: '1.7rem'}}
                                                style={{height: '3rem', borderBottom: '.01rem solid #d7d7d7', paddingBottom: '3.1rem'}}
                                                primaryText={
                                                    <span style={{marginLeft: '2.2rem', marginTop: '.1rem', marginBottom: '.2rem', fontSize: '.42rem'}}>
                                                <div style={{position: 'absolute', left: '.2rem', top: '1.2rem'}}>
                                                    {
                                                        payListActiveItem.productId === item.productId ? <ActionCheck color="#ff6832" className='payCircle'/> : <div style={{width: '.64rem', margin: '.067rem', height: '.64rem', border: '1px solid gray', borderRadius: '50%'}}/>
                                                    }
                                                </div>
                                                        {item.productName}
                                            </span>
                                                }
                                                secondaryText={
                                                    <div style={{marginLeft: '2.2rem', marginTop: '.4rem', overflow: 'visible'}}>
                                                        <p style={{margin: '.38rem 0', color: 'red', fontSize: '.32rem'}}>
                                                            {
                                                                item.discountType === Const.DISCOUNT_TYPE_TIME ? intl.get("pay.handsel.time", {minute: item.discountValue}) : ``
                                                            }
                                                            {
                                                                item.discountType === Const.DISCOUNT_TYPE_MONEY ? intl.get("pay.discount.money", {discount: item.discountValue}) : ``
                                                            }
                                                            {(item.discountType !== Const.DISCOUNT_TYPE_TIME && item.discountType !== Const.DISCOUNT_TYPE_MONEY) && item.description}
                                                        </p>

                                                        <p style={{margin: '.38rem 0', color: '#ff6832', fontSize: '.52rem'}}>
                                                            ￥{item.price} {(item.orgprice && item.discountType === Const.DISCOUNT_TYPE_MONEY) ? <font style={{textDecoration: 'line-through', color: 'gray'}}>{`￥${item.orgprice}`}</font> : ""}
                                                        </p>
                                                    </div>
                                                }
                                                leftAvatar={
                                                    <div style={{height: '2.4rem', width: '2.4rem', left: '1.16rem', overflow: 'hidden'}}>
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
                                    this.state.payType === Const.PAY_TYPE_GONG_XIANG ? <Subheader inset={true} style={{paddingLeft: '1.067rem', marginBottom: '1rem', textAlign: 'left', fontSize: '.32rem', color: '#002222'}}>{intl.get("pay.more.pay.more.discount.pay.and.sing")}</Subheader> : ""
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
                                            {intl.get("pay.agree")} <font onTouchTap={() => {
                                            linkTo(`protocol`, false, null);
                                        }}>{intl.get("pay.payment.agreement")}</font>
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

                            {/*<ButtonPage
                                style={{
                                    position: "absolute",
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    height: "80px",
                                    borderRadius: 'none',
                                }}
                                headerDom={<div style={{
                                    textAlign: "center",
                                    color: "#252525",
                                    fontSize: "14px"
                                }}>{intl.get("pay.payment.amount")}: <span style={{color: "#c48848"}}>{payListActiveItem && payListActiveItem.price} {intl.get("pay.yuan")}</span></div>}
                                disabled={disableSubmitButton || (!(isCheckboxChecked && payListActiveItem && payListActiveItem.productId !== null))}
                                icon={
                                    disableSubmitButton ? <CircularProgress size={18} thickness={1} /> : null
                                }
                                raisedButtonStyles={{
                                    bottom: 0
                                }}
                                buttonLabel= {intl.get("button.sure.pay")}
                                touchTap={this.pay}
                            />*/}

                            <div style={{width: '100%', height: toRem(190)}} />

                            <section style={{
                                position: "fixed",
                                bottom: 0,
                                left: 0,
                                width: '100%',
                                zIndex: 9999,
                                backgroundColor: '#fff',
                            }}>
                                <div style={{
                                    textAlign: "center",
                                    color: "#252525",
                                    fontSize: "14px",
                                    lineHeight: toRem(80),
                                }}>{intl.get("pay.payment.amount")}: <span style={{color: "#c48848"}}>{payListActiveItem && payListActiveItem.price} {intl.get("pay.yuan")}</span></div>

                                <MyButton
                                    style={{
                                        width: '100%',
                                        height: toRem(100),
                                        lineHeight: toRem(100),
                                        fontSize: toRem(36),
                                    }}
                                    label={intl.get("button.sure.pay")}
                                    disabled={disableSubmitButton || (!(isCheckboxChecked && payListActiveItem && payListActiveItem.productId !== null))}
                                    loading={disableSubmitButton}
                                    onClick={this.pay}
                                />

                            </section>

                        </div>) : this.state.buttonPage}
                        <br/>
                        <br/>

                    </div>
                }
            </div>

        );
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
                    if (this.state.payType === Const.PAY_TYPE_GONG_XIANG) {
                        if (matchParams.openid === "") {
                            const wxInfoSession = JSON.parse(window.sessionStorage.getItem("wxInfo") || "{}");
                            const params = {
                                url: `${location.origin}?uuid=${wxInfoSession.data.uuid}&userid=${wxInfoSession.data.userId}&deviceId=${wxInfoSession.data.deviceId}`
                            };
                            const wxInfo = {
                                wxId: wxInfoSession.data.uuid || "",
                                deviceId: wxInfoSession.data.deviceId || ""
                            };
                            getUserInfoAction(params, reqHeader(params, getEncryptHeader(wxInfo)));
                        }
                        this.setState({
                            payResult: PAY_RESULT_SUCCESS
                        });
                    } else {
                        this.pageBack("msg.pay.success");
                    }
                },
                cancel: (res) => {
                    this.pageBack("msg.pay.cancel");
                },
                fail: (res) => {
                    if (this.state.payType === Const.PAY_TYPE_GONG_XIANG) {
                        this.setState({
                            payResult: PAY_RESULT_FAIL
                        });
                    } else {
                        actionSetGlobAlert("", ActionTypes.COMMON.ALERT_TYPE_WX_API_FAIL);
                    }
                }
            });
        });
    }

    pageBack(msg) {
        const actionSetGlobAlert = this.props.action_setGlobAlert;
        const matchParams = this.state.matchParams;
        const { isIos } = window.sysInfo;

        actionSetGlobAlert(intl.get(msg));
        setTimeout(() => {
            matchParams.openid !== "" ? window.WeixinJSBridge.call('closeWindow') : window.history.go(isIos ? -2 : -1);
        }, 800);
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
        const {defaultChooseProductId} = this.state;
        if (data && data[0]) {
            let defaultActiveItem = data[0];
            if (defaultChooseProductId) {
                defaultActiveItem = data.filter(item => {
                    return item.productId === defaultChooseProductId;
                })[0] || defaultActiveItem;
            } else {
                defaultActiveItem = data.filter(item => {
                    // isRecommend 1 是推荐的产品 0 不是推荐的产品
                    return item.isRecommend === 1;
                })[0] || defaultActiveItem;
            }
            this.setState({
                payListActiveItem: defaultActiveItem,
                payList: data,
                payType: data[0]['productType']
            });
        }
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
                    payResult: this.state.payType === Const.PAY_TYPE_GONG_XIANG ? PAY_RESULT_SUCCESS : "",
                    buttonPage: <ButtonPage
                        src={PaySuccessIcon}
                        content={intl.get("msg.recharge.success")}
                        buttonLabel={intl.get("button.close")}
                        touchTap={() => {
                            window.AlipayJSBridge.call('closeWebview');
                        }}/>
                });
                break;
            case "aliPayFailed":
                this.setState({
                    payResult: this.state.payType === Const.PAY_TYPE_GONG_XIANG ? PAY_RESULT_FAIL : "",
                    buttonPage: <ButtonPage
                        src={PayFailedIcon}
                        content={intl.get("msg.recharge.fail.recharge")}
                        buttonLabel={intl.get("button.close")}
                        touchTap={() => {
                            window.AlipayJSBridge.call('closeWebview');
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
        result: state.app.pay,
        weixinConfigFinish: state.app.common.weixinConfigFinish
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getPayListAction: bindActionCreators(getPayList, dispatch),
        action_setGlobAlert: bindActionCreators(setGlobAlert, dispatch),
        getWXPayParamsAction: bindActionCreators(getWXPayParams, dispatch),
        getUserInfoAction: bindActionCreators(getUserInfo, dispatch),
        alipayAction: bindActionCreators(alipayPay, dispatch)
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Pay));

