import _ from 'lodash';
import React from "react";
import { connect } from "react-redux";
import {
  List,
  Avatar,
  Row,
  Typography
} from 'antd';
import { appConstants } from '../_constants';
const { Title } = Typography;
const mapStateToProps = state => ({
  ...state.common
});

const mapDispatchToProps = dispatch => ({
  chooseApp: payload => {
    dispatch({
      type: appConstants.APP_CHOOSED,
      payload
    })
  },
});

class ChooseApp extends React.Component {
  choose(agent) {
    return () => {
      this.props.chooseApp({
        app: agent.appId,
        agent,
        user: this.props.currentUser,
      })
    }
  }

  render() {
    const { agents } = this.props;
    if (_.isEmpty(agents)) {
      return <div></div>
    }
    return (
      <Row className='login-page choose-app'>
        <div className='invitation-wrapper'>
          <div className='editor-form login-form'>
            <img className="login-logo" src="/images/logo-oncustomer.svg" />
            <Title className='form-title' level={4}>Chọn ứng dụng</Title>
            <List
              className='editor-form choose-app-list'
              itemLayout="horizontal"
              dataSource={agents}
              renderItem={agent => (
                <List.Item className='choose-app-item'
                  onClick={this.choose(agent).bind(this)}>
                  <List.Item.Meta
                    avatar={<Avatar size={40} shape='square'>
                      {_.first(_.get(agent, 'appId.name'))}
                    </Avatar>}
                    title={_.get(agent, 'appId.name')}
                    description={_.get(agent, 'role.name')}
                  />
                </List.Item>
              )}
            />
          </div>
        </div>
      </Row>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChooseApp);


