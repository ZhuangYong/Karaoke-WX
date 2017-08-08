import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import "../../sass/main.scss";
import * as actions from "../actions/common/actions";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import lightBaseTheme from "material-ui/styles/baseThemes/lightBaseTheme";
import getMuiTheme from "material-ui/styles/getMuiTheme";

import {withRouter} from "react-router";
import {Route, Switch} from "react-router-dom";
import NotFound from "../components/common/notfound";
import Home from "../containers/home";
import Login from '../containers/login';
import Audio from "../containers/play/audio";
import Bundle from "./Bundle";
import ChooseList from "../containers/song/chooseList";
import SongController from "../containers/controller/songController";
import User from "../containers/user";
import SingerAlbum from "../containers/song/singerAlbum";
import SingerList from "../containers/song/singerList";
import SingerSongsList from "../containers/song/singerSongList";
import CatSongsList from "../containers/song/CatSongList";
import HotSongsList from "../containers/song/HotSongList";
import CatAlbum from "../containers/song/catAlbum";

import Search from "../containers/song/search";

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
const SingerSongsListContainer = () => (
    <Bundle load={SingerSongsList}>
        {Component => <Component />}
    </Bundle>
);
const CatAlbumContainer = () => (
    <Bundle load={CatAlbum}>
        {Component => <Component />}
    </Bundle>
);
const CatSongsListContainer = () => (
    <Bundle load={CatSongsList}>
        {Component => <Component />}
    </Bundle>
);
const HotSongsListContainer = () => (
    <Bundle load={HotSongsList}>
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
                        <Route path={`/controller`} component={SongControllerContainer}/>
                        <Route path={`/user`} exact component={UserContainer}/>
                        <Route path={`/login`} component={LoginContainer}/>
                        <Route path={`/s/p/:uid`} component={AudioContainer}/>
                        <Route path={`/song/chooselist`} component={ChooseListContainer}/>
                        <Route path={`/song/search`} component={SearchContainer}/>
                        <Route path={`/singer/album`} exact component={SingerAlbumContainer}/>
                        <Route path={`/singer/:id`} exact component={SingerListContainer}/>
                        <Route path={`/singer/songs/:id`} exact component={SingerSongsListContainer}/>
                        <Route path={`/catalbum`} exact component={CatAlbumContainer}/>
                        <Route path={`/cat/songs/:id`} exact component={CatSongsListContainer}/>
                        <Route path={`/hot/songs/:id`} exact component={HotSongsListContainer}/>
                        <Route path="*" component={NotFound}/>
                    </Switch>
                    {/*<Tips
                     ok={this.msgOk}
                     text={this.state.msgText}
                     show={this.state.showMsg}/>*/}
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
        app: state.app
    };
};
// 映射dispatch到props
const mapDispatchToProps = (dispatch, ownProps) => {
    let boundActionCreators = bindActionCreators(actions, dispatch);
    return {
        actions: boundActionCreators
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(App));
