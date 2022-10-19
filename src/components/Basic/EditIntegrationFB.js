import _ from 'lodash';
import React from 'react';
import FacebookLogin from 'react-facebook-login';
import config from '../../config';
import {
  constantHelpers
} from '../../_helpers/constant'

import {
  Menu, Icon,
  Dropdown,
  Button,
  Tooltip
} from 'antd';

export default class EditIntegrationFB extends React.Component {

  click({ key, domEvent }) {
    domEvent.stopPropagation();
    if (key === 'delete') {
      return this.props.onDelete();
    }
  }

  getPermission(type) {
    if (type === 'facebookComment') {
      return constantHelpers.FB_COMMENT_PERMISSION;
    }
    return constantHelpers.FB_MESSENGER_PERMISSION;
  }

  render() {
    const noPropagation = e => e.stopPropagation();
    const permission = this.getPermission(this.props.type);
    const menu = (
      <Menu className='edit-dr' onClick={this.click.bind(this)}>
        <Menu.Item key="renew" className='renew-fb' disabled={!!this.props.disabled}>
          <FacebookLogin
            appId={`${config.FACEBOOK_APP}`}
            fields="name,email,picture"
            scope={permission}
            callback={this.props.onRenew}
            textButton='Làm mới'
            cssClass="ant-btn ant-btn-primary facebook-btn"
            icon={<img src='/images/icon-renew.svg' />} />
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
