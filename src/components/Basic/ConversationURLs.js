
import _ from 'lodash';
import React from 'react';
import {
  Typography
} from 'antd';

class ConversationURLs extends React.Component {
  render() {
    var { conversation } = this.props;
    if (_.isEmpty(conversation)) {
      return <div className='oc-block'></div>
    }
    var title = _.get(conversation, 'startedUrl.title');
    if (title === '' || !title) {
      title = _.get(conversation, 'startedUrl.url');
    }
    var lastTitle = _.get(conversation, 'lastVisitorMessageLocation.title');
    if (lastTitle === '' || !lastTitle) {
      lastTitle = _.get(conversation, 'lastVisitorMessageLocation.url');
    }
    if (!conversation.startedUrl && !_.has(conversation, 'lastVisitorMessageLocation')) {
      return <div></div>
    }
    return <div className='oc-block'>
      { 
        conversation.startedUrl
        ?  <div className='pl-24 url-zone'>
            <h4 className="left-key ">
              <span>Hội thoại được khởi tạo từ</span>
            </h4>
            <a className="email_b" href={conversation.startedUrl.url} target='_blank'>
              {title}
            </a>
          </div>
        : null
      }
      { _.has(conversation, 'lastVisitorMessageLocation')
        ?
          <div className='pl-24 url-zone'>
            <h4 className="left-key">
              <span>Tin nhắn cuối gửi từ</span>
            </h4>
            <a className="email_b"
              href={_.get(conversation, 'lastVisitorMessageLocation.url')}
              target='_blank'>
              {lastTitle}
            </a>
          </div>
        : null
      }
    </div>
  }
}

export default ConversationURLs;