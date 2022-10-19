import React from 'react';
import {
  Menu, Icon,
  Dropdown,
  Button,
  Tooltip
} from 'antd';

class CopyDelete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleTooltip: false,
    }
  }

  click({ key, domEvent }) {
    domEvent.stopPropagation();
    if (key === 'delete') {
      return this.props.onDelete();
    }
    return this.props.onCopy();
  }

  changeVisibleTooltip = value => {
    if (this.props.hideTooltip || this.props.disabled)
      return;
    this.setState({
      visibleTooltip: value,
    });
  }

  render() {
    const { visibleTooltip } = this.state;
    const { hideCopy, hideDelete, disabled, tooltipPos, styleIcon, placementDropdown } = this.props;
    const noPropagation = e => e.stopPropagation()

    const menu = (
      <Menu className='edit-dr' onClick={this.click.bind(this)}>
        {
          !hideCopy &&
          <Menu.Item key="copy" disabled={!!disabled}>
            <img src='/images/icon-copy.svg' />&nbsp; Copy
        </Menu.Item>
        }
        {
          !hideDelete ?
            <Menu.Item key="delete" className='red' disabled={!!disabled}>
              <img src='/images/icon-delete.svg' />&nbsp; Xoá
          </Menu.Item>
            : null
        }
      </Menu>
    );
    return (
      <Dropdown overlay={menu} trigger={['click']} disabled={disabled} placement={placementDropdown || 'bottomLeft'}>
        <Tooltip placement={tooltipPos || "right"} title={this.props.title || 'Tùy chọn'} visible={visibleTooltip}>
          <Button className='btn-edit' onClick={noPropagation} disabled={disabled}
            onMouseLeave={() => this.changeVisibleTooltip(false)}
            onMouseEnter={() => this.changeVisibleTooltip(true)}>
            <Icon type={this.props.icon || 'down'} style={{ ...styleIcon || {} }} theme={this.props.theme || 'outlined'} />
          </Button>
        </Tooltip>
      </Dropdown>
    );
  }
}

export default CopyDelete;