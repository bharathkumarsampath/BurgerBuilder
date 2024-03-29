import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import { createStore , applyMiddleware , compose , combineReducers} from 'redux'
import burgerBuilderReducer from './store/reducers/burgerBuilder'
import authReducer from './store/reducers/auth'
import orderReducer from './store/reducers/orders'
import thunk from 'redux-thunk'

const logger = store => {
  return next => {
    return action => {
       console.log("[Middleware]",action);
       const result = next(action);
       console.log(result);
       return result;
    }
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  order:orderReducer,
  auth:authReducer
})

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, thunk)));
const app = (
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
      <App />
    </React.StrictMode>
    </BrowserRouter>
  </Provider>
)
ReactDOM.render(
  app,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
