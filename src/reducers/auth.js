import _ from 'lodash';
import {
  LOGIN,
  REGISTER,
  LOGIN_PAGE_UNLOADED,
  REGISTER_PAGE_UNLOADED,
  ASYNC_START,
  UPDATE_FIELD_AUTH
} from '../constants/actionTypes';
import {
  userConstants
} from '../_constants'

export default (state = {}, action) => {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        ...state,
        inProgress: true,
        error: null,
      }
    case userConstants.LOGIN_SUCCESS:
      return {
        ...state,
        inProgress: false,
        error: null,
      }
    case userConstants.LOGIN_FAILURE:
      return {
        ...state,
        inProgress: false,
        error: _.get(action, 'payload.error')
      }
    case LOGIN:
    case REGISTER:
      return {
        ...state,
        inProgress: false,
        error: action.error ? action.payload.errors : null
      };
    case userConstants.REGISTER_REQUEST:
      return {
        ...state,
        error: null,
        inProgress: true,
      }
    case userConstants.REGISTER_FAILURE:
      return {
        ...state,
        error: _.get(action, 'payload.error'),
        inProgress: false,
      }
    case LOGIN_PAGE_UNLOADED:
    case REGISTER_PAGE_UNLOADED:
      return {};
    case ASYNC_START:
      if (action.subtype === LOGIN || action.subtype === REGISTER) {
        return { ...state, inProgress: true };
      }
      break;
    case UPDATE_FIELD_AUTH:
      return { ...state, [action.key]: action.value };
    case userConstants.FORGOT_PASSWORD_REQUESTED:
      return { ...state, forgotPwEmail: action.payload.email }
    case userConstants.FORGOT_PASSWORD_VALIDATE_TOKEN_FAILED:
      return {
        ...state,
        resetPwToken: {
          token: action.payload.token,
          isValid: false
        }
      }
    case userConstants.FORGOT_PASSWORD_VALIDATE_TOKEN_SUCCESS:
      return {
        ...state,
        resetPwToken: {
          token: action.payload.token,
          isValid: true
        }
      }
    default:
      return state;
  }

  return state;
};
