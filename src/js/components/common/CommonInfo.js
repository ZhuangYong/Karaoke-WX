import React from "react";
import PropTypes from "prop-types";
import intl from "react-intl-universal";
import {getCookie, linkTo, reqHeader, setCookie} from "../../utils/comUtils";
import ActionTypes from "../../actions/actionTypes";
import {setGlobAlert} from "../../actions/common/actions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {bindDevice, getUserInfo} from "../../actions/userActions";
import {withRouter} from "react-router";
import {Dialog, FlatButton, Snackbar} from "material-ui";

class CommonInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showMsg: false,
            showDialog: false,
            msgText: '',
            timer: null,
            barrageSendToast: false,
            updateDevice: false,
            checkLocalTimer: 0,
            checkLocalCount: 0,
            checkLocalBetween: 120,
            theme: getCookie("theme") || "default"
        };
        this.validUserStatusDialog = this.validUserStatusDialog.bind(this);
    }
    componentDidUpdate() {
        const {alertData} = this.props;
        if (alertData === ActionTypes.COMMON.ALERT_TYPE_FREE_ACTIVE) {
            linkTo("deviceRegister", false, "");
            this.props.action_setGlobAlert("", "");
        }
    }
    render() {
        const validUserStatusDialog = this.validUserStatusDialog();
        const snackBar = this.snackBar();
        return <div className="common-info">
            {validUserStatusDialog}
            {snackBar}
            </div>;
    }

    snackBar() {
        let showAlert = !!this.props.globAlert && !this.props.alertData;
        if ((this.props.globAlert === intl.get("msg.network.die")) && window.lockShowNoWIfi) {
            setTimeout(() => {
                this.props.action_setGlobAlert("");
            }, 200);
            showAlert = false;
        }
        return <Snackbar
            open={showAlert}
            bodyStyle={{height: 'auto', minHeight: 48, lineHeight: '.7rem', display: 'flex', alignItems: 'center'}}
            message={this.props.globAlert}
            autoHideDuration={2000}
            onRequestClose={() => {
                this.props.action_setGlobAlert("");
            }}
        />;
    }
    validUserStatusDialog() {
        const {alertData, globAlert} = this.props;
        if (!alertData) return;
        const actionSetGlobAlert = this.props.action_setGlobAlert;
        let alertStr = "";
        let showAlert = true;
        let doAction;
        switch (alertData) {
            case ActionTypes.COMMON.ALERT_TYPE_BIND_DEVICE:
                alertStr = globAlert || intl.get("device.not.bind.do.bind");
                //TODO BIND DEVICE
                doAction = () => {
                    window.wx && window.wx.scanQRCode({
                        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                        scanType: ["qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
                        success: (res) => {
                            let result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果

                            if (result.indexOf("/q/") <= 0) {
                                actionSetGlobAlert && actionSetGlobAlert(intl.get("msg.invalid.qr.code"), "");
                                return;
                            }

                            const userInfo = this.props.userInfo.userInfoData.data;
                            const params = {
                                openId: userInfo.openid,
                                url: result
                            };

                            this.props.action_bindDevice(params, reqHeader(params), (res) => {
                                const {status} = res;
                                if (status === 1) {
                                    const getUserInfoParams = {
                                        url: window.location.href.split("#")[0]
                                    };
                                    this.props.action_getUserInfo(getUserInfoParams, reqHeader(getUserInfoParams), (res) => {
                                        const {status} = res;
                                        if (status === 1) {
                                            window.location.reload(true);
                                        }
                                    });
                                    actionSetGlobAlert(intl.get("msg.bind.success"), "");

                                } else {
                                    actionSetGlobAlert(intl.get("msg.bind.fail"), "");
                                }
                            });
                        },
                        fail: (res) => {
                            console.log(res);
                            actionSetGlobAlert("", ActionTypes.COMMON.ALERT_TYPE_WX_API_FAIL);
                        }
                    });
                };
                break;
            // case ActionTypes.COMMON.ALERT_TYPE_FREE_ACTIVE:
            //     // alertStr = '激活vip免费体验';
            //     //TODO ACTIVE
            //     //linkTo("", false, "");
            //     break;
            case ActionTypes.COMMON.ALERT_TYPE_WX_API_FAIL:
                alertStr = intl.get("msg.operate.need.auth");
                //TODO ACTIVE
                //linkTo("", false, "");
                doAction = () => {
                    window.location.reload(true);
                };
                break;
            case ActionTypes.COMMON.ALERT_TYPE_BE_VIP:
                alertStr = intl.get("msg.recharge.as.vip");
                //TODO VIP
                doAction = () => {
                    linkTo("pay/home", false, "");
                };
                break;
            case ActionTypes.COMMON.ALERT_TYPE_GONG_XIANG_DONE:
                alertStr = <div>
                    <p style={{fontWeight: 'bold'}}>
                        {intl.get("msg.song.time.end")}
                    </p>
                    <p>
                        {intl.get("msg.song.continue")}
                    </p>
                </div>;
                doAction = () => {
                    linkTo("pay/home", false, "");
                };
                break;
            case ActionTypes.COMMON.ALERT_TYPE_DEVICE_NOT_ONLINE:
                showAlert = false;
                setTimeout(() => {
                    this.props.action_setGlobAlert(intl.get("msg.device.not.online"), "");
                }, 100);
                break;
            case ActionTypes.COMMON.ALERT_TYPE_CHANGE_THEME:
            {
                const currentTheme = getCookie("theme") || "default";
                alertStr = `改变当前模式为：${currentTheme === "default" ? "儿童" : "成人"}`;
                doAction = () => {
                    if (currentTheme === "children") {
                        this.props.themeChange && this.props.themeChange("default");
                        setCookie("theme", "default");
                        // this.props.action_setGlobAlert("已切换到成人模式");
                        location.reload();
                    } else if (currentTheme === "default") {
                        this.props.themeChange && this.props.themeChange("children");
                        setCookie("theme", "children");
                        // this.props.action_setGlobAlert("已切换到儿童模式");
                        location.reload();
                    }
                };
                break;
            }
            default:
                showAlert = false;
                break;
        }
        this.state.showDialog = showAlert;
        if (!alertStr) return;
        const handleClose = () => {
            this.state.showDialog = false;
            this.props.action_setGlobAlert("", "");
        };
        const handleSure = () => {
            this.state.showDialog = false;
            this.props.action_setGlobAlert("", "");
            doAction && doAction();
        };
        const actions = [
            <FlatButton
                label={intl.get("button.cancel")}
                className="cancel-button"
                primary={true}
                onClick={handleClose}
            />,
            <FlatButton
                label={intl.get("button.sure")}
                className="sure-button"
                primary={true}
                onClick={handleSure}
            />,
        ];
        return (
            <div>
                <Dialog
                    className="dialog-panel"
                    actionsContainerStyle={{borderTop: ".01rem solid #e0e0e0", textAlign: 'center'}}
                    contentStyle={{textAlign: 'center'}}
                    actions={actions}
                    modal={false}
                    open={showAlert}
                    // onRequestClose={handleClose}
                >
                    {alertStr}
                </Dialog>
            </div>
        );
    }
}

CommonInfo.propTypes = {
    themeChange: PropTypes.func,
};

// 映射state到props
const mapStateToProps = (state, ownProps) => {
    return {
        userInfo: state.app.user.userInfo,
        globAlert: state.app.common.globAlert,
        alertData: state.app.common.alertData,
    };
};
// 映射dispatch到props
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        action_getUserInfo: bindActionCreators(getUserInfo, dispatch),
        action_setGlobAlert: bindActionCreators(setGlobAlert, dispatch),
        action_bindDevice: bindActionCreators(bindDevice, dispatch),
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(CommonInfo));
