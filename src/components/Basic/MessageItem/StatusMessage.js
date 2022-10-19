import React from 'react';
import _ from 'lodash';
import { Icon } from 'antd';
import Moment from 'react-moment';
import moment from 'moment';

export default function StatusMessage(message) {
  if (message.status === 'sending') {
    return <time className='message-time'>Đang gửi...</time>
  }
  if (message.status === 'failed') {
    return <span className='message-time failed'>
      <span>Gửi lỗi</span>&nbsp;
      <Icon type="exclamation-circle" />
    </span>;
  }
  return moment().diff(moment(message.timestamps || message.createdAt), 'hours') <= 1
    ? <Moment className='message-time time-ago' fromNow>{message.timestamps || message.createdAt}</Moment>
    : <Moment className='message-time' format='hh:mma'>{message.timestamps || message.createdAt}</Moment>
}