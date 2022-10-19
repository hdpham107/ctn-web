/* eslint no-undef: 0 */
/* eslint arrow-parens: 0 */
import React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import _ from 'lodash'

import { userActions, scheduleActions } from '../../../_actions'
import {
  Layout, Menu, Icon,
  Dropdown,
  Button,
  message,
  Input,
  Select,
  Col
} from 'antd';

import AgentAvatar from '../../Basic/AgentAvatar';

import { Helmet } from "react-helmet";

const { Option } = Select;

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
        <Dropdown trigger={['click']} overlay={userMenu}>
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

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      loading: false,
      code: '',
    }
  }

  componentDidMount() {
    let { authUser } = this.props;
  }

  joinRoom() {
    const { app, openLogin } = this.props;
    if (!app) {
      openLogin('isLogin');
    } else {
      if (_.isEmpty(this.state.code)) {
        this.setState({ error: true });
      } else {
        this.setState({ loading: true, error: false });
        setTimeout(() => {
          this.props.checkCode(this.state.code).then(isPass => {
            this.setState({ loading: false });
            if (!isPass) {
              message.error('Mã code không đúng hoặc đã hết hạn');
            }
          });
        }, 1000);
      }
    }
  }

  render() {
    const { title, beta, app, currentUser, currentAgent } = this.props;
    const { loading, error } = this.state;
    return (
      <div>
        <Helmet>
          <title>Chúng thanh niên phật quang</title>
        </Helmet>
        {/* 
                {this.state.login ? <UserAuth type='signin' close={() => this.close()}/> : ''}
                {this.state.signup ? <UserAuth type='signup' close={() => this.close()}/> : ''} */}
        {/* Preloader */}
        {/* <div className="spinner-wrapper">
                    <div className="spinner">
                        <div className="bounce1" />
                        <div className="bounce2" />
                        <div className="bounce3" />
                    </div>
                </div> */}
        {/* end of preloader */}
        {/* Navigation */}
        <nav className="navbar navbar-expand-lg navbar-dark navbar-custom fixed-top">
          {/* Text Logo - Use this if you don't have a graphic logo */}
          {/* <a class="navbar-brand logo-text page-scroll" href="index.html">Evolo</a> */}
          {/* Image Logo */}

          <a className="navbar-brand logo-image" href="/" style={{ fontSize: 20, fontWeight: 700 }}>CTNPQ</a>
          {/* Mobile Menu Toggle Button */}
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-awesome fas fa-bars" />
            <span className="navbar-toggler-awesome fas fa-times" />
          </button>
          {/* end of mobile menu toggle button */}
          <div className="collapse navbar-collapse" id="navbarsExampleDefault">
            <ul className="navbar-nav ml-auto">
              {app ? <li className="nav-item">
                <a className="nav-link page-scroll" onClick={() => this.props.redirect({ redirectTo: '/dashboard' })}>Quản lý</a>
              </li> : <li className="nav-item">
                  <a style={{ color: '#fff' }} onClick={() => this.props.openLogin('isLogin')}>Đăng nhập</a>
                </li>}
            </ul>
            <span className="nav-item social-icons">
              {app && <LoggedInView
                currentUser={currentUser}
                currentAgent={currentAgent}
                app={app}
                changeApp={this.props.chooseApp}
                onLoad={this.props.onLoad}
                onClickLogout={this.props.onClickLogout}
              />
              }
            </span>
          </div>
        </nav> {/* end of navbar */}
        {/* end of navigation */}
        {/* Header */}
        <header id="header" className="header">
          <div className="header-content">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="text-container">
                    <span className="turquoise">Đăng ký tham gia đại lễ</span>
                    <Col span={12} offset={6} style={{marginTop: 10}}>
                    <Input placeholder='Họ tên' style={{marginTop: 10}}/>
                    <Input placeholder='Pháp danh' style={{marginTop: 10}}/>
                    <Input placeholder='Số điện thoại' style={{marginTop: 10}}/>
                    <Input placeholder='Căn cước công dân' style={{marginTop: 10}}/>
                    <Select defaultValue="Cá nhân" style={{ width: '100%', marginTop: 10 }} onChange={() => {}}>
                    <Option value="personal">Cá nhân</Option>
                    <Option value="group">Cả nhóm</Option>
                  </Select>
                  <Button type="primary" style={{marginTop: 10, color: '#fff'}} onClick={() => {
                    this.props.redirect({
                      redirectTo: '/step2',
                    })
                  }}>
                    Tiếp tục
                  </Button>
                    </Col>
                      
                      
                  </div> {/* end of text-container */}
                </div> {/* end of col */}
              </div> {/* end of row */}
            </div> {/* end of container */}
          </div> {/* end of header-content */}
        </header> {/* end of header */}
        {/* end of header */}
        {/* Customers */}

        <div className="basic-3">
          <div className="container">
            <div className="row">
            </div> {/* end of row */}
            <div className="row">
              <div className="col-lg-12">
                {/* Video Preview */}
                <div className="image-container">
                  <div className="video-wrapper">
                    <a className="popup-youtube" href="https://www.youtube.com/watch?v=l9R_L65ssE0" data-effect="fadeIn">
                      <img className="img-fluid" src="landing/images/daile.PNG" alt="alternative" />
                      <span className="video-play-button">
                        <span />
                      </span>
                    </a>
                  </div> {/* end of video-wrapper */}
                </div> {/* end of image-container */}
                {/* end of video preview */}
                <p>Đây là 1 video giới thiệu ngắn 1 buổi học trực tuyến bởi nền tảng mà chúng tôi cung cấp</p>
              </div> {/* end of col */}
            </div> {/* end of row */}
          </div> {/* end of container */}
        </div> {/* end of basic-3 */}
        {/* end of video */}
        {/* Testimonials */}

        {/* end of services */}
        {/* Details 1 */}
        {/* end of details lightbox 2 */}
        {/* end of details lightboxes */}
        {/* Request */}

        <div className="footer">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <div className="footer-col">
                  <h4>Về CTNPQ</h4>
                  <p>Chungs thanh niên phật quang</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="footer-col middle">
                  <h4></h4>
                  <ul className="list-unstyled li-space-lg">
                    <li className="media">
                      <i className="fas fa-square" />
                      <div className="media-body">Đăng ký làm giảm viên<a className="turquoise" href="#"> giangvien.tuforu.com</a></div>
                    </li>
                    <li className="media">
                      <i className="fas fa-square" />
                      <div className="media-body">Đọc điều khoản <a className="turquoise" href="terms-conditions.html">Chính sách </a>, <a className="turquoise" href="privacy-policy.html">Bảo mật</a></div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-4">
                <div className="footer-col last">
                  <h4>Mạng xã hội</h4>
                  <span className="fa-stack">
                    <a href="#your-link">
                      <i className="fas fa-circle fa-stack-2x" />
                      <i className="fab fa-facebook-f fa-stack-1x" />
                    </a>
                  </span>
                  <span className="fa-stack">
                    <a href="#your-link">
                      <i className="fas fa-circle fa-stack-2x" />
                      <i className="fab fa-twitter fa-stack-1x" />
                    </a>
                  </span>
                  <span className="fa-stack">
                    <a href="#your-link">
                      <i className="fas fa-circle fa-stack-2x" />
                      <i className="fab fa-google-plus-g fa-stack-1x" />
                    </a>
                  </span>
                  <span className="fa-stack">
                    <a href="#your-link">
                      <i className="fas fa-circle fa-stack-2x" />
                      <i className="fab fa-instagram fa-stack-1x" />
                    </a>
                  </span>
                  <span className="fa-stack">
                    <a href="#your-link">
                      <i className="fas fa-circle fa-stack-2x" />
                      <i className="fab fa-linkedin-in fa-stack-1x" />
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div> {/* end of container */}
        </div> {/* end of footer */}
        {/* end of footer */}
        {/* Copyright */}
        <div className="copyright">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <p className="p-small">Copyright © 2020 <a href="https://tuforu.com">tuforu</a> - Đã đăng ký Bản quyền</p>
              </div> {/* end of col */}
            </div> {/* enf of row */}
          </div> {/* end of container */}
        </div> {/* end of copyright */}
        {/* end of copyright */}
        {/* Scripts */}
        {/* jQuery for Bootstrap's JavaScript plugins */}
        {/* Popper tooltip library for Bootstrap */}
        {/* Bootstrap framework */}
        {/* jQuery Easing for smooth scrolling between anchors */}
        {/* Swiper for image and text sliders */}
        {/* Magnific Popup for lightboxes */}
        {/* Validator.js - Bootstrap plugin that validates forms */}
        {/* Custom scripts */}
      </div>
    );
  }
}


const mapStateToProps = ({ auth, common }) => {
  const { authUser, token } = auth;
  return { authUser, token, ...common, }
};

const mapDispatchToProps = dispatch => ({
  onClickLogout: () => userActions.onUserLogout()(dispatch),
  openLogin: dispatch(userActions.openLogin),
  redirect: payload => dispatch({ type: 'REDIRECT_TO', payload }),
  checkCode: dispatch(scheduleActions.checkCode),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home)