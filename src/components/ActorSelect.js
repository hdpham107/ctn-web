import _ from 'lodash';
import fp from 'lodash/fp';
import React from 'react';
import { connect } from "react-redux";
import { Menu, Icon, Input, Dropdown, Button } from 'antd';

import {
  getFirstCharacter,
  getAgentName,
} from '../_helpers';
import AgentAvatar from './Basic/AgentAvatar';
import AvatarImage from './Photo/AvatarImage';
import { userConstants } from '../_constants';

class ActorSelect extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
    };
  }

  handleInputSearch = e => {
    if (!e) {
      return;
    }
    this.setState({
      searchTerm: e.target.value,
    });
  }

  onSelectActor = (actorType, actorId) => {
    return this.props.onSelectActor(actorType, actorId);
  }

  agentItem = agent => {
    if (agent._id === this.props.currentAgent._id) {
      return null;
    }
    const isSelected = this.props.agent && this.props.agent._id === agent._id;
    return (
      <Menu.Item
        className={'group-assign-item ' + (isSelected ? 'checked' : '')}
        style={{ listStyleType: 'none' }}
        key={agent._id}
        onClick={() => this.onSelectActor('agent', agent._id)}>
        <AgentAvatar agent={agent} size={24} />
        <span className='group-name' style={{ maxWidth: '150px', textOverflow: 'ellipsis' }}>{getAgentName(agent)}</span>
        <img className='icon-check' src='/images/icon-check.png' width={14} />
      </Menu.Item>
    );
  }

  groupItem = group => {
    const isSelected = this.props.group && this.props.group._id === group._id;
    return (
      <Menu.Item
        className={'group-assign-item ' + (isSelected ? 'checked' : '')}
        key={group._id}
        style={{ listStyleType: 'none' }}
        onClick={() => this.onSelectActor('group', group._id)}>
        <AvatarImage
          className='group-assigned'
          size={24}
          name={fp.toUpper(getFirstCharacter(group.name))} />
        <span className='group-name'>{group.name}</span>
        <img className='icon-check' src='/images/icon-check.png' width={14} />
      </Menu.Item>
    );
  }

  noneItem = () => {
    if (this.props.disableNoneItem) {
      return null;
    }
    const { searchTerm } = this.state;
    const { displayCancel, agent, group, noneItemText, isUnassgined } = this.props;
    if (searchTerm && !fp.includes(searchTerm.toLowerCase(), noneItemText ? noneItemText.toLowerCase() : 'mới')) {
      return null;
    }
    const isSelected = !group && !agent && !displayCancel || isUnassgined;
    return (
      <Menu.Item
        key={'none'}
        className={'group-assign-item ' + (isSelected ? 'checked' : '')}
        onClick={() => this.onSelectActor(displayCancel ? 'unassigned' : null, displayCancel ? 'unassigned' : null)}>
        <AgentAvatar agent={{
          name: noneItemText || 'Mới',
          profilePicture: '/images/icon-unassigned.png'
        }} size={24} />
        <span className='group-name'>{noneItemText || 'Mới'}</span>
        <img className='icon-check' src='/images/icon-check.png' width={14} />
      </Menu.Item>
    );
  }

  cancelItem = () => {
    const { searchTerm } = this.state;
    const { displayCancel, agent, group, cancelItemText, isUnassgined } = this.props;
    if (!displayCancel || searchTerm && !fp.includes(searchTerm.toLowerCase(), cancelItemText ? cancelItemText.toLowerCase() : 'Hủy')) {
      return null;
    }
    const isSelected = !group && !agent && !isUnassgined;
    return (
      <Menu.Item
        key={'cacel'}
        className={'group-assign-item ' + (isSelected ? 'checked' : '')}
        onClick={() => this.onSelectActor(null, null)}>
        <AgentAvatar agent={{
          name: cancelItemText || 'Hủy',
          profilePicture: '/images/icon-cancel.svg'
        }} size={24} />
        <span className='group-name'>{cancelItemText || 'Hủy'}</span>
        <img className='icon-check' src='/images/icon-check.png' width={14} />
      </Menu.Item>
    );
  }

  agentMatchSearchTerm = item => {
    const { searchTerm } = this.state;
    if (item.refId) {
      return false;
    }
    if (!searchTerm) {
      return true;
    }

    return fp.includes(searchTerm.toLowerCase(), getAgentName(item).toLowerCase());
  }

  groupMatchSearchTerm = item => {
    const { searchTerm } = this.state;
    if (!searchTerm) {
      return true;
    }

    return fp.includes(searchTerm.toLowerCase(), fp.toLower(item.name));
  }

  currentAgentItem = () => {
    const { searchTerm } = this.state;
    const { currentAgent } = this.props;
    if (searchTerm && !fp.includes(searchTerm.toLowerCase(), 'bạn')) {
      return null;
    }
    const isSelected = this.props.agent && this.props.agent._id === currentAgent._id;
    return (
      <Menu.Item
        key={currentAgent._id}
        className={'group-assign-item ' + (isSelected ? 'checked' : '')}
        onClick={() => this.onSelectActor('agent', currentAgent._id)}>
        <AgentAvatar agent={currentAgent} size={24} />
        <span className='group-name'>Bạn</span>
        <img className='icon-check' src='/images/icon-check.png' width={14} />
      </Menu.Item>
    );
  }

  getHolder() {
    const { group, agent, currentAgent, noneItemText, isUnassgined, displayCancel, cancelItemText } = this.props;
    if (group) {
      return (
        <Button className='group-assigned-btn' >
          <AvatarImage
            className='group-assigned'
            size={20}
            name={fp.toUpper(getFirstCharacter(group.name))} />
          <div className='group-name'>{group.name}</div>
          <Icon type="down" style={{ fontSize: 10 }} />
        </Button>
      );
    }
    if (agent) {
      const agentName = agent._id === currentAgent._id
        ? 'Bạn' : getAgentName(agent);
      return (
        <Button className='group-assigned-btn' >
          <AgentAvatar agent={agent} size={24} />
          <div className='group-name'>{agentName}</div>
          <Icon type="down" style={{ fontSize: 10 }} />
        </Button>
      );
    }
    if (isUnassgined || (!displayCancel && !agent && !group)) {
      return (
        <Button className='group-assigned-btn' >
          <img src='/images/icon-unassigned.png' width={20} style={{ marginRight: '5px' }} />
          <div className='group-name'>{noneItemText || 'Mới'}</div>
          <Icon type="down" style={{ fontSize: 10 }} />
        </Button>
      )
    }
    return (
      <Button className='group-assigned-btn' >
        <img src='/images/icon-cancel.svg' width={20} style={{ marginRight: '5px' }} />
        <div className='group-name'>{cancelItemText || 'Hủy'}</div>
        <Icon type="down" style={{ fontSize: 10 }} />
      </Button>
    )
  }

  handleRedirectAddGroup = () => {
    this.props.redirect({ redirectTo: `/app/${this.props.currentApp._id}/settings/group` });
  }

  render() {
    const { currentAgent, agents, groups } = this.props;
    const shownGroups = fp.filter(this.groupMatchSearchTerm, groups);
    const shownAgents = fp.filter(
      agent => agent.status === 'active' && this.agentMatchSearchTerm(agent) && agent._id !== currentAgent._id, agents);
    const menu = (
      <Menu className={`selection-menu smart-routing-dropdown ${_.get(this.props, 'menuClassName', '')}`}>
        <div className='selection-search'>
          <Icon type="search" />
          <Input
            autoFocus
            className="input-search-form"
            placeholder="Tìm kiếm"
            value={this.state.searchTerm}
            onChange={this.handleInputSearch} />
        </div>
        <Menu.Divider />
        {this.cancelItem()}
        {this.noneItem()}
        {this.currentAgentItem()}
        {shownAgents.length
          ? <Menu.ItemGroup key='agents' title='Nhân viên'>
            {fp.map(this.agentItem, shownAgents)}
          </Menu.ItemGroup>
          : null
        }
        <Menu.ItemGroup key='groups' title='Nhóm'>
          {fp.map(this.groupItem, shownGroups)}
          {
            !shownGroups.length
            && (
              <div className='empty-group'>
                <div>
                  <span>Chưa có nhóm</span>
                </div>
                <a className="add-button add-group" onClick={this.handleRedirectAddGroup}>
                  <Icon type='plus' />&nbsp;Tạo nhóm</a>
              </div>
            )
          }
        </Menu.ItemGroup>
      </Menu>
    );

    return (
      <Dropdown
        className='assign-popover'
        placement='topLeft'
        overlay={menu}
        trigger={['click']}
      >
        {this.props.children || this.getHolder()}
      </Dropdown>
    );
  }
}

const mapStateToProps = state => ({
  currentApp: state.common.app,
});

const mapDispatchToProps = dispatch => ({
  redirect: payload => dispatch({ type: userConstants.REDIRECT_TO, payload })
});

export default connect(mapStateToProps, mapDispatchToProps)(ActorSelect);
