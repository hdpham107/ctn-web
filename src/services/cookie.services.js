import _ from 'lodash';
import Cookies from 'js-cookie';

const cookieAttrs = {
  path: '/',
  domain: _getDomain(),
  expires: 3650
};

const keys = {
  abTesting: 'oc_abTesting'
}

export default {
  setAbTesting,
}

function _getDomain() {
  var matched = document.domain.match(/[^\.]*\.[^.]*$/);
  return matched ? matched[0] : document.domain;
}

function setAbTesting(app) {
  try {
    if (!app || !app._id) {
      return;
    }
    if (app.abTesting) {
      Cookies.set(keys.abTesting, app.abTesting, cookieAttrs);
    } else {
      Cookies.set(keys.abTesting, '', cookieAttrs);
    }
  } catch (error) {
    console.log('OC: ab-testing-error', error);
  }
}

