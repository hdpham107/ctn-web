import _ from 'lodash';
import React from 'react';
import { Icon, List, Avatar } from 'antd';
import {
  getFirstCharacter,
  getColor
} from '../../_helpers'

class AvatarImage extends React.Component {
  render() {
    let { name, size, className } = this.props;
    let groupName = getFirstCharacter(name);
    return (
      <Avatar
        className={className || ""}
        style={{backgroundColor: getColor(groupName) }}
        size={ size || 20 }>{groupName}
      </Avatar>
    );
  }
}

export default AvatarImage;
