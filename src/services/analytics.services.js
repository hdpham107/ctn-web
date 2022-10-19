import _ from "lodash";
import _superagent from 'superagent';
import superagentPromise from 'superagent-promise';

import config from '../config';
import base from "./base";

const superagent = superagentPromise(_superagent, global.Promise);
const API_ROOT = config.API_ROOT;

function reportError(data) {
  return null;
  return superagent.post(`${API_ROOT}user/ui-error`, {
    ...data,
    appId: _.get(base.getApp(), '_id'),
  }).end();
}

export default {
  reportError,
};
