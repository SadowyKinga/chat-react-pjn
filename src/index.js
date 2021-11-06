import React from "react";
import ReactDOM from "react-dom";
import './index.css';
import "antd/dist/antd.css";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './firebase'
import App from "./app/common/components/app/app";

import Reducer from './_reducers';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import { BrowserRouter } from "react-router-dom";

import * as serviceWorker from "./serviceWorker";
const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);

const url = new URLSearchParams(window.location.search);
document.documentElement.style.setProperty('--primary', url.get("primary"))
document.documentElement.style.setProperty('--user', url.get("secondary"))

ReactDOM.render(
  <Provider
    store={createStoreWithMiddleware(
      Reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
    )}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  ,
  document.getElementById("root"),

);

serviceWorker.unregister();
