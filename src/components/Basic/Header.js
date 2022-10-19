import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash'
import moment from 'moment-timezone';
import {
  Layout, Menu, Icon,
  Dropdown,
  Button,
  Badge,
} from 'antd';

import {
  userActions, agentActions, integrationActions
} from '../../_actions';
import { appConstants } from '../../_constants';
import { pricingPackageNames } from '../../constants/pricingPackages';
import { agentHelpers, pricingPackageHelps } from '../../_helpers'
import AgentAvatar from './AgentAvatar';
import NotificationManager from './NotificationManager';

const LoggedInView = props => {
  const menuApp = () => {
    return (
      <Menu>
        {props.currentUser.agents.map((agent, key) => {
          if (props.app._id === agent.appId._id) {
            return (<Menu.Item key={key}>{agent.appId.name} <Icon type="check" /></Menu.Item >)
          }
          return (
            <Menu.Item key={key}>
              <a href={'/app/' + agent.appId._id + '/inbox'}>
                {agent.appId.name}
              </a>
            </Menu.Item >
          )
        })}
      </Menu >
    )
  }

  const userMenu = () => {
    return (
      <Menu className='user-menu'>
        <Menu.Item key="0" className='bg-blur'>
          <div className='h5'>
            {agentHelpers.getName(props.currentAgent)}
          </div>
          <div className='blur'>
            {props.currentUser.email}
          </div>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="1">
          <Link to={'/app/' + props.app._id + '/settings/personal'} className="header-back">
            Cài đặt tài khoản
          </Link>
        </Menu.Item>

        {props.currentUser.agents.length > 1 &&
          <Menu.Item key="2">
            <Dropdown overlay={menuApp}>
              <a className="ant-dropdown-link">
                Chọn app <Icon type="down" />
              </a>
            </Dropdown>
          </Menu.Item>}

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
  renderTrial = (app) => {
    const trialPeriodDays = _.get(app, 'pricingPackageConfig.trialPeriodDays') || 0;
    const fromCreatedApp = trialPeriodDays - moment().diff(moment(app.createdAt), 'days');
    const fromCreatedAppAsHoures = trialPeriodDays * 24 - moment().diff(moment(app.createdAt), 'hours');
    return (
      <div>
        {
          (fromCreatedAppAsHoures > 0 && fromCreatedAppAsHoures < 24)
            ? <span className='title-pricing-package'>Bạn còn <b className='as-hours'>{fromCreatedAppAsHoures} giờ</b> trải nghiệm, nâng cấp ngay để tránh mất quyền truy cập một số tính năng</span>
            : (fromCreatedAppAsHoures >= 24 && fromCreatedApp <= 3)
              ? <span className='title-pricing-package'>Bạn còn <b>{fromCreatedApp} ngày</b> trải nghiệm, nâng cấp ngay để tránh mất quyền truy cập một số tính năng</span>
              : (fromCreatedApp < trialPeriodDays && fromCreatedApp > 3)
                ? <span className='title-pricing-package'>Bạn còn {fromCreatedApp} ngày trải nghiệm, nâng cấp ngay</span>
                : fromCreatedAppAsHoures <= 0
                  ? null
                  : <span className='title-pricing-package'>Bạn được trải nghiệm đầy đủ tính năng trong {trialPeriodDays} ngày</span>
        }
        <Button className='button-pricing-package' onClick={() => pricingPackageHelps.selectUpgradePackage()}>Nâng cấp</Button>
      </div>
    );
  }

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
    const { title, beta, back, app, currentUser, currentAgent } = this.props;
    if (!app) {
      return <div></div>
    }
    return (
      <Layout.Header className='main-header'>
        <NotificationManager />
        <div>
          {back
            ? <Link to={back} className="header-back">
              <img src="/images/icon-back.png" />
            </Link>
            : null
          }
          <h1 className='section-title'>
            {title}
            { beta ? <Badge count='beta'></Badge> : null}
          </h1>
        </div>
        <div className="right-zone right">
          <LoggedInView
            currentUser={currentUser}
            currentAgent={currentAgent}
            app={app}
            changeApp={this.props.chooseApp}
            onLoad={this.props.onLoad}
            onClickLogout={this.props.onClickLogout} />
        </div>
        <div className="right-zone right header-pricing-packge">
          {
            (_.get(app, 'pricingPackageConfig.isOnTrial')
              || _.get(this.props.pricingPackage, 'name') === pricingPackageNames.basic)
            && this.renderTrial(app)}
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
  chooseApp: payload => {
    dispatch({
      type: appConstants.APP_CHOOSED,
      payload
    })
  },
  onLoad: payload => {
    dispatch({ type: appConstants.CHANGE_PAGE, payload });
    agentActions.loadAll()(dispatch);
  },
  onClickLogout: () => userActions.onUserLogout()(dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(Header);
