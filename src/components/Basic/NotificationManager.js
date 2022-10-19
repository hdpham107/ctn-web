import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import {
  notification
} from 'antd';


class NotificationManager extends React.Component {
  componentWillReceiveProps({ counter, config }) {
    // Counter is to control if we render or not
    if (this.counter === counter) {
      return;
    }
    this.counter = counter;
    this.showNotification(config);

  }

  showNotification(config) {
    config = config || {};
    const type = config.type || 'success';
    if (!notification[type]) {
      return;
    }
    if (type  === 'success') {
      _.set(config, 'data.icon', <img src='/images/icon-success.svg' />)
    }
    notification[type](config.data);
  }

  render() {
    return <React.Fragment></React.Fragment>
  }
}

const mapStateToProps = state => ({
  ...state.modal,
});

const mapDispatchToProps = dispatch => ({
});
export default connect(mapStateToProps, mapDispatchToProps)(NotificationManager);
