import _ from 'lodash';

import base from './services/base';
import {
  ASYNC_START,
  ASYNC_END,
} from './constants/actionTypes';
// import { ioServices } from './services/io.services';
import {
  userConstants,
  appConstants,
} from './_constants';
import Cookies from 'js-cookie';

const TOKEN_KEY = 'authToken';
const cookieAttrs = {
  path: '/',
  domain: _getDomain(),
  expires: 3650
};

function _getDomain() {
  var matched = document.domain.match(/[^\.]*\.[^.]*$/);
  return matched ? matched[0] : document.domain;
}

const promiseMiddleware = store => next => action => {
  if (isPromise(action.payload)) {
    store.dispatch({ type: ASYNC_START, subtype: action.type });

    const currentView = store.getState().viewChangeCounter;
    const skipTracking = action.skipTracking;

    action.payload.then(
      res => {
        const currentState = store.getState()
        if (!skipTracking && currentState.viewChangeCounter !== currentView) {
          return
        }
        action.payload = res;
        store.dispatch({ type: ASYNC_END, promise: action.payload });
        store.dispatch(action);
      },
      error => {
        const currentState = store.getState()
        if (!skipTracking && currentState.viewChangeCounter !== currentView) {
          return
        }
        action.error = true;
        action.payload = _.get(error, 'response.body');
        if (!action.skipTracking) {
          store.dispatch({ type: ASYNC_END, promise: action.payload });
        }
        store.dispatch(action);
      }
    );
    return;
  }
  next(action);
};

const localStorageMiddleware = store => next => action => {
  if (action.type === userConstants.REGISTER_SUCCESS
    || action.type === userConstants.LOGIN_SUCCESS) {
    const token = _.get(action, 'payload.token');
    if (token) {
      Cookies.set(TOKEN_KEY, token, cookieAttrs)
      base.setToken(action.payload.token);
    }
  } else if (action.type === userConstants.LOGOUT) {
    base.setToken(null);
    Cookies.remove(TOKEN_KEY, cookieAttrs);
  } else if (action.type === appConstants.APP_LOAD || action.type === appConstants.APP_CHOOSED) {
    base.setApp(action.payload.app);
  }
  next(action);
};

const ioMiddleware = store => next => action => {
  switch(action.type) {
    case userConstants.REGISTER_SUCCESS:
    case userConstants.LOGIN_SUCCESS:
    case appConstants.APP_LOAD:
      // ioServices.init();
      break;
    case userConstants.LOGOUT:
      break;
  }
  next(action);
};

function isPromise(v) {
  return v && typeof v.then === 'function';
}


export { promiseMiddleware, localStorageMiddleware, ioMiddleware }
