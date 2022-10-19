import React, { Component } from 'react';
import { connect } from "react-redux";
import { Layout, Input, Button } from 'antd';
import Header from '../../components/pages/Home/components/Header';
import LoginPopup from '../../containers/Auth/LoginPopup'
import { scheduleActions, userActions } from '../../_actions'
import '../../components/pages/Home/style.scss'

const { Content, Footer } = Layout;
class RoomLayout extends React.Component {
  render() {
    return (
      <div className='wrraper-layout'>
        <LoginPopup />
        <Layout className="layout">
          <Header />
          <Content>
            <div className="site-layout-content">
              {this.props.children}
            </div>
          </Content>
        </Layout>
        <Footer>Tuforu.com ©2020 </Footer>
      </div>
    );
  }
}


const mapStateToProps = ({ common }) => {
  const { app } = common;
  return { app }
};

const mapDispatchToProps = dispatch => ({
  checkCode: dispatch(scheduleActions.checkCode),
})
export default connect(mapStateToProps, mapDispatchToProps)(RoomLayout);
