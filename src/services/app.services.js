import base from './base';
export default {
  get,
  getEssentials,
  getGroupNameMappings,
  getAgentApp,
  update,
  changeViewInfoVisitor
}
function get() {
  return base.getApp();
}

function getAgentApp() {
  return base.requests.get('user/agent/all');
}

function update(data) {
  return base.requests.post('user/app/customize', data);
}

function changeViewInfoVisitor(config) {
  return base.requests.post('user/app/customViewInfoVisitor', config)
}

function getEssentials(appId) {
  return base.requests.get('user/app-essentials', { appId });
}

function getGroupNameMappings() {
  return base.requests.get('user/group-name-mappings');
}
