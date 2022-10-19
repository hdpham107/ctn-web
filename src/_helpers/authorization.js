import _ from 'lodash';
import { store } from '../store';

export function checkDashBoard() {
  if (_checkAccountAdmin()) {
    return true
  }
  var roleUser = store.getState().common.currentAgent.role;
  if (_.isEmpty(roleUser)) {
    return false
  }
  if (roleUser.name === 'Agent') {
    return false
  }
  return true
}

export function checkFAQs() {
  if (_checkAccountAdmin()) {
    return true
  }
  var roleUser = store.getState().common.currentAgent.role;
  if (_.isEmpty(roleUser)) {
    return false
  }
  if (roleUser.name === 'Agent') {
    return false
  }
  return true
}

export function checkCalandar() {
  if (_checkAccountAdmin()) {
    return true
  }
  var roleUser = store.getState().common.currentAgent.role;
  if (_.isEmpty(roleUser)) {
    return false
  }
  if (roleUser.name === 'Agent') {
    return false
  }
  return true
}


export function checkPermission(permissionName) {
  if (_checkAccountAdmin()) {
    return true
  }
  var roleUser = store.getState().common.currentAgent.role;
  if (_.isEmpty(roleUser)) {
    return false
  }
  return _.includes(roleUser.permissions, permissionName);
}

export function checkPeople() {
  if (_checkAccountAdmin()) {
    return true
  }
  var roleUser = store.getState().common.currentAgent.role;
  if (_.isEmpty(roleUser)) {
    return false
  }
  if (roleUser.name === 'Agent') {
    return false
  }
  return true
}

export function checkSetting() {
  if (_checkAccountAdmin()) {
    return true
  }
  var roleUser = store.getState().common.currentAgent.role;
  if (_.isEmpty(roleUser)) {
    return false
  }
  if (roleUser.name === 'Agent' || roleUser.name === 'SuperUser') {
    return false
  }
  return true
}

export function checkIntegration() {
  if (_checkAccountAdmin()) {
    return true
  }
  var roleUser = store.getState().common.currentAgent.role;
  if (_.isEmpty(roleUser)) {
    return false
  }
  if (roleUser.name === 'Agent') {
    return false
  }
  return true
}

export function checkAdmin() {
  if (_checkAccountAdmin()) {
    return true;
  }
  var roleUser = store.getState().common.currentAgent.role;
  if (!roleUser) {
    return false;
  }
  if (roleUser.name === 'Admin' || roleUser.name === 'Account Admin') {
    return true;
  }
  return false;
}

function _checkAccountAdmin() {
  const common = store.getState().common;
  if (common.currentAgent.adminId._id === common.app.ownerId) {
    return true
  }
}
