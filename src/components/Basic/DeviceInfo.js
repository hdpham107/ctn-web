
import _ from 'lodash';
import React from 'react';
import {
  Typography
} from 'antd';
const { Title } = Typography;

class DeviceInfo extends React.Component {
  render() {
    if (!_.has(this.props, 'visitor.deviceWebMeta')) {
      return <div></div>;
    }
    let { deviceWebMeta } = this.props.visitor;
    return (
      <div className='oc-block'>
        <div className="block-title" >
          <Title level={3}>
            <img src='/images/icon-computer.svg' className='block-title-icon' />
            <span>Thông tin thiết bị</span>
          </Title>
        </div>
        <div className="pl-24">
          <table>
            <tbody>
              <tr>
                <td>
                  <h4 className="left-key">
                    Hệ điều hành
                </h4>
                </td>
                <td>
                  <h4 className="pl-24 right-value">
                    {deviceWebMeta.os}
                  </h4>
                </td>
              </tr>
              <tr>
                <td>
                  <h5 className="left-key">
                    Trình duyệt
                </h5>
                </td>
                <td>
                  <h4 className="pl-24 right-value">
                    {deviceWebMeta.browser}
                  </h4>
                </td>
              </tr>
              <tr>
                <td>
                  <h4 className="left-key">
                    Phiên bản
                </h4>
                </td>
                <td>
                  <h4 className="pl-24 right-value">
                    {deviceWebMeta.browserVersion}
                  </h4>
                </td>
              </tr>
              <tr>
                <td>
                  <h4 className="left-key">
                    Nền tảng
                </h4>
                </td>
                <td>
                  <h4 className="pl-24 right-value">
                    {deviceWebMeta.device}
                  </h4>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default DeviceInfo;
