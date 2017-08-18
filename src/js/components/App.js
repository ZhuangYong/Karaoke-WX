import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import "../../sass/main.scss";
import {getUserConfig} from "../actions/userActions";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import lightBaseTheme from "material-ui/styles/baseThemes/lightBaseTheme";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import {chkDevice, loadScript, reqHeader, wxConfig} from "../utils/comUtils";
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
import Records from '../containers/user/records';
import PhotoAlbum from '../containers/user/photoAlbum';
import Preview from '../containers/user/photoAlbum/preview';
import OrderForm from "../containers/user/orderForm/index";
import Feedback from "../containers/user/feedback/index";
import VoiceSearch from "../containers/voiceSearch";
import Pay from "../containers/Pay";
import Protocol from "../containers/Pay/Protocol";


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
const RecordsContainer = () => (
    <Bundle load={Records}>
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

/*const dynamicLoadFun = (container) => {
    return () => (
        <Bundle load={container}>
            {Component => <Component/>}
        </Bundle>
    );
};*/

window.sysInfo = chkDevice();

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showMsg: false,
            msgText: ''
        };
        this.msgOk = this.msgOk.bind(this);
        this.showMsg = this.showMsg.bind(this);
    }

    componentWillMount() {
        console.log("App will mount");
    }

    componentDidMount() {
        const {isWeixin} = window.sysInfo;
        if (isWeixin) {
            const param = {url: location.href.split('#')[0]};
            this.props.action_getUserConfig(param, reqHeader(param), (json) => {
                const {data} = json;
                wxConfig(data);
            });
        }
        console.log("App component did mount ");
        this.removeAppLoading();
    }

    componentDidUpdate(prevProps) {
        console.log('App did Updated');
    }

    render() {

        return (
            <div>
                <MuiThemeProvider className={"App"} muiTheme={getMuiTheme(lightBaseTheme)}>
                    <Switch>
                        <Route path={`/`} exact component={HomeContainer}/>
                        <Route path={`/home`} component={HomeContainer}/>
                        {/*
                        *state: home/alipaySucess/alipayFailed(页面状态)
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
                        <Route path={`/user/records`} exact component={RecordsContainer}/>
                        <Route path={`/s/p/:uid`} component={AudioContainer}/>
                        <Route path={`/user/photoAlbum`} exact component={PhotoAlbumContainer}/>
                        {/*imgId: 预览图片id*/}
                        <Route path={`/user/photoAlbumPreview/:imgId`} exact component={PreviewContainer}/>
                        <Route path={`/user/orderForm`} exact component={OrderFormContainer}/>
                        {/*
                        *state: home/success(页面状态)
                        *deviceId: 绑定设备号
                        * */}
                        <Route path={`/user/feedback/:state/:deviceId?`} exact component={FeedbackContainer}/>
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
                        <Route path={`/singer/:id`} exact component={SingerListContainer}/>
                        <Route path={`/catAlbum`} exact component={CatAlbumContainer}/>
                        <Route path={`/songs/:type/:id`} exact component={SongsListContainer}/>
                        <Route path={`/voiceSearch`} exact component={VoiceSearchContainer}/>
                        <Route path="*" component={NotFound}/>
                    </Switch>
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

}
// 映射state到props
const mapStateToProps = (state, ownProps) => {
    return {
        user: state.app.user.userConfig
    };
};
// 映射dispatch到props
const mapDispatchToProps = (dispatch, ownProps) => {
    let boundActionCreators = bindActionCreators(getUserConfig, dispatch);
    return {
        action_getUserConfig: boundActionCreators
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(App));
