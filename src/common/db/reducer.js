import _ from 'lodash';

import { actionNames } from './constants';
import { write, update, updateMany, upsert, init } from './core';

export default (state = init(), action) => {
  switch (action.type) {
    case actionNames.DATABASE_WRITE:
      return write(state, action.payload.tableName, action.payload.items);
    case actionNames.DATABASE_UPDATE:
      return update(state, action.payload.tableName, action.payload.id, action.payload.updates, action.payload.options);
    case actionNames.DATABASE_UPDATE_MANY:
      return updateMany(state, action.payload.tableName, action.payload.updates, action.payload.options);
    case actionNames.DATABASE_UPSERT:
      return upsert(state, action.payload.tableName, action.payload.item);
    default:
      return state;
  }
}

