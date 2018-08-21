import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import 'bulma/css/bulma.css';
import { routes as Routes } from './routes';
import "./lib/extend-built-ins";

ReactDOM.render(
    <Provider store={store}>
        <div>
            <Routes />
        </div>
    </Provider>, document.getElementById('root'));