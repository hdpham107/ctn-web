import { Link } from 'react-router-dom';
import React from 'react';
import { connect } from 'react-redux';

import {
  Form,
  Alert,
  Input,
  Divider,
  Icon,
  Button,
  Row,
  Col,
  Typography,
  Spin
} from 'antd';

import { userActions } from '../_actions';
const REGEX_PHONE = new RegExp(/^(09|03|08|07|05)+([0-9]{8})$/);

class NormalSigUpPhone extends React.Component {
  constructor() {
    super()
    this.state = {
      render: 'signUp',
    }
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.setState({ render: 'Success' })
      this.props.onSubmit({ phoneNumber: values.phone });
    });
  };

  renderError() {
    var { error } = this.props;
    if (!error) {
      return;
    }
    var msg;
    switch (error.message) {
      case 'phone':
        msg = 'Số điện thoại không đúng'
        break;
      default:
        msg = 'Có lỗi xảy ra';
        break;
    }
    return <Alert message={msg} type="error" showIcon style={{ marginBottom: '12px' }} />
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    if (this.state.render == 'signUp') {

      return (
        <div>
          <h2>Bạn đã đăng ký OnCustomer với tài khoản Google.</h2>
          <h2>Hãy nhập số điện thoại của bạn.</h2>
          <Form onSubmit={this.handleSubmit} className="signUpPhone-form">
            {this.renderError()}
            <Form.Item>
              {getFieldDecorator('phone', {
                rules: [{
                  required: true,
                  pattern: REGEX_PHONE,
                  message: 'Số điện thoại không đúng'
                }],
                trigger: 'onChange',
              })(
                <Input autoFocus
                  type='phone'
                  prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Số điện thoại"
                  className='input'
                />,
              )}
            </Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button" loading={this.props.loading}>
              Xác nhận
        </Button>
          </Form>
        </div>
      )
    } else {
      const antIconLoading = <Icon type="loading" style={{ fontSize: 35, color: '#2CA01C' }} spin />;
      return (
        <div>
          <h2>Bạn đã đăng ký thành công tài khoản.</h2>
          <h2>Hãy bắt đầu sử dụng OnCustomer!</h2>
          <Spin indicator={antIconLoading} size="large" />
        </div>
      )
    }
  }
}

class SignUpPhone extends React.Component {
  constructor() {
    super();
    this.submitForm = (phone) => ev => {
      ev.preventDefault();
      this.props.onSubmit({ phoneNumber: phone });
    };

  }

  render() {
    const WrappedNormalSignUpForm = Form.create({ name: 'normal_signUp' })(NormalSigUpPhone);
    return (
      <div className='signUpPhone-page'>
        <Row>
          <Col className='form-side' span={24}>
            <div className='signUpPhone-wrapper'>
              <img className='login-logo' src='/images/logo-oncustomer.svg' />
              <WrappedNormalSignUpForm className='signUpPhone-form'
                error={this.props.error}
                loading={this.props.inProgress}
                onSubmit={this.props.onSubmit}
              />
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ...state.auth
});

const mapDispatchToProps = dispatch => ({
  onSubmit: phoneNumber => {
    return userActions.signUpPhone(phoneNumber)(dispatch);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPhone);