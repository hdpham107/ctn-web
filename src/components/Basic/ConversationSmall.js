import _ from 'lodash';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import {
  Icon,
  Avatar,
} from 'antd';

class ConversationSmall extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { data } = this.props;
    let status = data.status === 'open' ? 'Đang mở' : 'Đã đóng';
    return (
      <div
        className="ant-list-item-meta-content visitor-conversation-history conversation-small"
        onClick={this.props.onClick}>
        <Avatar>
          <Icon type="user" />
        </Avatar>
        <div className='conversation-content' >
          <h4 className="ant-list-item-meta-title">{status} </h4>
          { !_.isEmpty(_.get(data.lastMessage, 'blocks')) && (
            <span className='ellipsis'>
              {data.lastMessage.blocks[0].contentType === 'image' ? 'Image message' : _.get(data.lastMessage, 'blocks[0].content')}
            </span>
          ) }
        </div>
        <Moment className='conversation-time-ago' fromNow>{_.get(data.lastMessage, 'createdAt') }</Moment>
      </div>
    );
  }
}

export default ConversationSmall;
