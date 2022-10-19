import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Input, Menu, Dropdown, Icon, Button } from 'antd';

import {
  getAgentName
} from '../_helpers'
import AgentAvatar from './Basic/AgentAvatar';
import db from '../common/db';

const mapStateToProps = (state, ownProps) => {
  const agentTable = db.getTable(state, db.tableNames.agents);
  return {
    agents: db.getMany(agentTable, ownProps.agentIds),
    selectedAgent: db.get(agentTable, ownProps.selectedAgentId),
    currentAgent: state.common.currentAgent,
  };
};

class AgentSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputSearch: '',
    };

    this.agentItem = this.agentItem.bind(this);
    this.handleInputSearch = this.handleInputSearch.bind(this);
  }

  handleInputSearch(e) {
    this.setState({
      inputSearch: e.target.value
    })
  }

  agentItem(agent) {
    const { selectedAgentId } = this.props;
    return (
      <Menu.Item
        className={ 'group-assign-item ' + (agent._id === selectedAgentId ? 'checked': '' ) }
        key={ agent._id }
        onClick={ () => this.props.selectAgent(agent) }>
        <AgentAvatar agent={ agent } size={24} />
        <span className='group-name'>{ this.getAgentName(agent) }</span>
        <img className='icon-check' src='/images/icon-check.png' width={14} />
      </Menu.Item>
    );
  }

  render() {
    const { inputSearch } = this.state;
    const { selectedAgent } = this.props;
    let shownAgents = _(this.props.agents)
      .filter(agent => {
        if (!agent) {
          return false;
        }
        // integrated agents have 'refId' field and shouldn't be selectable
        if (agent.refId) {
          return false;
        }
        if (agent.status !== 'active') {
          return false;
        }
        if (!inputSearch) {
          return true;
        }
        return _.includes(this.getAgentName(agent).toLowerCase(), inputSearch.toLowerCase());
      })
      .orderBy([
        agent => agent._id === this.props.currentAgent._id,
        'lastName',
      ], ['desc', 'asc'])
      .value();

    if (selectedAgent && this.props.showNobodyOption) {
      shownAgents = [{
        _id: '',
        firstName: 'Huỷ giao',
        lastName: '',
        profilePicture: '/images/icon-unassigned.png'
      }].concat(shownAgents)
    }

    const menu = (
      <Menu className='selection-menu'>
        <div className='selection-search'>
          <Icon type='search' />
          <Input
            autoFocus
            className='input-search-form'
            placeholder='Tìm kiếm'
            value={ inputSearch }
            onChange={ this.handleInputSearch } />
        </div>
        <Menu.Divider />
        { _.map(shownAgents, this.agentItem) }
      </Menu>
    );

    return (
      <Dropdown
        disabled={ _.isEmpty(this.props.agents) }
        className='assign-popover'
        overlay={ menu }
        trigger={ ['click'] }>
        { this.getHolder() }
      </Dropdown>
    );
  }

  getAgentName(agent) {
    if (agent && agent._id === this.props.currentAgent._id) {
      return 'Bạn';
    }
    return getAgentName(agent);
  }

  getHolder() {
    const { selectedAgent } = this.props;
    if (!selectedAgent) {
      return (
        <Button className='group-assigned-btn' style={ this.props.style || {} }>
          <img src='/images/icon-unassigned.png' width={24} style={{ marginRight: '5px' }}/>
          <div className='group-name'>Chọn nhân viên</div>
          <Icon type='down' style={{ fontSize: 10 }} />
        </Button>
      )
    }
    return <Button className='group-assigned-btn' style={ this.props.style || {} }>
      <AgentAvatar agent={ selectedAgent } size={24} />
      <div className='group-name'>{ this.getAgentName(selectedAgent) }</div>
      <Icon type='down' style={{ fontSize: 10 }} />
    </Button>
  }
}

export default connect(mapStateToProps)(AgentSelect);

