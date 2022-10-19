import React from 'react';

import {
  Menu, Icon,
  Dropdown,
  Button,
  Tooltip
} from 'antd';

export default class EditIntegration extends React.Component {
  constructor(props) {
    super(props);
  }

  click({ key, domEvent }) {
    domEvent.stopPropagation();
    if (key === 'delete') {
      return this.props.onDelete();
    }
    return this.props.onReNew();
  }

  render() {
    const noPropagation = e => e.stopPropagation()

    const menu = (
      <Menu className='edit-dr' onClick={this.click.bind(this)}>
        <Menu.Item key="renew" disabled={!!this.props.disabled}>
          <img src='/images/icon-renew.svg' />&nbsp; Làm mới
        </Menu.Item>
        <Menu.Item key="delete" className='red' disabled={!!this.props.disabled}>
          <img style={{ padding: '0 5px' }} src='/images/icon-delete.svg' />&nbsp; Xoá
          </Menu.Item>
      </Menu>
    );

    return (
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
