import _ from 'lodash';
import {
  userConstants
} from '../_constants';

export default (state = {}, action) => {
  switch (action.type) {
    case userConstants.APP_TOKENS_LOADED:
      return {
        ...state,
        tokens: action.payload.tokens
      };

    case userConstants.APP_TOKEN_UPDATING:
    case userConstants.APP_TOKEN_REMOVING:
    case userConstants.APP_TOKEN_GENERATING:
      return {
        ...state,
        status: 'loading',
      };
    case userConstants.APP_TOKEN_UPDATED_FAILED:
    case userConstants.APP_TOKEN_GENERATED_FAILED:
    case userConstants.APP_TOKEN_REMOVED_FAILED:
      return {
        ...state,
        status: 'failed',
      };
    case userConstants.APP_TOKEN_STOP_EDIT:
      return {
        ...state,
        editing: false,
      }
    case userConstants.APP_TOKEN_START_EDIT:
      return {
        ...state,
        token: action.payload,
        editing: true,
      }
    case userConstants.APP_TOKEN_GENERATED:
      return {
        ...state,
        tokens: _.concat(action.payload, state.tokens || []),
        status: 'add_success',
        editing: false,
      };
    case userConstants.APP_TOKEN_UPDATED:
      return {
        ...state,
        tokens: _.map(state.tokens || [], token => {
          if (token._id === action.payload.token._id) {
            return action.payload.token;
          }
          return token;
        }),
        status: 'update_success',
        editing: false,
      };
    case userConstants.APP_TOKEN_REMOVED:
      let tokens = state.tokens || [];
      _.remove(tokens || [], token => {
        return token._id === action.payload._id;
      })
      return {
        ...state,
        tokens: tokens,
        status: 'remove_success',
        editing: false,
      };
    default:
      return state;
  }
};
