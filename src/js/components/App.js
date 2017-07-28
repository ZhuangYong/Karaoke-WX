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

    componentDidMount() {
        console.log("root component did mount ");
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
                        <Route path={`/login`} component={LoginContainer}/>
                        <Route path={`/s/p/:uid`} component={AudioContainer}/>
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

}
// 映射state到props
const mapStateToProps = (state, ownProps) => {
    return {
        common: state.app.common
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
