import _ from 'lodash';
import React from 'react';
import { Avatar } from 'antd';
import {
  getColor,
  agentHelpers
} from '../../_helpers'

class AppAvatar extends React.Component {

  onAvatarError(ev) {
    return true;
  }

  render() {
    let { app, size, className, color } = this.props;
    if (!app) {
      return null;
    }
    if (app.logo) {
      return <Avatar
        className={className || "app-avatar"}
        src={app.logo}
        icon='user'
        size={size || 20}
        onError={this.onAvatarError.bind(this)}>
      </Avatar>
    }
    const name = agentHelpers.getAvatarAppCharacters(app);
    return (
      <Avatar
        className={className || "app-avatar"}
        style={{ backgroundColor: color || getColor(name) }}
        size={size || 20}>{name}
      </Avatar>
    );
  }
}

export default AppAvatar;
