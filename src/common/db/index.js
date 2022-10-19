import reducer from './reducer';
import { tableNames, actionNames } from './constants';
import { upsert, write, update, updateMany } from './actions';
import { getAll, find, getTable, get, getMany, query } from './core';

export default {
  reducer,
  tableNames,
  actionNames,
  write,
  update,
  updateMany,
  upsert,
  getTable,
  find,
  getAll,
  get,
  getMany,
  query,
};
