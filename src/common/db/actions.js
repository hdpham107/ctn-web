import _ from 'lodash';

import { actionNames } from './constants';

// TODO: consider caching later

function write(tableName, items) {
  return {
    type: actionNames.DATABASE_WRITE,
    payload: {
      tableName,
      items: _.castArray(items),
    }
  };
}

function upsert(tableName, item) {
  return {
    type: actionNames.DATABASE_UPSERT,
    payload: {
      tableName,
      item,
    }
  };
}

function update(tableName, id, updates, options) {
  return {
    type: actionNames.DATABASE_UPDATE,
    payload: {
      tableName,
      id,
      updates,
      options,
    }
  };
}

function updateMany(tableName, updates, options) {
  return {
    type: actionNames.DATABASE_UPDATE_MANY,
    payload: {
      tableName,
      updates,
      options,
    }
  };
}

export {
  write,
  update,
  upsert,
  updateMany,
}

