import _ from 'lodash';
import { APP_LOAD } from '../constants/actionTypes';
import {
  userConstants,
  appConstants,
  inboxConstants
} from '../_constants';
import authenticationService from '../services/authentication';
import cookieServices from '../services/cookie.services';
import userServices from '../services/user.services';
import appServices from '../services/app.services';
import { store } from '../_helpers';

import {
  userActions,
} from '../_actions';
export const appActions = {
  load,
  customizeApp,
  changeViewInfoVisitor,
  getGroupNameMappings,
};
const regexPathname = new RegExp("\/app\/([^/]*)\/([^/]*)$");

function load(redirectToUrl, toNewApp) {
  return (dispatch) => {
    authenticationService.init();
    var token = authenticationService.getToken();
    if (!token) {
      return dispatch(success({}));
    }
    return userServices.current().then(function (user) {
      let theAgent;
      let theApp;
      var agents = user.agents;

      var pathname = _.get(store.getState(), 'router.location.pathname');
      // get appId from url
      if (regexPathname.exec(pathname)) {
        var id = regexPathname.exec(pathname)[1];
        var agent = _.find(agents, agent => {
          return _.get(agent, 'appId._id') === id;
        })
        if (agent) {
          theAgent = agent;
          theApp = agent.appId;
        }
      } else {
        if (toNewApp) {
          // the last agent should be the one just created, and he gets here from the invitation flow.
          // We should redirect him to his new app immediately
          var newAgent = _.last(agents);
          localStorage.setItem('preferAppId', newAgent.appId._id);
        }
        // get appId from local storage
        const preferAppId = localStorage.getItem('preferAppId');
        if (preferAppId) {
          theAgent = _.find(user.agents, item => _.get(item, 'appId._id') === preferAppId);
          if (theAgent) {
            theApp = theAgent.appId;
          }
        }
        // if couldn't choose an app, choose the first app of the first agent
        if (!theApp) {
          theApp = _.get(user, 'agents[0].appId');
          theAgent = _.get(user, 'agents[0]');
        }
      }


      // initialize
      localStorage.setItem('preferAppId', theApp._id);
      cookieServices.setAbTesting(theApp);

      return appServices.getEssentials(theApp._id)
        .then(data => {
          dispatch({
            type: 'APP_ESSENTIALS_LOADED',
            payload: { data },
          });
          console.log('theApp ', theApp)
          dispatch(success({ user, app: theApp, agent: theAgent }));

          // var phone = user.phone;
          // if (_.isEmpty(phone)) {
          //   return dispatch(redirect({
          //     redirectTo: '/sign_up_phone',
          //   }));
          // }
          if (redirectToUrl) {
            return dispatch(redirect({
              redirectTo: redirectToUrl
            }));
          }
        });
    }).catch(function (error) {
      userActions.onUserLogout('/login')(dispatch);
    })
  };
  function success(payload) { return { type: APP_LOAD, payload } }
  function redirect(payload) { return { type: userConstants.REDIRECT_TO, payload } }
}

function customizeApp(data) {
  return (dispatch) => {
    dispatch(request({ data }));
    appServices.update(data)
      .then((app) => {
        dispatch(success({ app }));
      })
      .catch(() => {
        dispatch(failed({}));
      });
  };
  function request(payload) { return { type: userConstants.APP_START_UPDATE, payload } }
  function success(payload) { return { type: userConstants.APP_UPDATED, payload } }
  function failed(payload) { return { type: userConstants.APP_UPDATED_FAILED, payload } }
}

function changeViewInfoVisitor() {
  return (dispatch) => {
    appServices.changeViewInfoVisitor({ configView: store.getState().common.app.visitorInformationConfig })
      .then(() => {
        dispatch(success())
      })
  }
  function success() { return { type: appConstants.CHANGE_SHOW_SUCCESS } }
}

function getGroupNameMappings() {
  return dispatch =>
    appServices.getGroupNameMappings()
      .then(result => {
        dispatch({ type: 'GROUP_NAME_MAPPINGS_LOADED', payload: result });
      });
}
