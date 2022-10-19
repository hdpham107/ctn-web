import { Link } from 'react-router-dom';
import { Route, Redirect } from 'react-router';
import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import { GoogleLogin } from 'react-google-login';
import config from '../config';
import { Row, Col, Divider, Typography, Alert } from 'antd';

import {
  UPDATE_FIELD_AUTH,
  LOGIN,
  LOGIN_PAGE_UNLOADED
} from '../constants/actionTypes';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { userConstants } from '../_constants';
import AuthenticationService from '../services/authentication';

// import '../style/home.scss'
const { Title } = Typography;

class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit(_.trim(values.email), values.password);
      }
    });
  };

  renderError(error) {
    var msg;
    switch (error.message) {
      case 'email':
      case 'password':
        msg = 'Email hoặc mật khẩu không đúng'
        break;
      case 'suspended':
        msg = 'Tài khoản đã bị khoá';
        break;
      default:
        msg = 'Có lỗi xảy ra';
        break;
    }
    return <Alert message={msg} type="error" showIcon style={{ marginBottom: '12px' }} />
  }


  render() {
    const { error } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <img className='login-logo' src='/images/logo-oncustomer.svg' />
        {error && this.renderError(error)}
        {
          !error && this.props.forgotPwEmail &&
          <p className='info-notification'>Hệ thống đã gửi link cài đặt lại mật khẩu tới bạn. Vui lòng kiểm tra hòm thư</p>
        }
        {
          !error && _.get(this.props, 'resetPwToken.token') && !_.get(this.props, 'resetPwToken.isValid') &&
          <p className='warning-notification'>Link này đã được sử dụng hoặc hết thời hạn</p>
        }
        <GoogleLogin className='social-login login-google'
          clientId={config.GOOGLE.CLIENT_ID}
          buttonText="Đăng nhập với Google"
          onSuccess={this.props.onLoginGoogle}
          onFailure={this.props.onLoginGoogle}
          cookiePolicy={'single_host_origin'}
        />
        <Divider className='login-divider'>hoặc</Divider>
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Vui lòng kiểm tra lại email' }],
            trigger: 'onChange',
            initialValue: this.props.forgotPwEmail,
          })(
            <Input autoFocus
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Email"
              className='input'
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Mật khẩu trống' }],
            trigger: 'onChange',
          })(
            <Input.Password
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
              className='input'
            />,
          )}
        </Form.Item>
        <Form.Item>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              trigger: 'onChange',
              initialValue: true,
            })(<Checkbox>Nhớ mật khẩu</Checkbox>)}

            <Link to="/forgot-password">
              Quên mật khẩu?
            </Link>
          </div>
          <Button type="primary" htmlType="submit" className="login-form-button"
            loading={this.props.loading}>
            Đăng nhập
          </Button>

        </Form.Item>
      </Form>

    );
  }
  responseFacebook(response) {
  }
}


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);
  }

  login(email, password) {
    this.props.onSubmit(email, password, {
      fromLocation: _.get(this.props.location, 'state.from')
    });
  }

  loginGoogle(googleData) {
    this.props.onLoginGoogle(googleData, {
      fromLocation: _.get(this.props.location, 'state.from')
    })
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return (
      <div className='login-page'>
        <Row className='login-page-wrapper'>
          <Col span={12} className='login-frame'>
            <div className='login-frame-inner'>
              <Title level={3}>Giúp bạn mang đến sự hài lòng</Title>
              <Title level={4}>Turn visitors into leads and customers into happy, engaged users</Title>
              <img className='login-frame-image' src='/images/login-frame.svg' />
            </div>
          </Col>
          <Col className='form-side' span={12}>
            <div className='login-wrapper'>
              <this.WrappedNormalLoginForm
                className='login-form'
                error={this.props.error}
                loading={this.props.inProgress}
                onSubmit={this.login.bind(this)}
                onLoginGoogle={this.loginGoogle.bind(this)}
                onLoginFacebook={this.props.onLoginFacebook}
                forgotPwEmail={this.props.forgotPwEmail}
                resetPwToken={this.props.resetPwToken}
              />
              <div className='login-signup'>
                Bạn chưa có tài khoản? &nbsp;
                <Link to="/register">
                  Đăng ký miễn phí
                </Link>
              </div>
            </div>
          </Col>
        </Row>

      </div>
    )
  }
}

const mapStateToProps = state => ({
  ...state.auth,
  invitation: state.invitation,
  router: state.router,
});

const mapDispatchToProps = dispatch => ({
  loginPageLoad: data => {
    userActions.loginPageLoaded(data)(dispatch);
  },
  onChangePassword: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value }),

  onSubmit: (email, password, options) => {
    userActions.login(email, password, options)(dispatch);
  },
  onLoginGoogle: (googleData, options) => {
    userActions.loginGoogle(googleData, options)(dispatch);
  },
  onLoginFacebook: (googleData) => {
    userActions.loginGoogle(googleData)(dispatch);
  },
  onUnload: () => dispatch({ type: LOGIN_PAGE_UNLOADED }),
  redirect: (payload) => dispatch({ type: userConstants.REDIRECT_TO, payload })
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
