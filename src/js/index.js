import React from "react";
import {render} from "react-dom";

import {Provider} from "react-redux";
import {BrowserRouter as Router} from "react-router-dom";
import {createBrowserHistory} from "history";
import {syncHistoryWithStore} from "react-router-redux";

import FastClick from "fastclick";
import injectTapEventPlugin from "react-tap-event-plugin";

import configStore from "../js/components/Store";
import * as comUtils from "./utils/comUtils";
import App from './components/App';
// promise
require('es6-promise').polyfill();

const supportsHistory = 'pushState' in window.history;
const browserHistory = createBrowserHistory({
    forceRefresh: true
});
// 部分移动端设备onClick事件300ms延时
// window.addEventListener('load', () => {
//     FastClick.attach(document.body);
// });
injectTapEventPlugin();

// HYAPP.devinfo = comUtils.chkDevice();
// 创建store
let store = configStore();

/* Configure history */
const createSelectLocationState = () => {
    let prevRoutingState, prevRoutingStateJS;
    return (state) => {
        const routingState = state['routing'];
        if (typeof prevRoutingState === 'undefined' || prevRoutingState !== routingState) {
            prevRoutingState = routingState;
            prevRoutingStateJS = routingState.toJS ? routingState.toJS() : null;
        }
        return prevRoutingState;
    };
};

// 同步browserHistory
let history = syncHistoryWithStore(browserHistory, store, {
    selectLocationState: createSelectLocationState(),
});
render(
    <Provider store={store}>
        <Router history={history}>
            <App/>
        </Router>
    </Provider>,
    document.getElementById('reactApp')
);
