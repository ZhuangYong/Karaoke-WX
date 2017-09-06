import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import "../../sass/main.scss";
import {getUserConfig, getUserInfo} from "../actions/userActions";
import {
    getUserInfoFromSession, setGlobAlert, setLocalNet, setWeixinConfigFinished,
    updateScreen
} from "../actions/common/actions";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import lightBaseTheme from "material-ui/styles/baseThemes/lightBaseTheme";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import {chkDevice, reqHeader, wxConfig, getQueryString, getEncryptHeader, linkTo, wxShare} from "../utils/comUtils";
import {withRouter} from "react-router";
import {Route, Switch} from "react-router-dom";
import NotFound from "../components/common/notfound";
import Home from "../containers/home";
import Login from "../containers/login";
import Audio from "../containers/play/audio";
import Bundle from "./Bundle";
import ChooseList from "../containers/song/chooseList";
import SongController from "../containers/controller/songController";
import User from "../containers/user";
import SingerAlbum from "../containers/song/singerAlbum";
import SingerList from "../containers/song/singerList";
import SongsList from "../containers/song/SongList";

import CatAlbum from "../containers/song/catAlbum";

import Search from "../containers/song/search";

import AudioEffect from "../containers/controller/audioEffect";
import Barrage from "../containers/controller/barrage";
import Recordings from '../containers/user/recordings';
import PhotoAlbum from '../containers/user/photoAlbum';
import Preview from '../containers/user/photoAlbum/preview';
import OrderForm from "../containers/user/orderForm/index";
import Feedback from "../containers/user/feedback/index";
import VoiceSearch from "../containers/voiceSearch";
import Pay from "../containers/Pay";
import Protocol from "../containers/Pay/Protocol";
import {Dialog, FlatButton, Snackbar} from "material-ui";
import ActionTypes from "../actions/actionTypes";
import {getOttStatus} from "../actions/deviceAction";
import Suggestions from "../containers/forOldVersion/suggestions";
import sysConfig from "../utils/sysConfig";

const LoginContainer = () => (
    <Bundle load={Login}>
        {Component => <Component />}
    </Bundle>
);

const HomeContainer = () => (
    <Bundle load={Home}>
        {Component => <Component />}
    </Bundle>
);

const AudioContainer = () => (
    <Bundle load={Audio}>
        {Component => <Component />}
    </Bundle>
);

const ChooseListContainer = () => (
    <Bundle load={ChooseList}>
        {Component => <Component />}
    </Bundle>
);

const SongControllerContainer = () => (
    <Bundle load={SongController}>
        {Component => <Component />}
    </Bundle>
);
const UserContainer = () => (
    <Bundle load={User}>
        {Component => <Component />}
    </Bundle>
);
const SearchContainer = () => (
    <Bundle load={Search}>
        {Component => <Component />}
    </Bundle>
);
const SingerAlbumContainer = () => (
    <Bundle load={SingerAlbum}>
        {Component => <Component />}
    </Bundle>
);
const SingerListContainer = () => (
    <Bundle load={SingerList}>
        {Component => <Component />}
    </Bundle>
);
const CatAlbumContainer = () => (
    <Bundle load={CatAlbum}>
        {Component => <Component />}
    </Bundle>
);
const SongsListContainer = () => (
    <Bundle load={SongsList}>
        {Component => <Component />}
    </Bundle>
);
const RecordingsContainer = () => (
    <Bundle load={Recordings}>
        {Component => <Component />}
    </Bundle>
);

const PhotoAlbumContainer = () => (
    <Bundle load={PhotoAlbum}>
        {Component => <Component />}
    </Bundle>
);

const PreviewContainer = () => (
    <Bundle load={Preview}>
        {Component => <Component />}
    </Bundle>
);
const AudioEffectContainer = () => (
    <Bundle load={AudioEffect}>
        {Component => <Component />}
    </Bundle>
);
const BarrageContainer = () => (
    <Bundle load={Barrage}>
        {Component => <Component />}
    </Bundle>
);
const OrderFormContainer = () => (
    <Bundle load={OrderForm}>
        {Component => <Component />}
    </Bundle>
);

const FeedbackContainer = () => (
    <Bundle load={Feedback}>
        {Component => <Component />}
    </Bundle>
);

const VoiceSearchContainer = () => (
    <Bundle load={VoiceSearch}>
        {Component => <Component />}
    </Bundle>
);

const PayContainer = () => (
    <Bundle load={Pay}>
        {Component => <Component />}
    </Bundle>
);

const ProtocolContainer = () => (
    <Bundle load={Protocol}>
        {Component => <Component />}
    </Bundle>
);
const SuggestionsContainer = () => (
    <Bundle load={Suggestions}>
        {Component => <Component />}
    </Bundle>
);

/*const dynamicLoadFun = (container) => {
    return () => (
        <Bundle load={container}>
            {Component => <Component/>}
        </Bundle>
    );
};*/

window.sysInfo = chkDevice();
let wxConfigPaths = [];
let firstConfigUrl = "";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showMsg: false,
            msgText: '',
            timer: null,
            barrageSendToast: false,
            updateDevice: false,
            checkLocalTimer: 0,
            checkLocalCount: 0,
            checkLocalBetween: 120
        };
        this.msgOk = this.msgOk.bind(this);
        this.showMsg = this.showMsg.bind(this);
        this.configWeiXin = this.configWeiXin.bind(this);
        this.sizeChange = this.sizeChange.bind(this);
        this.runCheckLocal = this.runCheckLocal.bind(this);
        this.updateUserInfo = this.updateUserInfo.bind(this);
        this.validUserStatusDialog = this.validUserStatusDialog.bind(this);
    }

    componentWillMount() {
        console.log("App will mount");
    }

    componentDidMount() {
        this.updateUserInfo();
        this.runCheckLocal();
        console.log("App component did mount ");
        this.removeAppLoading();
        window.addEventListener('resize', this.sizeChange);
        this.props.action_updateScreen();

        const {isIos} = window.sysInfo;
        if (isIos) {
            this.configWeiXin();
        }

        window.wx.ready(() => {
            wxShare({
                title: `金麦客微信点歌`,
                desc: "分享自金麦客家庭卡拉OK",
                // link: sysConfig.wxAuthorized,
                link: location.protocol + "//" + location.host,
                imgUrl: "http://wx.j-make.cn/img/logo.png",
                dataUrl: null
            });
        });
    }

    componentDidUpdate(prevProps) {
        console.log('App did Updated');
        // if (this.props.userInfo.userInfoData && !this.state.updateDevice) {
        //     const param = {};
        //     this.props.action_getOttStatus(param, reqHeader(param));
        //     this.state.updateDevice = true;
        // }
        const alertData = this.props.alertData;
        if (alertData === ActionTypes.COMMON.ALERT_TYPE_FREE_ACTIVE) {
            linkTo("pay/deviceRegister", false, "");
            this.props.action_setGlobAlert("", "");
        }
        if (prevProps.userInfo.userInfoStamp !== this.props.userInfo.userInfoStamp) {
            const {status, data, msg} = this.props.userInfo.userInfoData || {};
            if (parseInt(status, 10) === 302) {
                window.location.href = data;
            } else if (parseInt(status, 10) === 1) {
                window.sessionStorage.setItem("wxInfo", JSON.stringify(this.props.userInfo.userInfoData));
                this.props.action_getOttStatus({}, reqHeader({}));
            }
        }

        let {isWeixin, isIos} = window.sysInfo;
        if (isWeixin && !isIos) {
            if (!wxConfigPaths[this.props.history.location.pathname]) {
                this.configWeiXin();
                wxConfigPaths[this.props.history.location.pathname] = true;
            }
        }

    }

    render() {
        const showAlert = !!this.props.globAlert && !this.props.alertData;
        return (
            <div>
                <MuiThemeProvider className={"App"} muiTheme={getMuiTheme(lightBaseTheme)}>
                    <div>
                    <Switch>
                        <Route path={`/`} exact component={HomeContainer}/>
                        <Route path={`/home`} component={HomeContainer}/>
                        {/*
                        *state: home/aliPaySuccess/aliPayFailed/deviceRegister(页面状态)
                        * openid: 用户微信openId
                        * pollingId: OTT轮询id
                        * deviceId: OTT设备id
                        */}
                        <Route path={`/pay/:state/:pollingId?/:deviceId?/:openid?`} component={PayContainer}/>
                        <Route path={`/protocol`} component={ProtocolContainer}/>
                        <Route path={`/controller/`} exact component={SongControllerContainer}/>
                        <Route path={`/controller/effect`} exact component={AudioEffectContainer}/>
                        <Route path={`/controller/barrage`} exact component={BarrageContainer}/>
                        <Route path={`/user`} exact component={UserContainer}/>
                        <Route path={`/user/recordings`} exact component={RecordingsContainer}/>
                        <Route path={`/user/recordings/play/:uid`} component={AudioContainer}/>
                        <Route path={`/user/photoAlbum`} exact component={PhotoAlbumContainer}/>
                        {/*imgId: 预览图片id*/}
                        <Route path={`/user/photoAlbumPreview/:imgId`} exact component={PreviewContainer}/>
                        <Route path={`/user/orderForm`} exact component={OrderFormContainer}/>
                        {/*
                        *state: home/success(页面状态)
                        *deviceId: 绑定设备号
                        * */}
                        <Route path={`/user/feedback/:state/:deviceId?`} exact component={FeedbackContainer}/>
                        <Route path={`/suggestions/suggestions.html`} exact component={SuggestionsContainer}/>
                        {/*
                        *state: home/success/failed/invalid(页面状态)
                        *uuid: 扫码登录参数/用户微信unionId
                        * userId: 服务器给用户的id
                        * deviceId: 设备id
                        */}
                        <Route path={`/login/:state/:uuid?/:userId?/:deviceId?`} component={LoginContainer}/>
                        <Route path={`/song/chooselist`} exact component={ChooseListContainer}/>
                        <Route path={`/song/search/:keyword?`} exact component={SearchContainer}/>
                        <Route path={`/singer/album`} exact component={SingerAlbumContainer}/>
                        <Route path={`/singer/:id/:title`} exact component={SingerListContainer}/>
                        <Route path={`/catAlbum`} exact component={CatAlbumContainer}/>
                        <Route path={`/songs/:type/:id/:title?/:headImg?`} exact component={SongsListContainer}/>
                        <Route path={`/voiceSearch`} exact component={VoiceSearchContainer}/>
                        <Route path="*" component={NotFound}/>
                    </Switch>
                    <Snackbar
                        open={showAlert}
                        message={this.props.globAlert}
                        autoHideDuration={2000}
                        onRequestClose={() => {
                            this.props.action_setGlobAlert("");
                        }}
                    />
                        {this.validUserStatusDialog()}
                    </div>
                </MuiThemeProvider>
            </div>
        );
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

    validUserStatusDialog() {
        const alertData = this.props.alertData;
        if (!alertData) return;
        let alertStr = "";
        let showAlert = true;
        let doAction;
        switch (alertData) {
            case ActionTypes.COMMON.ALERT_TYPE_BIND_DEVICE:
                alertStr = '未绑定设备, 请绑定';
                //TODO BIND DEVICE
                doAction = () => {
                    window.wx.scanQRCode({
                        needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                        scanType: ["qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
                        success: function (res) {
                            // let result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                            console.log('扫一扫成功');
                            // alert(result);
                        },
                        fail: function (res) {
                            console.log(res);
                        }
                    });
                };
                break;
            case ActionTypes.COMMON.ALERT_TYPE_FREE_ACTIVE:
                // alertStr = '激活vip免费体验';
                //TODO ACTIVE
                //linkTo("", false, "");
                break;
            case ActionTypes.COMMON.ALERT_TYPE_BE_VIP:
                alertStr = '充值成为VIP';
                //TODO VIP
                doAction = () => {
                    linkTo("pay/home", false, "");
                };
                break;
            case ActionTypes.COMMON.ALERT_TYPE_DEVICE_NOT_ONLINE:
                alertStr = '设备不在线';
                break;
            default:
                showAlert = false;
                break;
        }
        if (!alertStr) return;
        const handleClose = () => {
            this.props.action_setGlobAlert("", "");
        };
        const handleSure = () => {
            this.props.action_setGlobAlert("", "");
            doAction && doAction();
        };
        const actions = [
            <FlatButton
                label="取消"
                className="cancel-button"
                primary={true}
                onTouchTap={handleClose}
            />,
            <FlatButton
                label="确定"
                className="sure-button"
                primary={true}
                onTouchTap={handleSure}
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

    /**
     * 更新用户信息
     */
    updateUserInfo() {
        let {isWeixin} = window.sysInfo;
        if (isWeixin) {
            // const param = {url: location.href.split('#')[0]};
            // this.props.action_getUserConfig(param, reqHeader(param), (json) => {
            //     const {data} = json;
            //     wxConfig(data);
            // });

            // 获取用户信息
            let wxInfo = {
                wxId: getQueryString("uuid") || "",
                deviceId: getQueryString("deviceId") || ""
            };
            let wxInfoSession = JSON.parse(window.sessionStorage.getItem("wxInfo") || "{}");
            if (wxInfoSession.status === -100) {
                window.sessionStorage.removeItem("wxInfo");
                wxInfoSession = {};
            }
            if (typeof wxInfoSession.status === "undefined" || !!wxInfo.wxId) {
                const params = {
                    url: window.location.href.split("#")[0]
                };
                this.props.action_getUserInfo(params, reqHeader(params, getEncryptHeader(wxInfo)));
                history.replaceState("", "", "/");
            } else {
                this.props.action_getUserInfoFromSession();
            }
        } else {
            window.sessionStorage.setItem("wxInfo", JSON.stringify({
                status: -100,
                msg: "",
                data: {}
            }));
            this.props.action_getUserInfoFromSession();
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
        let param = {url: location.href.split('#')[0]};
        this.props.action_getUserConfig(param, reqHeader(param), (json) => {
            const {data} = json;
            setTimeout(() => {
                this.props.action_setWeixinConfigFinished(false);
                wxConfig(data);
                window.wx.ready(() => {
                    this.props.action_setWeixinConfigFinished(true);
                });
            }, 500);
        });
    }
}

// 映射state到props
const mapStateToProps = (state, ownProps) => {
    return {
        userInfo: state.app.user.userInfo,
        globAlert: state.app.common.globAlert,
        alertData: state.app.common.alertData,
        localNetIsWork: state.app.common.localNetIsWork,
        ottInfo: state.app.device.ottInfo
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
        action_setWeixinConfigFinished: bindActionCreators(setWeixinConfigFinished, dispatch)
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(App));
