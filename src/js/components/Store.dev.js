import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';

import createLogger from 'redux-logger';
import {routerReducer} from 'react-router-redux';
import reducer from '../../js/reducers';

// 合并App和react-router的reducer
let combinedReducers = combineReducers(Object.assign({}, {app: reducer}, {routing: routerReducer}));
// redux调试log中间件
let loggerMiddleware = createLogger();

/**
 * 带中间件的store函数
 * @param initialState
 * @returns {*}
 */
function configStore(initialState) {
    let store = createStore(combinedReducers, initialState, compose(
        applyMiddleware(
            thunkMiddleware,
            loggerMiddleware
        ),
        // DevTools.instrument()
         window.devToolsExtension ? window.devToolsExtension() : f => f 	//chrome扩展redux调试工具
        )
    );
    return store;
}

export default configStore;
