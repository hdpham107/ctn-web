import _ from 'lodash';
import appServices from '../services/app.services';
import {
  userConstants,
  integrationConstants
} from '../_constants';
import { agentServices } from '../services/agent.services';
import userServices from '../services/user.services'
import integrationServices from '../services/integration.services';

export const settingActions = {
  updateApp,
  updateAgent,
  changePassword,
  checkInstallWidget,
};

function updateApp(data) {
  return (dispatch) => {
    dispatch(request({ data }));
    return appServices.update(data).then(function (app) {
      dispatch(success({ app }));
    }).catch(function (error) {
      dispatch(failed({ data }));
    })
  }
  function request(payload) { return { type: userConstants.APP_START_UPDATE, payload } };
  function success(payload) { return { type: userConstants.APP_UPDATED, payload } }
  function failed(payload) { return { type: userConstants.APP_UPDATED_FAILED, payload } }
}

function updateAgent(data) {
  return (dispatch) => {
    dispatch(request({ data }));
    return agentServices.update(data._id, data).then(function (updated) {
      dispatch(success({ updated }));
    }).catch(function (error) {
      dispatch(failed({ data }));
    })
  }
  function request(payload) { return { type: userConstants.PROFILE_UPDATE_START, payload } };
  function success(payload) { return { type: userConstants.PROFILE_UPDATE, payload } }
  function failed(payload) { return { type: userConstants.PROFILE_UPDATE_FAILED, payload } }
}

function changePassword(data, cb) {
  return (dispatch) => {
    dispatch(request({}));
    return userServices.changePassword(data).then(function () {
      dispatch(success({}));
      if (cb) {
        cb()
      }
    }).catch(function (error) {
      dispatch(failed({
        error: _.get(error, 'response.body')
      }));
      if (cb) {
        cb(_.get(error, 'response.body'))
      }
    })
  }
  function request(payload) { return { type: userConstants.CHANGE_PASSWORD_SENDING, payload } };
  function success(payload) { return { type: userConstants.CHANGE_PASSWORD_SUCCESS, payload } }
  function failed(payload) { return { type: userConstants.CHANGE_PASSWORD_FAILED, payload } }
}

function checkInstallWidget() {
  return (dispatch) => {
    dispatch(loading({}));
    return integrationServices.checkInstallWidget().then((result) => {
      dispatch(success(result));
    }).catch(() => {
      dispatch(fail());
    })
  }
  function loading() { return { type: integrationConstants.CHECKING_INSTALL_WIDGET } }
  function success(payload) { return { type: integrationConstants.CHECK_INSTALL_WIDGET_SUCCESS, payload } }
  function fail() { return { type: integrationConstants.CHECK_INSTALL_WIDGET_FAIL } }
}