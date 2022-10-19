import React from 'react';
import { connect } from 'react-redux';

import {
  Menu, Icon,
  Dropdown,
  Button,
  Tooltip
} from 'antd';
import { checkPeople } from '../../_helpers/authorization';

class Edit extends React.Component {
  constructor(props) {
    super(props);
  }

  click({ key, domEvent }) {
    domEvent.stopPropagation();
    if (key === 'delete') {
      return this.props.onDelete();
    }
    return this.props.onEdit();
  }

  render() {
    var { enableDelete } = this.props;
    const noPropagation = e => e.stopPropagation()

    const menu = (
      <Menu className='edit-dr' onClick={this.click.bind(this)}>
        <Menu.Item key="edit" disabled={!!this.props.disabled}>
          <img src='/images/icon-edit.svg' />&nbsp; Chỉnh sửa
        </Menu.Item>
        {
          enableDelete ?
            <Menu.Item key="delete" className='red' disabled={!!this.props.disabled}>
              <img src='/images/icon-delete.svg' />&nbsp; Xoá
          </Menu.Item>
            : null
        }
      </Menu>
    );

    return (
      (this.props.allowAgent || checkPeople()) &&
      <Dropdown overlay={menu} trigger={['click']} disabled={this.props.disabled}>
        <Tooltip placement={this.props.tooltipPos || "right"} title={this.props.title || 'Tùy chọn'}>
          <Button className='btn-edit' onClick={noPropagation} disabled={this.props.disabled}>
            <Icon type={this.props.icon || 'down'} theme={this.props.theme || 'outlined'} />
          </Button>
        </Tooltip>
      </Dropdown>
    );
  }
}

export default Edit;
