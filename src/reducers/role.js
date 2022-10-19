import _ from 'lodash';
import {
  userConstants
} from '../_constants';

export default (state = {}, action) => {
  switch (action.type) {
    case userConstants.ROLES_LOADED:
      return {
        ...state,
        roles: action.payload.roles
      }
    default:
      return state;
  }
};
