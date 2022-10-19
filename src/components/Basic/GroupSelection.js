import _ from 'lodash';
import React from 'react';
import {
  Select
} from 'antd';
import {
  appConstants
} from '../../_constants';
import {
  groupActions
} from '../../_actions';
import { connect } from "react-redux";
const { Option } = Select;

const mapStateToProps = state => ({
  app: state.common.app,
  groups: state.group.groups
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({ type: appConstants.CHANGE_PAGE, payload }),
  loadAllGroups: () => {
    groupActions.getGroup()(dispatch)
  }
});

class GroupSelection extends React.Component {
  constructor(props) {
    super(props);
    this.props.loadAllGroups();
  }
  render() {
    let groups = this.props.groups || [];
    return (
      <Select className='group-selection'>
        {
          _.map(groups, group => {
            return <Option value={group._id}>{group.name}</Option>
          })
        }
      </Select>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupSelection);
