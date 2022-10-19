import _ from 'lodash';
import React from 'react';
import { Avatar } from 'antd';
import {
  getColor ,
  agentHelpers
} from '../../_helpers'

class AgentAvatar extends React.Component {

  onAvatarError(ev) {
    return true;
  }

  render() {
    let { agent, size, className, color } = this.props;
    if (!agent) {
      return null;
    }
    let name = agentHelpers.getAvatarCharacters(agent);
    if (agent.profilePicture) {
      return <Avatar
        className={className || "agent-avatar"}
        src={agent.profilePicture}
        icon='user'
        size={ size || 20 }
        onError={this.onAvatarError.bind(this)}>
      </Avatar>
    }
    return (
      <Avatar
        className={className || "agent-avatar"}
        style={{backgroundColor: color || getColor(name) }}
        size={ size || 20 }>{name}
      </Avatar>
    );
  }
}

export default AgentAvatar;
