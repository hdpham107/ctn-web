import base from './base';
import Cookies from 'js-cookie';

const AuthenticationService = {
  init: () => {
    const token = AuthenticationService.getToken();
    if (token) {
      base.setToken(token);
    }
  },
  getToken: () => Cookies.get('authToken'),
  login: (email, password) =>
    base.requests.post('user/auth', {
      email,
      password,
    }),

  isAuthenticated: () => {
    return !!AuthenticationService.getToken();
  },

  register: (data) => {
    var postData = _attachRegisterSources(data || {});
    return base.requests.post('user/auth/register', postData);
  },

  loginGoogle: (googleData) => {
    const postData = _attachRegisterSources({
      token: googleData.accessToken,
    });
    return base.requests.post('user/auth/google', postData);
  },
};
export default AuthenticationService;

function _attachRegisterSources(data = {}) {
  try {
    const _data = data  || {};
    const source = {};
    const utms = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content','referrals'];
    for(let i = 0; i < utms.length; i++) {
      const key = utms[i];
      const value = Cookies.get(key);
      if (value) {
        source[key] = value;
      }
    }
    _data.source = source;
    return _data;
  } catch (error) {
    return data;
  }
}