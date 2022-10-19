import React from 'react';
import _ from 'lodash';
import { Icon, Avatar } from 'antd';

class WidgetPreview extends React.Component {
  renderHeader() {
    const { type, widgetColor = '#02B875' } = this.props;
    if (type === 'app') {
      let { appName, appDescription } = this.props;
      appName = _.isEmpty(appName) ? 'Tên ứng dụng' : appName;
      appDescription = _.isEmpty(appDescription) ? 'Chúng tôi sẵn sàng trợ giúp. Hãy hỏi bất cứ điều gì hoặc chia sẻ phản hồi của bạn.' : appDescription;

      return (
        <div className='widget-preview-header' style={{ backgroundColor: widgetColor }}>
          <div className='widget-preview-back-wrapper'>
            <Icon type='left' />
          </div>
          <div className='widget-preview-header-content'>
            <div className='widget-preview-big-title' style={{ paddingBottom: '4px' }}>{appName}</div>
            <div className='widget-preview-small-title' style={{ WebkitBoxOrient: 'vertical' }}>{appDescription}</div>
            <div className='widget-preview-demo-agent-group'>
              <div className='widget-preview-demo-agent'>
                <img src='/images/agent-demo-01.png' />
                <div className='widget-preview-small-title'>Angle</div>
              </div>
              <div className='widget-preview-demo-agent'>
                <img src='/images/agent-demo-02.png' />
                <div className='widget-preview-small-title'>Cindy</div>
              </div>
              <div className='widget-preview-demo-agent'>
                <img src='/images/agent-demo-03.png' />
                <div className='widget-preview-small-title'>David</div>
              </div>
            </div>
            <div className='widget-preview-small-title'>Chúng tôi thường trả lời trong vài phút</div>
          </div>
        </div>
      );
    } else if (type === 'agent') {
      const {
        agentName = '',
        agentTitle = 'Chuyên viên khách hàng',
        agentDescription = 'Rất vui lòng được phục vụ anh chị ạ',
        agentProfilePicture = null,
      } = this.props;
      return (
        <div className='widget-preview-header' style={{ backgroundColor: widgetColor }}>
          <div className='widget-preview-back-wrapper'>
            <Icon type='left' />
          </div>
          <div className='widget-preview-header-content'>
            <div className='widget-preview-agent-info'>
              <div><Avatar src={agentProfilePicture}></Avatar></div>
              <div className='widget-preview-agent-main-info'>
                <div className='widget-preview-big-title'>{agentName}</div>
                <div className='widget-preview-small-title'>Đang online</div>
              </div>
            </div>
            <div className='widget-preview-agent-detail'>
              <div>
                <img src='/images/icon-agent-title.svg' />
              </div>
              <div className='widget-preview-small-title' style={{ WebkitBoxOrient: 'vertical' }}>
                {agentTitle}
              </div>
            </div>
            <div className='widget-preview-agent-detail'>
              <div>
                <img src='/images/icon-agent-description.svg' />
              </div>
              <div className='widget-preview-small-title' style={{ WebkitBoxOrient: 'vertical' }}>
                {agentDescription}
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  }

  renderBody() {
    const { type } = this.props;
    let messageBlock = null;
    if (type === 'agent') {
      const { agentName, agentProfilePicture = null } = this.props;
      messageBlock = (
        <div className='widget-preview-message-wrapper'>
          <div><Avatar size={22} src={agentProfilePicture}></Avatar></div>
          <div>
            <div className='widget-preview-small-title'>{agentName}</div>
            <div className='widget-preview-message-block'>Xin chào! Hãy liên hệ với chúng tôi ngay tại đây và chúng tôi sẽ liên lạc lại với bạn ngay khi có thể!</div>
          </div>
        </div>
      );
    }
    return (
      <div className='widget-preview-body-wrapper'>
        <div className='widget-preview-body-content'>
          {messageBlock}
        </div>
        <div className='widget-preview-logo-footer'>
          <img src='/images/by-oncustomer-footer.png' />
        </div>
      </div>
    );
  }

  renderInput() {
    return (
      <div className='widget-preview-input-wrapper'>
        <div className='widget-preview-input-placeholder'>Nhập tin nhắn</div>
        <div className='widget-preview-input-icon'>
          <img src='/images/icon-attachment.png' />
          <img src='/images/icon-emoji.svg' />
        </div>
      </div>
    );
  }

  render() {
    const { type, size = { width: '280px', height: '488px' } } = this.props;
    const classNames = `widget-preview-component ${type === 'app' ? 'widget-preview-app' : 'widget-preview-agent'}`;
    return (
      <div className={classNames} style={{ width: size.width, height: size.height }}>
        {this.renderHeader()}
        {this.renderBody()}
        {this.renderInput()}
      </div>
    );
  }
}

export default WidgetPreview;