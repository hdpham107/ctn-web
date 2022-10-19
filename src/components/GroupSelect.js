import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Input, Menu, Dropdown, Button, Icon, Avatar } from 'antd';

import {
  getFirstCharacter,
} from '../_helpers';
import AvatarImage from './Photo/AvatarImage';
import db from '../common/db';

const mapStateToProps = (state, ownProps) => {
  const groupTable = db.getTable(state, db.tableNames.groups);
  return {
    groups: db.getMany(groupTable, ownProps.groupIds),
    selectedGroup: db.get(groupTable, ownProps.selectedGroupId),
  };
};

class GroupSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputSearch: '',
    };

    this.groupItem = this.groupItem.bind(this);
    this.handleInputSearch = this.handleInputSearch.bind(this);
  }

  handleInputSearch(e) {
    this.setState({
      inputSearch: e.target.value
    });
  }

  groupItem(group) {
    return (
      <Menu.Item
        key={ group._id }
        className={ 'group-assign-item ' + (group._id === this.props.selectedGroupId ? 'checked': '' ) }
        onClick={ () => this.props.selectGroup(group) }>
        { group._id
          ? <AvatarImage
              className='group-assigned'
              size={24}
              name={ getFirstCharacter(group.name) } />
          : <Avatar
              className='group-assigned'
              icon='close'
              size={24} />
        }
        <span className='group-name'>{ group.name }</span>
        <img className='icon-check' src='/images/icon-check.png' width={14} />
      </Menu.Item>
    );
  }

  render() {
    const { inputSearch } = this.state;
    const { selectedGroup, groups, showNoGroupOption } = this.props;
    let shownGroups = _.filter(groups, group => {
      if (!inputSearch) {
        return true;
      }
      return group.name.toLowerCase().indexOf(inputSearch.toLowerCase()) >= 0;
    });
    if (selectedGroup && showNoGroupOption) {
      shownGroups = [{
        _id: '',
        name: 'Hủy giao',
      }].concat(shownGroups);
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
        { _.map(shownGroups, this.groupItem) }
      </Menu>
    );

    return (
      <Dropdown
        className='assign-popover'
        overlay={ menu }
        trigger={ ['click'] }>
        { this.getHolder() }
      </Dropdown>
    );
  }

  getHolder() {
    const { selectedGroup } = this.props;
    if (!selectedGroup) {
      return (
        <Button className='group-assigned-btn'>
          <img src='/images/icon-group.png' width={24} style={{marginRight: '5px'}}/>
          <div className='group-name'>Chọn nhóm</div>
          <Icon type='down' style={{ fontSize: 10 }} />
        </Button>
      )
    }

    return (
      <Button className='group-assigned-btn'>
        <AvatarImage
          className='group-assigned'
          size={24}
          name={ getFirstCharacter(selectedGroup.name) } />
        <div className='group-name'>{ selectedGroup.name }</div>
        <Icon type='down' style={{ fontSize: 10 }} />
      </Button>
    );
  }
}

export default connect(mapStateToProps)(GroupSelect);

