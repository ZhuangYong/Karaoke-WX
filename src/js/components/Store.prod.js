import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { routerReducer } from 'react-router-redux';

import reducer from '../../js/reducers';

// 合并App和react-router的reducer
var combinedReducers = combineReducers(Object.assign({}, {app: reducer}, {routing: routerReducer}));
// 带中间件的store函数
function configStore (initialState) {
	var store = createStore(combinedReducers, initialState, compose(
			applyMiddleware(
				thunkMiddleware
			)
		)
	);
	return store;
}

export default configStore;
