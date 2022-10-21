import _ from 'lodash';
import base from './base';

const RegisterResultService = {
  loadSchedule() {
    return base.requests.get('board/schedule');
  },
  loadScheduleByCode(code) {
    return base.requests.get(`board/schedule-by-code?code=${code}`);
  },
  addSchedule(data) {
    return base.requests.post('board/schedule', data);
  },
  checkCode(code) {
    return base.requests.get(`board/schedule/check-code?code=${code}`);
  }
};


export default RegisterResultService;
