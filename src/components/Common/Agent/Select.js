import React from "react";
import _ from 'lodash';
import { connect } from "react-redux";
import { Select, Form, Avatar } from 'antd';
import AvatarImage from '../../Photo/AvatarImage';

import {
    getFirstCharacter,
    getColor
} from '../../../_helpers'

const { Option } = Select;

const mapStateToProps = state => ({
    agents: state.app.agents || []
});
const mapDispatchToProps = dispatch => ({
});

class AgentSelect extends React.Component {
  constructor(props) {
      super(props);
  }

  handleChange = (value, node) => {
    let { agents } = this.props;
    let agentSelect = agents.find(it => {
      return it._id == value
    })
    this.props.onChangeAgent({
      _id: value,
      firstName: agentSelect.firstName,
      lastName: agentSelect.lastName
    })
}

  renderAgents = (agents) => {
    return _.map(agents, ((item, idx) => {
      let name = getFirstCharacter(item.firstName);
      return (
        <Option value={item._id} key={item._id}>
          <AvatarImage 
            size={20}
            name={name}
            picture={item.profilePicture}/>
          {item.firstName} {item.lastName}
        </Option>
      )
    }));
  }

  render() {
    let { agents, value } = this.props;
    return (
      <Select
        showSearch
        value={value}
        style={{ width: 200 }}
        placeholder="Select a Agent"
        optionFilterProp="children"
        filterOption={(input, option) =>
            option.props.children[1].toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        onChange={this.handleChange}
      >
        {this.renderAgents(agents)}
    </Select>
    );
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AgentSelect);