import _ from 'lodash';
import { history } from '../_helpers';
import { store } from '../store';

import {
  APP_LOAD,
  REDIRECT,
  LOGOUT,
  ARTICLE_SUBMITTED,
  SETTINGS_SAVED,
  LOGIN,
  REGISTER,
  DELETE_ARTICLE,
  ARTICLE_PAGE_UNLOADED,
  EDITOR_PAGE_UNLOADED,
  HOME_PAGE_UNLOADED,
  PROFILE_PAGE_UNLOADED,
  SETTINGS_PAGE_UNLOADED,
  LOGIN_PAGE_UNLOADED,
} from '../constants/actionTypes';
import {
  userConstants,
  appConstants,
} from '../_constants';
import { agentActions } from '../_actions';

const defaultState = {
  token: null,
  viewChangeCounter: 0
};


export default (state = defaultState, action) => {
  switch (action.type) {
    case userConstants.APP_START_UPDATE:
      const app = {
        ...state.app,
        ...action.payload.data
      }
      return {
        ...state,
        app
      }
    case userConstants.APP_UPDATED:
      return {
        ...state,
        app: action.payload.app
      }
    case userConstants.CHOOSE_APP:
      return {
        ...state,
        agents: action.payload.agents,
        user: action.payload.user,
        redirectTo: '/choose-app'
      }
    case appConstants.CHANGE_PAGE:
      return {
        ...state,
        title: action.payload.title,
        beta: action.payload.beta,
        currentPage: action.payload.currentPage || state.currentPage,
        back: action.payload.back,
      }
    // TODO: temporary hack. Fix this by moving all data out of page's state
    case 'LEAVE_PAGE':
      return {
        ...state,
        currentPage: state.currentPage === action.payload.currentPage ? '' : state.currentPage,
      }
    case userConstants.PROFILE_UPDATE:
      return {
        ...state,
        currentAgent: _.assign({}, state.currentAgent, action.payload.updated),
      }
    case appConstants.APP_CHOOSED:
      return {
        ...state,
        appLoaded: true,
        currentAgent: action.payload.agent,
        currentUser: action.payload.user,
        app: action.payload.app,
        redirectTo: '/',
      }
    case APP_LOAD:
      var newState = {
        ...state,
        appLoaded: true,
      };
      if (action.payload && action.payload.agent) {
        newState.currentAgent = action.payload.agent;
      }
      if (action.payload && action.payload.user) {
        newState.currentUser = action.payload.user;
      }
      if (action.payload && action.payload.app) {
        newState.app = action.payload.app;
        // var location = '/app/' + action.payload.app._id + '/inbox'
        // if (history.location && history.location.pathname) {
        //   location = history.location.pathname;
        // }
        // newState.redirectTo = '/';
      }
      return newState;
    case 'USER_INFO_CHANGE_FIELD_VISIBILITY':
      const currentFieldConfig = _.find(state.app.visitorInformationConfig, fieldConfig =>
        fieldConfig.field === action.payload.field,
      );
      let newConfig;
      if (!currentFieldConfig) {
        newConfig = [
          ...state.app.visitorInformationConfig,
          { field: action.payload.field, active: action.payload.visibility }
        ];
      } else if (currentFieldConfig.active === action.payload.visibility) {
        return state;
      } else {
        newConfig = [
          ..._.reject(state.app.visitorInformationConfig, currentFieldConfig),
          { field: action.payload.field, active: action.payload.visibility }
        ];
      }
      return {
        ...state,
        app: {
          ...state.app,
          visitorInformationConfig: newConfig,
        }
      }
    case REDIRECT:
      return { ...state, redirectTo: null };
    case userConstants.REDIRECT_TO:
      return { ...state, redirectTo: action.payload.redirectTo };
    case userConstants.LOGOUT:
      const url = action.payload.redirectUrl || '/login';
      return { redirectTo: url, token: null, currentUser: null };
    case ARTICLE_SUBMITTED:
      const redirectUrl = `/article/${action.payload.article.slug}`;
      return { ...state, redirectTo: redirectUrl };
    case SETTINGS_SAVED:
      return {
        ...state,
        redirectTo: action.error ? null : '/',
        currentUser: action.error ? null : action.payload.user
      };
    case LOGIN:
    case REGISTER:
    case userConstants.REGISTER_SUCCESS:
    case userConstants.LOGIN_SUCCESS:
      return {
        ...state,
        redirectTo: action.error ? null : _.get(action.payload.options, 'fromLocation', '/'),
        token: action.error ? null : _.get(action, 'payload.token'),
        currentUser: action.error ? null : _.get(action, 'payload.user')
      };
    case DELETE_ARTICLE:
      return { ...state, redirectTo: '/' };
    case ARTICLE_PAGE_UNLOADED:
    case EDITOR_PAGE_UNLOADED:
    case HOME_PAGE_UNLOADED:
    case PROFILE_PAGE_UNLOADED:
    case SETTINGS_PAGE_UNLOADED:
    case LOGIN_PAGE_UNLOADED:
    case 'GROUP_NAME_MAPPINGS_LOADED':
      return {
        ...state,
        groupNameMappings: action.payload,
      };
    case userConstants.OPEN_LOGIN:
      return {
        ...state,
        isLogin: action.payload ==='isLogin' ? true : false,
      };
    default:
      return state;
  }
};
