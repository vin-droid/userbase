import {combineReducers, createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import {user} from './reducers/user';
import {shared} from './reducers/shared';
import {routerMiddleware} from 'react-router-redux/lib';
import createHistory from 'history/createBrowserHistory';

const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const myRouterMiddleware = routerMiddleware(history);

const reducer = combineReducers({ user, shared });

const store = (() => {
	if (process.env.NODE_ENV === 'production'){
		return createStore(reducer);
	}else{
		return createStore(reducer,applyMiddleware(myRouterMiddleware, logger));
	}
})();

export default store;
