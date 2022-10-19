import _ from 'lodash';
import React from 'react';
import { Avatar, Badge } from 'antd';
import {
  getColor,
  getFirstVisitorCharacter
} from '../../_helpers'

const STATUS = {
  0: 'default',
  1: 'success',
  2: 'warning'
}
function _getBadgeStatus(visitor) {
  if (_.isNil(visitor.status)) {
    return visitor.online ? 'success' : 'default';
  }
  return STATUS[visitor.status] || 'default';
}

class VisitorAvatar extends React.Component {
  render() {
    let { size, visitor, className } = this.props;
    if (!visitor) {
      return <div></div>;
    }
    let realSize = size || 20;
    return (
      <Badge status={_getBadgeStatus(visitor)} offset={[-3, realSize - 4]} className={className || ""}>
        {this.renderAvatar()}
      </Badge>
    );
  }


  renderAvatar() {
    let { visitor, size, visitors } = this.props;
    let realSize = size || 20;
    if (!_.isEmpty(visitors)) {
      return _.map(visitors, visitor => {
        if (!visitor) {
          return;
        }
        let profilePicture = visitor.profilePicture;
        let firstVisitorName = _.toUpper(getFirstVisitorCharacter(visitor));
        if (!_.isNil(profilePicture)) {
          return (
            <Avatar
              key={visitor._id}
              src={profilePicture}
              size={realSize}>{firstVisitorName}
            </Avatar>
          )
        }
        return (
          <Avatar
            style={{ backgroundColor: getColor(firstVisitorName) }}
            size={size || 20}>{firstVisitorName}
          </Avatar>
        )
      })
    }
    let firstVisitorName = _.toUpper(getFirstVisitorCharacter(visitor));
    let profilePicture = visitor.profilePicture;
    if (profilePicture) {
      return (
        <Avatar
          src={profilePicture}
          size={realSize}>{firstVisitorName}
        </Avatar>
      )
    }
    return (
      <Avatar
        style={{ backgroundColor: getColor(firstVisitorName) }}
        size={size || 20}>{firstVisitorName}
      </Avatar>
    )
  }
}

export default VisitorAvatar;
