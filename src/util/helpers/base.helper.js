import { get } from 'lodash';
import { mustLogin } from '../views/Site/Login/_loginActions';

export const bindingObjectFromArray = (objSource, data, keys) => {
  if (data instanceof Object) {
    keys.forEach((prop) => {
      if (Object.prototype.hasOwnProperty.call(data, prop)) {
        objSource[prop] = data[prop];
      }
    });
  }
  return objSource;
};
export const bindingDataIntoObject = (objSource, dataSource) => {
  if (objSource instanceof Object) {
    Object.keys(objSource).forEach((prop) => {
      if (Object.prototype.hasOwnProperty.call(dataSource, prop)) {
        objSource[prop] = dataSource[prop];
      }
    });
  }
  return objSource;
};
export const checkTokenExpired = (store, response) => {
  if (get(response, 'success', true) === false) {
    const code = get(response, ['payload', 'code'], 0);
    const message = get(response, ['payload', 'message'], '');
    if (code === 401 && message === 'Unauthorized') {
      store.dispatch(
        mustLogin(
          window.location.pathname,
          'Phiên làm việc của bạn đã hết hạn, vui lòng đăng nhập lại để sử dụng hệ thống.'
        )
      );
    }
  }
};
export const uniqBy = (a, key) => {
  const seen = new Set();
  return a.filter((item) => {
    const k = item[key];
    return seen.has(k) ? false : seen.add(k);
  });
};
export const getWidth = () => Math.max(
  document.body.scrollWidth,
  document.documentElement.scrollWidth,
  document.body.offsetWidth,
  document.documentElement.offsetWidth,
  document.documentElement.clientWidth
);

export const getHeight = () => Math.max(
  document.body.scrollHeight,
  document.documentElement.scrollHeight,
  document.body.offsetHeight,
  document.documentElement.offsetHeight,
  document.documentElement.clientHeight
);
