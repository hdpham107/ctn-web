import _ from 'lodash';
import React from 'react';
import { Avatar } from 'antd';
import { 
  groupHelpers,
  getColor
} from '../../_helpers'
  
class GroupAvatar extends React.Component {
  render() {
    let { group, size, className } = this.props;
    // let name = agentHelpers.getName(agent);
    let charater = groupHelpers.getAvatarCharacters(group);
    if (group.logo) {
      return <Avatar
        className={className || ""}
        style={{backgroundColor: getColor(charater) }}
        src={group.logo}
        size={ size || 20 }>{charater}
      </Avatar>
    }
    return (
      <Avatar
        className={className || ""}
        style={{backgroundColor: getColor(charater) }}
        size={ size || 20 }>{charater}
      </Avatar>
    );
  }
}

export default GroupAvatar;