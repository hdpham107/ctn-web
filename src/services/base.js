import _ from 'lodash';
import config from '../config';
import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';
import { store } from '../_helpers';
import {
  ASYNC_START,
  ASYNC_END
} from '../constants/actionTypes'

const superagent = superagentPromise(_superagent, global.Promise);
const API_ROOT = config.API_ROOT;

const responseBody = res => res.body;

let token = null;
let app = null;
const loadingPlugin = req => {
  store.dispatch({
    type: ASYNC_START,
  })
  req.on('response', function (res) {
    store.dispatch({
      type: ASYNC_END,
    })
  });
}
const tokenPlugin = req => {
  if (token) {
    req.set('Authorization', `Bearer ${token}`);
  }
  if (_.find(req._query, q => _.includes(q, 'appId='))) {
    return;
  }
  if (app) {
    req.query({
      appId: app._id
    });
  }
}
var unauthorizedRedirect = function(req) {
  req.on('response', function (res) {
    if (res.status === 401) {
      console.dir('redirects')
    }
  });
};
var _getPath = function(url, root = API_ROOT) {
  if (url && (url.indexOf('http://') === 0 || url.indexOf('https://') === 0 )) {
    return url;
  }
  return `${root}${url}`;
}

const requests = {
  del: url =>
    superagent.del(`${API_ROOT}${url}`)
      .use(loadingPlugin)
      .use(tokenPlugin)
      .use(unauthorizedRedirect)
      .then(responseBody),
  get: (url, params={}) =>
    superagent.get(`${API_ROOT}${url}`, params)
      .use(tokenPlugin)
      .use(loadingPlugin)
      .use(unauthorizedRedirect)
      .then(responseBody),
  put: (url, body) =>
    superagent.put(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .use(loadingPlugin)
      .use(unauthorizedRedirect)
      .then(responseBody),
  post: (url, body, config) =>
    superagent.post(_getPath(url), body)
      .use(tokenPlugin)
      .use(loadingPlugin)
      .on('progress', function(e) {
        if (config && config.onProgress) {
          config.onProgress({
            percent: e.percent,
          })
        }
      })
      .use(unauthorizedRedirect)
      .then(responseBody),
  patch: (url, body) =>
    superagent.patch(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .use(loadingPlugin)
      .use(unauthorizedRedirect)
      .then(responseBody)
};

function getRequests(root) {
  return {
    del: url =>
      superagent.del(`${root}${url}`)
        .use(loadingPlugin)
        .use(tokenPlugin)
        .use(unauthorizedRedirect)
        .then(responseBody),
    get: (url, params={}) =>
      superagent.get(`${root}${url}`, params)
        .use(tokenPlugin)
        .use(loadingPlugin)
        .use(unauthorizedRedirect)
        .then(responseBody),
    put: (url, body) =>
      superagent.put(`${root}${url}`, body)
        .use(tokenPlugin)
        .use(loadingPlugin)
        .use(unauthorizedRedirect)
        .then(responseBody),
    post: (url, body, config) =>
      superagent.post(_getPath(url, root), body)
        .use(tokenPlugin)
        .use(loadingPlugin)
        .on('progress', function(e) {
          if (config && config.onProgress) {
            config.onProgress({
              percent: e.percent,
            })
          }
        })
        .use(unauthorizedRedirect)
        .then(responseBody),
    patch: (url, body) =>
      superagent.patch(`${root}${url}`, body)
        .use(tokenPlugin)
        .use(loadingPlugin)
        .use(unauthorizedRedirect)
        .then(responseBody)
  };
}

const setToken = (_token) => {
  token = _token;
}
const getToken = () => {
  return token;
}
const setApp = (_app) => {
  app = _app;
}
const getApp = () => {
  return app;
}

export default {
  requests,
  getRequests,
  setToken,
  getToken,
  setApp,
  getApp,
}
