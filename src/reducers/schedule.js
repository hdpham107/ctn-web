import _ from 'lodash';
import { store } from '../store';

import {
  scheduleConstants,
} from '../_constants';

const defaultState = {};

export default (state = defaultState, action) => {
  switch (action.type) {
    case scheduleConstants.LOAD_SCHEDULE:
      return {
        ...state,
        data: action.payload,
      }
    case scheduleConstants.ADD_SCHEDULE:
      return {
        ...state,
        data: [action.payload, ..._.get(state, 'data')],
      }
    default:
      return state;
  }
};
