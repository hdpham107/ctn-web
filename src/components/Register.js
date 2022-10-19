import _ from 'lodash';
import { Link } from 'react-router-dom';
import React from 'react';
import { connect } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import config from '../config';

import {
  Form,
  Alert,
  Input,
  Divider,
  Icon,
  Button,
  Row,
  Col,
  Typography
} from 'antd';

import { userActions } from '../_actions';
const { Title } = Typography;

class Register extends React.Component {
  loginGoogle(googleData) {
    this.props.onLoginGoogle(googleData, {
      fromLocation: _.get(this.props.location, 'state.from')
    })
  }


  render() {
    const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);
    return (
      <div className='login-page'>
        <Row>
          <Col className='form-side' span={24}>
            <div className='login-wrapper'>
              <WrappedNormalLoginForm className='login-form'
                error={this.props.error}
                loading={this.props.inProgress}
                onSubmit={this.props.register}
                onLoginGoogle={this.loginGoogle.bind(this)} />
              <div className='login-signup'>
                Bạn đã có tài khoản? &nbsp;
                <Link to="/login">
                  Đăng nhập
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    )

  }
}


const mapState = state => ({
  ...state.auth
});

const actionCreators = dispatch => ({
  register: user => {
    return userActions.register(user)(dispatch);
  },

  onLoginGoogle: (googleData, options) => {
    userActions.loginGoogle(googleData, options)(dispatch);
  },
});

export default connect(mapState, actionCreators)(Register);




class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        return;
      }
      values.email = _.trim(values.email);
      this.props.onSubmit(values);
    });
  };

  renderError() {
    var { error } = this.props;
    if (!error) {
      return;
    }
    var msg;
    switch (error.message) {
      case 'email':
        msg = 'Email không đúng';
        break;
      case 'email_existed':
        msg = 'Email đã tồn tại';
        break;
      case 'password':
        msg = 'Mật khẩu cần dài hơn 6 ký tự, bao gồm số và chữ cái'
        break;
      default:
        msg = 'Có lỗi xảy ra';
        break;
    }
    return <Alert message={msg} type="error" showIcon style={{ marginBottom: '12px' }} />
  }


  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <img className='login-logo' src='/images/logo-oncustomer.svg' />
        {this.renderError()}
        <GoogleLogin className='social-login login-google'
          clientId={config.GOOGLE.CLIENT_ID}
          buttonText="Tạo tài khoản với Google"
          onSuccess={this.props.onLoginGoogle}
          onFailure={this.props.onLoginGoogle}
          cookiePolicy={'single_host_origin'}
        />
        <Divider className='login-divider'>hoặc</Divider>
        <Form.Item>
          {getFieldDecorator('companyName', {
            trigger: 'onChange',
          })(
            <Input autoFocus
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Tên công ty"
              className='input'
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: 'Vui lòng điền số điện thoại' }],
            trigger: 'onChange',
          })(
            <Input autoFocus
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Số điện thoại"
              className='input'
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Vui lòng điền lại email' }],
            trigger: 'onChange',
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
        <Button type="primary" htmlType="submit" className="login-form-button"
          loading={this.props.loading}>
          Tạo tài khoản
        </Button>
      </Form>

    );
  }
  responseFacebook(response) {
  }
}
