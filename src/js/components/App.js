import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import "../../sass/main.scss";
import {bindDevice, getUserConfig, getUserInfo} from "../actions/userActions";
import {
    getLocalesData, getSysConfig,
    getUserInfoFromSession,
    setGlobAlert,
    setLocalNet,
    setWeixinConfigFinished,
    updateScreen
} from "../actions/common/actions";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import lightBaseTheme from "material-ui/styles/baseThemes/lightBaseTheme";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import {
    chkDevice,
    formatTime, getCookie,
    getEncryptHeader,
    getQueryString, getSession,
    isGetUserInfo,
    linkTo, linkToPayment,
    reqHeader,
    setCookie, setSession,
    wxAuthorizedUrl,
    wxConfig,
    wxShare
} from '../utils/comUtils';
import {withRouter} from "react-router";
import ActionTypes from "../actions/actionTypes";
import {getOttStatus} from "../actions/deviceAction";
import sysConfig from "../utils/sysConfig";
import TimeIcon from "../../img/common/icon_time.png";
import BaseComponent from "./common/BaseComponent";
import intl from 'react-intl-universal';
import _ from "lodash";
import Routers from '../router';
import ThemeProvider from "../themes";
import CommonInfo from "./common/CommonInfo";
import Const from '../utils/const';


window.sysInfo = chkDevice();
let wxConfigPaths = [];
const SUPPOER_LOCALES = [
    {
        name: "English",
        value: "en-US"
    },
    {
        name: "Spanish",
        value: "es-US"
    },
    {
        name: "简体中文",
        value: "zh-CN"
    },
    {
        name: "繁體中文",
        value: "zh-TW"
    },
    {
        name: "繁體中文",
        value: "zh-HK"
    },
    {
        name: "English",
        value: "EN"
    },
    {
        name: "西班牙语",
        value: "ES"
    },
    {
        name: "简体中文",
        value: "CN"
    },
    {
        name: "繁體中文",
        value: "HK"
    },
    {
        name: "繁體中文",
        value: "TW"
    },
];
const style = {
    gxTimePanel: {
        position: 'fixed',
        backgroundColor: '#ff6832',
        bottom: '4rem',
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 12,
        span: {
            height: '1rem',
            overflow: 'hidden',
            width: '2.2rem',
            textAlign: 'center',
            paddingLeft: '.2rem',
            color: 'white',
            paddingTop: '.13rem',
            p: {
                margin: 0,
                fontSize: '.32rem',
                lineHeight: '.4rem'
            }
        },
        img: {
            height: '1rem',
            position: 'absolute',
            left: '-.5rem',
            top: 0,
            backgroundColor: '#ff6832',
            padding: '.133rem',
            borderRadius: '50%',
        }
    }
};

class App extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            showMsg: false,
            showDialog: false,
            msgText: '',
            timer: null,
            gxTimer: null,
            barrageSendToast: false,
            updateDevice: false,
            checkLocalTimer: 0,
            checkLocalCount: 0,
            checkLocalBetween: 120,
            theme: getSession("theme") || "default",
            lan: getCookie("language")
        };
        this.initail = this.initail.bind(this);
        this.msgOk = this.msgOk.bind(this);
        this.showMsg = this.showMsg.bind(this);
        this.configWeiXin = this.configWeiXin.bind(this);
        this.sizeChange = this.sizeChange.bind(this);
        this.runCheckLocal = this.runCheckLocal.bind(this);
        this.updateUserInfo = this.updateUserInfo.bind(this);
        this.gxTimer = this.gxTimer.bind(this);
        this.configWxPath = this.configWxPath.bind(this);
        this.loadLocales = this.loadLocales.bind(this);
        this.loadChannelConfig = this.loadChannelConfig.bind(this);
    }

    componentWillMount() {
    }

    componentDidMount() {
        //move to after initial user info
        const paramLan = getQueryString("language");
        if (paramLan) setCookie("language", paramLan);
        // this.loadLocales();
        if (isGetUserInfo()) {
            this.updateUserInfo();
        } else {
            this.initail();
            window.noUserInfo = true;
        }

        //move to after initial user info
        // this.runCheckLocal();

        //this.removeAppLoading();
        window.addEventListener('resize', this.sizeChange);
        // window.addEventListener('focus', () => {isGetUserInfo() && this.updateUserInfo();});
        this.props.action_updateScreen();

        //move to after initial user info
        // const {isIos} = window.sysInfo;
        // if (isIos) {
        //     this.configWeiXin();
        // }


        //move to after initial user info
        // this.configWxPath();

        window.wx && window.wx.ready(() => {
            wxShare({
                title: intl.get("index.we.chat.song"),
                desc: intl.get("audio.share.from"),
                // link: wxAuthorizedUrl(sysConfig.appId, sysConfig.apiDomain, location.protocol + "//" + location.host),
                link: location.protocol + "//" + location.host,
                imgUrl: 'http://wechat.j-make.cn/img/logo.png',
                dataUrl: null
            });
        });

        window.lockResize = true;
    }

    componentDidUpdate(prevProps) {

        //move to after initial user info
        // this.configWxPath();

        if (isGetUserInfo()) {
            if (window.noUserInfo === true) {
                this.updateUserInfo();
                window.noUserInfo = false;
            } else {
                this.configWxPath();
            }
        } else {
            this.configWxPath();
        }
        // const alertData = this.props.alertData;
        // if (alertData === ActionTypes.COMMON.ALERT_TYPE_FREE_ACTIVE) {
        //     linkTo("deviceRegister", false, "");
        //     this.props.action_setGlobAlert("", "");
        // }
        if (prevProps.userInfo.userInfoStamp !== this.props.userInfo.userInfoStamp) {
            const data = this.props.userInfo.userInfoData || {};
            if (data) {
                setSession("wxInfo", JSON.stringify(data));
                this.props.action_getOttStatus({}, reqHeader({}));

                if (data.hasOwnProperty('time')) {
                    if (this.state.gxTimer) {
                        clearInterval(this.state.gxTimer);
                        this.state.gxTimer = 0;
                    }
                    this.gxTimer();
                    this.gxUpdateUserInfoTimer();
                }

                if (data.hasOwnProperty('tag')) {
                    this.updateTheme(data.tag);
                }

                if (data.channel) {
                    setCookie("channel", data.channel);
                }
                this.initail();
            }
        }
    }

    render() {
        const {isIos} = window.sysInfo;
        const userInfoData = this.props.userInfo.userInfoData || {};
        return (
            this.state.initDone ? <div>
                <MuiThemeProvider className={"App"} muiTheme={getMuiTheme(lightBaseTheme)}>
                    <div className={`${isIos ? "os-ios" : "os-android"} lan_${this.state.lan} ${this.state.showDialog ? "show-alert" : ""} channel_${userInfoData.channel}`}>
                        <CommonInfo themeChange={theme => {
                            this.setState({
                                theme: theme
                            });
                        }}/>
                       <ThemeProvider name={this.state.theme}>

                       </ThemeProvider>

                        <Routers/>
                        {
                            (this.pageFilterToShowGXTimer() && typeof this.state.gxTime !== 'undefined') ? <div style={style.gxTimePanel}
                                                                            onClick={() => {
                                                                                if (super.validUserBindDevice(this.props.userInfo.userInfoData, this.props.action_setGlobAlert) !== true) return;

                                                                                if (super.isFreeActivation(this.props.userInfo.userInfoData)) {
                                                                                    linkTo(`deviceRegister`, false, null);
                                                                                    return;
                                                                                }
                                                                                linkToPayment(this.props.action_getUserInfo.userInfoData);
                                                                            }}>
                                <img src={TimeIcon} style={style.gxTimePanel.img}/>
                                <span style={style.gxTimePanel.span}>
                                    {
                                        this.state.gxTime ? <font>
                                            <p style={style.gxTimePanel.span.p}>
                                                {intl.get("song.rest.time")}
                                            </p>
                                            <p style={style.gxTimePanel.span.p}>
                                                {formatTime(this.state.gxTime)}
                                            </p>
                                        </font> : <p style={{margin: 0, fontSize: '0.32rem', lineHeight: '0.8rem'}}>
                                                {intl.get("song.sing.now")}
                                        </p>
                                    }

                                </span>
                            </div> : ""
                        }
                    </div>
                </MuiThemeProvider>
            </div> : <div/>
        );
    }

    /**
     * 替换带有uuid，openid的链接保护当前用户信息，避免被链接带走
     */
    replaceUrlToProtectUserInfo() {
        if ((
                getQueryString('uuid') !== null ||
                getQueryString('openid') !== null
            ) &&
            location.pathname.indexOf('recording') < 0 &&
            location.pathname.indexOf('pay') < 0
            ) {
            const link = `${location.pathname}?language=${getQueryString('language')}`;
            const {isIos} = window.sysInfo;
            if (isIos) {
                location.href = link;
            } else {
                this.props.history.replace(link);
            }
            this.configWxPath();
        }
    }

    /**
     * 判断当前页面是否显示共享倒计时
     * @returns {boolean}
     */
    pageFilterToShowGXTimer() {
        const pathNames = [
            'pay',
            'user',
            'recording',
            'recordingPlay',
            'deviceRegister',
            'protocol',
            'editRecord',
            'login',
            'recharge',
            'effect',
            'logout',
            'comment'
        ];
        let bool = true;

        pathNames.map(pathName => {
            if (location.pathname.indexOf(pathName) > -1) bool = false;
        });

        return bool;
    }

    removeAppLoading() {
        let appLoadingDiv = document.querySelector("#appLoadingDiv");
        let appLoadingStyle = document.querySelector("#appLoadingStyle");
        appLoadingDiv && appLoadingDiv.parentNode.removeChild(appLoadingDiv);
        appLoadingStyle && appLoadingStyle.parentNode.removeChild(appLoadingStyle);
    }

    // 点击msg的ok按钮
    msgOk() {
        this.setState({
            showMsg: false
        });
    }

    // 显示弹框
    showMsg(msg) {
        this.setState({
            showMsg: true,
            msgText: msg
        });
    }

    /**
     * 屏幕尺寸改变事件
     */
    sizeChange () {
        if (!this.state.timer) {
            this.state.timer = setTimeout(() => {
                this.props.action_updateScreen();
                clearTimeout(this.state.timer);
                this.state.timer = null;
            }, 500);
        }
    }


    /**
     * 更新用户信息
     */
    updateUserInfo(wxInfo) {
        let {isWeixin} = window.sysInfo;
        if (isWeixin) {
        //     // 获取用户信息
        //     let wxInfo = {
        //         wxId: getQueryString("uuid") || "",
        //         deviceId: getQueryString("deviceId") || ""
        //     };
        //     let wxInfoSession = JSON.parse(window.sessionStorage.getItem("wxInfo") || "{}");
        //     if (wxInfoSession.status === -100) {
        //         window.sessionStorage.removeItem("wxInfo");
        //         wxInfoSession = {};
        //     }
        //     const { data, status } = wxInfoSession;
        //     if (data && data.hasOwnProperty('time')) {
        //         const {uuid, userId, deviceId} = data;
        //         const params = {
        //             url: `${location.origin}?uuid=${uuid}&userid=${userId}&deviceId=${deviceId}`
        //         };
        //         wxInfo = {
        //             wxId: uuid || "",
        //             deviceId: deviceId || ""
        //         };
        //         this.props.action_getUserInfo(params, reqHeader(params, getEncryptHeader(wxInfo)));
        //     } else if (typeof status === "undefined" || !!wxInfo.wxId) {
        //         const params = {
        //             url: window.location.href.split("#")[0]
        //         };
        //         this.props.action_getUserInfo(
        //             params,
        //             reqHeader(params, getEncryptHeader(wxInfo)),
        //             // () => this.replaceUrlToProtectUserInfo()
        //         );
        //         // history.replaceState("", "", "/");
        //     } else {
        //         this.props.action_getUserInfoFromSession();
        //     }
        // } else {
        //     // window.sessionStorage.setItem("wxInfo", JSON.stringify({
        //     //     status: -100,
        //     //     msg: "",
        //     //     data: {}
        //     // }));
        //     this.props.action_getUserInfoFromSession();
            this.props.action_getUserInfo({}, reqHeader({}, getEncryptHeader({})));
        } else {
            this.initail();
        }
    }

    /**
     * ott同局域网测试
     */
    runCheckLocal() {
        const {checkLocalTimer} = this.state;
        if (!checkLocalTimer) {
            this.state.checkLocalTimer = setInterval(() => {
                const {checkLocalCount, checkLocalBetween} = this.state;
                if (this.props.localNetIsWork) {
                    this.state.checkLocalCount = 0;
                    return;
                }
                if (checkLocalCount >= checkLocalBetween) {
                    const param = {};
                    this.props.action_getOttStatus(param, reqHeader(param), () => {
                        this.props.action_setLocalNet(true);
                    });
                    this.state.checkLocalCount = 0;
                } else {
                    this.state.checkLocalCount += 1;
                }
            }, 1000);
        }
    }

    configWeiXin() {
        const {isIos} = window.sysInfo;
        if (!isIos && this.pageFilterForConfigWX()) return;
        let param = {url: location.href.split('#')[0]};
        this.props.action_getUserConfig(param, reqHeader(param), (json) => {
            const data = json;
            setTimeout(() => {
                this.props.action_setWeixinConfigFinished(false);
                wxConfig(data);
                window.wx && window.wx.ready(() => {
                    this.props.action_setWeixinConfigFinished(true);
                });
            }, 500);
        });
    }

    /**
     * 判断当前页面是否调用wx.config
     * @returns {boolean}
     */
    pageFilterForConfigWX() {
        const pathNames = [
            // 'pay',
            // 'voiceSearch',
        ];
        let bool = false;

        pathNames.map(pathName => {
            if (location.pathname.indexOf(pathName) >= 0) bool = true;
        });

        return bool;
    }

    gxTimer() {
        const {gxTimer} = this.state;
        const actionSetGlobAlert = this.props.action_setGlobAlert;
        if (!gxTimer) {
            const time = this.state.gxTime = this.props.userInfo.userInfoData.time;
            if (time) {
                window.localStorage.setItem("gxAlert", '{"done": false}');
                window.gxAlertDone = false;
            } else {
                const defaultGxAlert = JSON.parse(window.localStorage.getItem("gxAlert") || "{}");
                window.gxAlertDone = defaultGxAlert.done;
            }
            this.state.gxTimer = setInterval(() => {
                if (this.state.gxTime <= 0) {
                    window.gxTime = 0;
                    if (!window.gxAlertDone) {
                        let gxAlert = JSON.parse(window.localStorage.getItem("gxAlert") || "{}");
                        if (!gxAlert.done) {
                            const isBindDevice = super.validUserBindDevice(this.props.userInfo.userInfoData, this.props.action_setGlobAlert, true) === true;
                            if (isBindDevice && this.pageFilterToShowGXTimer()) {
                                actionSetGlobAlert && typeof gxAlert.done !== 'undefined' && actionSetGlobAlert("", ActionTypes.COMMON.ALERT_TYPE_GONG_XIANG_DONE);
                                window.localStorage.setItem("gxAlert", '{"done": true}');
                            }
                            window.gxAlertDone = true;
                            clearInterval(this.state.gxTimer);
                            this.state.gxTimer = 0;
                        }
                    }
                    return;
                }
                const gxTime = --this.state.gxTime;
                this.setState({
                    gxTime: gxTime
                });
                window.gxTime = gxTime;
                if (window.gxAlertDone) {
                    window.localStorage.setItem("gxAlert", '{"done": false}');
                    window.gxAlertDone = false;
                }
            }, 1000);
        }
    }

    gxUpdateUserInfoTimer() {
        if (!this.state.gxUpdateUserInfoTimer) {
            this.state.gxUpdateUserInfoTimer = setInterval(() => {
                this.updateUserInfo();
            }, 1000 * 10);
        }

    }

    configWxPath() {
        const {isWeixin, isIos} = window.sysInfo;
        if (isWeixin && !isIos) {
            const path = this.props.history.location.pathname;
            if (!wxConfigPaths[path]) {
                this.configWeiXin();
                wxConfigPaths[path] = true;
            }
        }
    }

    loadLocales() {
        let languageFromUrl = getQueryString("language");
        let currentLocale = languageFromUrl || intl.determineLocale({
            cookieLocaleKey: "language"
        });
        if (!_.find(SUPPOER_LOCALES, { value: currentLocale })) {
            currentLocale = "zh-CN";
        }
        currentLocale && setCookie("language", currentLocale);
        this.props.action_getLocalesData(currentLocale, res => {
            intl.init({
                currentLocale,
                locales: {
                    [currentLocale]: res
                }
            });
            this.removeAppLoading();
            this.setState({initDone: true, lan: currentLocale});
        }, err => {
            this.removeAppLoading();
            this.setState({ initDone: true });
        });
    }

    loadChannelConfig() {
        const param = {type: 6};
        this.props.action_getSysConfig(param, reqHeader(param), res => setCookie("sysConfig", JSON.stringify(res)));
    }

    /**
     * 更新主题
     * @param tag
     */
    updateTheme(tag) {
        if (typeof tag !== "undefined") {
            const theme = (tag + ',').indexOf(Const.TAG_CHILD_MODE + ',') > 0 ? 'children' : 'default';
            this.setState({
                theme: theme
            });
            setSession("theme", theme);
        }
    }

    initail() {
        this.loadChannelConfig();
        this.loadLocales();
        this.runCheckLocal();
        const {isIos} = window.sysInfo;
        if (isIos) {
            this.configWeiXin();
        }
        this.configWxPath();
    }
}

// 映射state到props
const mapStateToProps = (state, ownProps) => {
    return {
        userInfo: state.app.user.userInfo,
        language: state.app.common.language,
        localNetIsWork: state.app.common.localNetIsWork,
    };
};
// 映射dispatch到props
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        action_getUserConfig: bindActionCreators(getUserConfig, dispatch),
        action_updateScreen: bindActionCreators(updateScreen, dispatch),
        action_getUserInfo: bindActionCreators(getUserInfo, dispatch),
        action_getUserInfoFromSession: bindActionCreators(getUserInfoFromSession, dispatch),
        action_setGlobAlert: bindActionCreators(setGlobAlert, dispatch),
        action_getOttStatus: bindActionCreators(getOttStatus, dispatch),
        action_setLocalNet: bindActionCreators(setLocalNet, dispatch),
        action_setWeixinConfigFinished: bindActionCreators(setWeixinConfigFinished, dispatch),
        action_bindDevice: bindActionCreators(bindDevice, dispatch),
        action_getLocalesData: bindActionCreators(getLocalesData, dispatch),
        action_getSysConfig: bindActionCreators(getSysConfig, dispatch)
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(App));
