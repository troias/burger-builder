import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import createSagaMiddleware from 'redux-saga' 
import { watchAuth, watchBurgerBuilder, watchOrders } from './store/sagas/index'

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducer from "./store/reducer/burderBuilder";
import order from './store/reducer/order'
import auth from './store/reducer/auth'
import ReduxThunk from 'redux-thunk';

const rootReducer = combineReducers({
  ing: reducer,
  order: order,
  auth: auth
});

const sagaMiddleware = createSagaMiddleware()

const composeEnchancer = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose 

const store = createStore(
  rootReducer, composeEnchancer(applyMiddleware(ReduxThunk, sagaMiddleware))

);

sagaMiddleware.run(watchAuth)
sagaMiddleware.run(watchBurgerBuilder)
sagaMiddleware.run(watchOrders)

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
