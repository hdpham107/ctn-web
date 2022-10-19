import React from 'react';
import _ from 'lodash';
import { Tooltip } from 'antd';
import moment from 'moment';

export default function ReciveStatusMessage(message) {
  if (message.status) {
    return null;
  }
  if (message.readByUser) {
    return <Tooltip title={'Đã đọc lúc ' + moment(message.readByUserAt).format('HH:mm DD/MM/YYYY')}
      placement='topRight'>
      <div className='sent-icon'></div>
    </Tooltip>
  }
  return <Tooltip title={'Đã gửi lúc ' + moment(message.createdAt).format('HH:mm DD/MM/YYYY')}
    placement='topRight'>
    <div className='sent-icon sending'></div>
  </Tooltip>
}