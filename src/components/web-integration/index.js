import _ from 'lodash';
import React from "react";
import { connect } from "react-redux";
import {
  Button,
  Icon,
  Menu,
  Dropdown,
  Row
} from 'antd';
import { Redirect, Link } from 'react-router-dom';
import queryString from 'query-string';

import './web-integration.scss';

const mapStateToProps = state => ({
  ...state.webintegration,
  user: state.common.currentUser,
  appLoaded: state.common.appLoaded,
});

const mapDispatchToProps = dispatch => ({
});

class WebIntegration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recentLogout: false,
      query: queryString.parse(this.props.location.search),
      selected: _.first(_.get(this.props.user, 'agents', []))
    };
    this.select = this.select.bind(this);
    this.permit = this.permit.bind(this);
  }

  componentWillReceiveProps({ user, appLoaded }) {
    const agents = _.get(user, 'agents', []);
    if (!appLoaded || _.isEmpty(agents)
      || _.size(_.get(this.props.user, 'agents')) === _.size(agents)
      || !_.isEmpty(this.state.agent)) {
      return;
    }
    this.setState({
      selected: _.first(agents)
    })

  }

  select(agent) {
    return () => {
      this.setState({
        selected: agent,
      })
    }
  }

  renderApps() {
    const agents = _.get(this.props, 'user.agents', []);
    const menu = (
      <Menu className='selection-menu'>
        {
          _.map(agents, agent => {
            return <Menu.Item
              onClick={this.select(agent)}
              className={ 'group-assign-item ' }
              key={ agent.appId._id }>
              <span className='group-name'>{ agent.appId.name }</span>
            </Menu.Item>
          })
        }
      </Menu>
    );

    return (
      <Dropdown
        disabled={ _.isEmpty(agents) }
        className='assign-popover'
        overlay={ menu }
        trigger={ ['click'] }>
        { this.getHolder() }
      </Dropdown>
    );
  }

  getHolder() {
    const selected = this.state.selected;
    if (!selected) {
      return <h1>Hello</h1>
    }
    return (
      <Button className='group-assigned-btn'>
        <div className='group-name'>{ selected.appId.name }</div>
        <Icon type='down' style={{ fontSize: 10 }} />
      </Button>
    )
  }

  permit() {
    const values = queryString.parse(this.props.location.search) || {};
    if (!values.uri || !this.state.selected) {
      return;
    }
    var token = 'livechat_token=' + _.get(this.state.selected, 'appId.token');
    var url = values.uri;
    if (_.indexOf(values.uri, '?') >= 0) {
      url += '&' + token;
    } else {
      url += '?' + token;
    }
    window.location.href = url;
  }

  render() {
    if (this.props.appLoaded && !this.props.user) {
      return <Redirect to={{
        pathname: '/login',
        state: {
          from: this.props.location,
        }
      }} />
    }
    var { query = {} } = this.state;
    var uri = query.uri || '';
    var domain = uri.replace('http://','').replace('https://','').replace('www.','').split(/[/?#]/)[0];
    
    return (
      <Row className='login-page invitation-page web-integration'>
        <div className='invitation-wrapper'>
          <div className='category-editor wide'>
            <div className='editor-form login-form invitation-form'>
              <div className='middle'>
                <div className='integration-app-logo wordpress'></div>
                <div className='integration-app-connect'></div>
                <div className='integration-app-logo oncustomer'></div>
              </div>
              <p className='form-title information'>
                Cho phép trang web tại địa chỉ
                <b>&nbsp;{domain}&nbsp;</b>
                nhúng Widget chat của OnCustomer Livechat
              </p>
              { this.renderApps() }
              <div className='middle'>
                <Link to='/' className='ant-btn big-button'>
                  Huỷ
                </Link>
                <Button type="primary" className='big-button' onClick={this.permit}>
                  Cho phép
                </Button>
              </div>
              </div>
            </div>
        </div>
      </Row>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WebIntegration);
