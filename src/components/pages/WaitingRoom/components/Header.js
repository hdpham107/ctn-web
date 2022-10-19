import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash'

import { userActions } from '../../../../_actions'
import {
  Layout, Menu, Icon,
  Dropdown,
  Button,
  Avatar,
} from 'antd';
import AgentAvatar from '../../../Basic/AgentAvatar';

const LoggedInView = props => {
  const userMenu = () => {
    return (
      <Menu className='user-menu'>
        <Menu.Item key="0" className='bg-blur'>
          <div className='blur'>
            {props.currentUser.email}
          </div>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="1">
          <Link to={'/app/'} className="header-back">
            Cài đặt tài khoản
          </Link>
        </Menu.Item>
        <Menu.Item key="3">
          <a onClick={props.onClickLogout}>
            Thoát
          </a>
        </Menu.Item>
      </Menu>
    );
  }
  if (props.currentAgent) {
    return (
      <div>
        <Dropdown overlay={userMenu}>
          <div className='user-zone'>
            <AgentAvatar agent={props.currentAgent} size={36} color={'#02b875'} />
            <Icon type="down" />
          </div>
        </Dropdown>
      </div>
    );
  } else {
    return (
      <div></div>
    );
  }
}

class Header extends React.Component {

  responseFacebook(data) {
    if (!data || !data.accessToken) {
      return;
    }
    this.props.updateIntegration({
      type: 'facebook',
      data
    });
  }

  render() {
    const { title, beta, app, currentUser, currentAgent } = this.props;
    return (
      <Layout.Header className='main-header'>
         <a onClick={() => this.props.addRoom(false)} className="header-back">
            <div className="logo"> CTNPQ</div>
          </a>
        <div className="right-zone right">
          {!app ? <Avatar icon={<Icon type="user-delete" />} />  
          : <LoggedInView
              currentUser={currentUser}
              currentAgent={currentAgent}
              app={app}
              changeApp={this.props.chooseApp}
              onLoad={this.props.onLoad}
              onClickLogout={this.props.onClickLogout}
            /> 
        }
        </div>
      </Layout.Header>
    );
  }
}

const mapStateToProps = state => ({
  ...state.home,
  ...state.common,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  // chooseApp: payload => {
  //   dispatch({
  //     type: appConstants.APP_CHOOSED,
  //     payload
  //   })
  // },
  // onLoad: payload => {
  //   dispatch({ type: appConstants.CHANGE_PAGE, payload });
  //   agentActions.loadAll()(dispatch);
  // },
  onClickLogout: () => userActions.onUserLogout()(dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(Header);
