import _ from 'lodash';
import { userConstants } from '../_constants';
import { appActions } from './app.actions';
import { history, store } from '../_helpers';
import authenticationService from '../services/authentication';
import userService from '../services/user.services';
// import { ioServices } from '../services/io.services';

export const userActions = {
  login,
  loginGoogle,
  register,
  loadListReply,
  agentOnline,
  agentOffline,
  onUserLogout,
  signUpPhone,
  emitToSocket,
  forgotPassword,
  validateResetPwToken,
  resetPassword,
  openLogin,
};


function onUserLogout(redirectUrl) {
  return (dispatch) => {
    // ioServices.disconnect();
    dispatch({ type: userConstants.LOGOUT, payload: { redirectUrl } });
    appActions.load()(dispatch);
    if (window.OnCustomer && typeof window.OnCustomer.init === 'function') {
      window.OnCustomer.init();
    }
  }
}

function loginGoogle(googleData, options) {
  return (dispatch) => {
    authenticationService.loginGoogle(googleData).then(user => {
      if (_.has(user, 'error')) {
        dispatch(failure(user.error));
        return;
      }
      dispatch(success({ token: user.token, options }));
      appActions.load(_.get(options, 'fromLocation'))(dispatch);
    }, (error) => {
      dispatch(failure(error));
    });
  };
  function success(payload) { return { type: userConstants.LOGIN_SUCCESS, payload } }
  function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function login(email, password, options) {
  return (dispatch) => {
    dispatch(request({ email, password }));
    authenticationService.login(email, password).then(user => {
      dispatch(success({ token: user.token, options }));
      appActions.load(_.get(options, 'fromLocation'))(dispatch);
    }, (error) => {
      dispatch(failure({
        error: _.get(error, 'response.body')
      }));
    });
  };

  function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
  function success(payload) { return { type: userConstants.LOGIN_SUCCESS, payload } }
  function failure(payload) { return { type: userConstants.LOGIN_FAILURE, payload } }
}

function openLogin(dispatch) {
  return (type) => {
    dispatch({ type: userConstants.OPEN_LOGIN, payload: type });
  };

}
function register(user) {
  return (dispatch) => {
    dispatch(request(user));
    authenticationService.register(user).then(tokenObject => {
      if (_.has(tokenObject, 'error')) {
        dispatch(failure(tokenObject.error));
        return;
      }
      dispatch(success(tokenObject));
      appActions.load()(dispatch);
    }, (error) => {
      dispatch(failure({
        error: _.get(error, 'response.body')
      }));
    });
  };


  function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
  function success(payload) { return { type: userConstants.REGISTER_SUCCESS, payload } }
  function failure(payload) { return { type: userConstants.REGISTER_FAILURE, payload } }
}

function loadListReply() {
  return (dispatch) => {
    userService.getListReply().then(data => {
      dispatch(success(data));
    })
  };

  function success(payload) { return { type: userConstants.LOADED_REPLY_LIST, payload } }
}

function agentOnline(data) {
  return (dispatch) => {
    dispatch(success(data));
  };
  function success(payload) { return { type: userConstants.AGENT_ONLINE, payload } }
}


function agentOffline(data) {
  return (dispatch) => {
    dispatch(success(data));
  };
  function success(payload) { return { type: userConstants.AGENT_OFFLINE, payload } }
}

function signUpPhone(phoneNumber) {
  return dispatch => {
    userService.signUpPhone(phoneNumber).then(data => {
      dispatch(success(data));
      setTimeout(function () {
        dispatch(redirect({
          redirectTo: '/',
        }));
      }, 2000);
    })
  }
  function success(payload) { return { type: userConstants.SIGNUP_PHONE_SUCCESS, payload } }
  function redirect(payload) { return { type: userConstants.REDIRECT_TO, payload } }
}

function emitToSocket(data) {
  // ioServices.sendToServer(data.eventName, data)
}

function forgotPassword(email) {
  return dispatch => {
    return userService.forgotPassword(email).then(() => {
      dispatch(success({ email }));
    });
  }

  function success(payload) { return { type: userConstants.FORGOT_PASSWORD_REQUESTED, payload } }
}

function validateResetPwToken(token) {
  return dispatch => {
    return userService.validateResetPwToken(token).then(() => {
      dispatch(success({ token }));
    }).catch(() => {
      throw dispatch(failed({ token }));
    });
  }

  function success(payload) { return { type: userConstants.FORGOT_PASSWORD_VALIDATE_TOKEN_SUCCESS, payload } }
  function failed(payload) { return { type: userConstants.FORGOT_PASSWORD_VALIDATE_TOKEN_FAILED, payload } }
}

function resetPassword(data) {
  return dispatch => {
    return userService.resetPassword(data);
  }
}
