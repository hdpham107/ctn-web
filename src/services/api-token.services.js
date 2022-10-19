import _ from 'lodash';
import base from './base';

export const apiTokenServices = {
  getAll,
  generateAPIToken,
  updateAPIToken,
  remove
}

function getAll() {
  return base.requests.get('/user/app/tokens');
}


function generateAPIToken(data) {
  return base.requests.post('/user/app/token', data);
}

function updateAPIToken(data) {
  return base.requests.patch('/user/app/token', data);
}

function remove(id) {
  return base.requests.del('/user/app/token/' + id);
}