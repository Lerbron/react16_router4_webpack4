/**
 * Created by admin on 2017/3/3.
 */

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Provider } from'react-redux';
import { createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { ConnectedRouter } from 'react-router-redux'

// import {routes} from './routes.js';
import AppRoutes from './routes.js';
import reducers from 'reducers/index.js';
import history from 'utils/history'
import 'assets/style.css';
import "storm-react-diagrams/dist/style.min.css";

const store = createStore(reducers,applyMiddleware(thunkMiddleware));



function App() {
    return(
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    )
}

ReactDOM.render(<App/>,document.getElementById('app'));