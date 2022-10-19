import _ from 'lodash';
import { push } from 'react-router-redux';
import { scheduleConstants } from '../_constants';
import scheduleService from '../services/schedule.services';
export const scheduleActions = {
  loadSchedule,
  loadScheduleByCode,
  addSchedule,
  checkCode,
};


function loadSchedule(dispatch) {
  return () => {
    scheduleService.loadSchedule().then(data => {
      dispatch({ type: scheduleConstants.LOAD_SCHEDULE, payload: data });
    })
  };
}

function loadScheduleByCode(dispatch) {
  return (code) => {
    scheduleService.loadScheduleByCode(code).then(data => {
      dispatch({ type: scheduleConstants.LOAD_SCHEDULE, payload: data });
    })
  };
}

function addSchedule(dispatch) {
  return (data) => {
    return scheduleService.addSchedule(data).then(data => {
      dispatch({ type: scheduleConstants.ADD_SCHEDULE, payload: data });
    })
  };
}

function checkCode(dispatch) {
  return (code) => {
    return scheduleService.checkCode(code).then(isPass => {
      if (isPass) {
        dispatch(redirect({
          redirectTo: `/waiting-room/${code}`,
        }));
      }
      return isPass;
    })
  };

  function redirect(payload) { return { type: 'REDIRECT_TO', payload } }
}