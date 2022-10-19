import React from 'react';
import moment from 'moment';
import { Tooltip } from 'antd';

export default class StatusIntegration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleRenew: false,
    };
  }

  render() {
    const { visibleRenew } = this.state;
    const { expired, expirationTime, active } = this.props;
    return (
      <div className='status-integration'>
        {
          !!expired || moment().isAfter(moment.unix(expirationTime))
            ?
            <span className='connect-fail'
              onClick={this.props.renewConnect}
              onMouseEnter={() => this.setState({ visibleRenew: true })}
              onMouseLeave={() => this.setState({ visibleRenew: false })}>Kết nối bị mất
                <Tooltip title='Làm mới' visible={visibleRenew} placement='bottomLeft' autoAdjustOverflow={false}>
                <img src='/images/icon-renew.svg' alt='renew' />
              </Tooltip>
            </span>
            : !active
              ? <span>Tắt kết nối</span>
              : <span className='is-connecting'>Đang kết nối</span>
        }
      </div>
    )
  }
}