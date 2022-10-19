import auth from './reducers/auth';
import { combineReducers } from 'redux';
import common from './reducers/common';
import role from './reducers/role';
import apiToken from './reducers/api-token';
import settings from './reducers/settings';
import schedules from './reducers/schedule';
import { userConstants } from './_constants';
import { routerReducer } from 'react-router-redux';
import db from './common/db';
const _rootReducer = combineReducers({
  role,
  auth,
  common,
  router: routerReducer,
  db: db.reducer,
  apiToken,
  settings,
  schedules,
});

export default (state = {}, action) => {
  switch (action.type) {
    case userConstants.LOGOUT:
      return _rootReducer(undefined, action);
    default:
      return _rootReducer(state, action);
  }
}
