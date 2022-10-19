import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { promiseMiddleware, localStorageMiddleware, ioMiddleware } from './middleware';
import reducer from './reducer';

import { routerMiddleware } from 'react-router-redux'
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

// Build the middleware for intercepting and dispatching navigation actions
const myRouterMiddleware = routerMiddleware(history);

const getMiddleware = () => {
  if (process.env.NODE_ENV === 'production') {
    return applyMiddleware(myRouterMiddleware, thunk, promiseMiddleware, localStorageMiddleware, ioMiddleware);
  } else {
    // Enable additional logging in non-production environments.
    return applyMiddleware(myRouterMiddleware, thunk, promiseMiddleware, localStorageMiddleware, ioMiddleware, createLogger())
  }
};

const composeEnhancers = composeWithDevTools({
  name: 'OC App',
  realtime: true,
  trace: true,
  traceLimit: 20,
});

export const store = createStore(
  reducer, composeEnhancers(getMiddleware()));
