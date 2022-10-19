import _ from 'lodash';
import { createCachedSelector, LruObjectCache } from 're-reselect';

import { tableNames } from './constants';

const findSelector = createCachedSelector(
  getTable,
  (state, _, criteria) => criteria,
  query,
)({
  keySelector: (_, tableName) => tableName,
  cacheObject: new LruObjectCache({ cacheSize: 3 }),
});

const emptyObject = {};

function write(db, tableName, items) {
  return {
    ...db,
    [tableName]: {
      ...db[tableName],
      byId: Object.assign({}, db[tableName].byId || {}, _.keyBy(items, '_id')),
    }
  };
}

function upsert(db, tableName, item) {
  const foundItem = _.get(db, [tableName, 'byId', item._id]);

  return {
    ...db,
    [tableName]: {
      ...db[tableName],
      byId: {
        ...db[tableName].byId,
        [item._id]: { ...foundItem, ...item }
      }
    }
  };
}

function updateMany(db, tableName, data = [], options = {}) {
  const idKey = options.idKey || '_id';
  let doUpdate = {
    ...db[tableName].byId
  };
  _.forEach(data, item => {
    const dbItem = _.get(db, [tableName, 'byId', item[idKey]]);
    if (!dbItem) {
      return;
    }
    const updated = { ...dbItem, ...item };
    doUpdate = {
      ...doUpdate,
      [item[idKey]]: updated
    }
  })
  return {
    ...db,
    [tableName]: {
      ...db[tableName],
      byId: doUpdate
    }
  };
}

function update(db, tableName, id, updates, options = {}) {
  const item = _.get(db, [tableName, 'byId', id]);
  if (!item) {
    return db;
  }

  return {
    ...db,
    [tableName]: {
      ...db[tableName],
      byId: {
        ...db[tableName].byId,
        [id]: options.deepMerge ? _.merge({}, item, updates) : { ...item, ...updates },
      }
    }
  };
}

function init() {
  return _.mapValues(tableNames, tableName => ({ byId: {} }));
}

function getTable(state, tableName) {
  return state.db[tableName];
}

function get(table, id) {
  return table.byId[id];
}

function getMany(table, array) {
  return _.reduce(array, (soFar, id) => ([...soFar, table.byId[id]]), []);
}

function query(table, criteria) {
  return _.filter(table.byId, criteria);
}

function find(state, tableName, criteria) {
  return findSelector(state, tableName, criteria);
}

function getAll(state, tableName) {
  return findSelector(state, tableName, emptyObject);
}

export {
  write,
  update,
  updateMany,
  getTable,
  get,
  getMany,
  query,
  upsert,
  init,
  find,
  getAll,
}

