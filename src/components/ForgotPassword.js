import React from "react";
import { connect } from "react-redux";
import { userActions } from "../_actions";
import { userConstants } from '../_constants';
import { Row, Col, Typography, Form, Icon, Input, Button, Alert } from "antd";

const REGEX_EMAIL = /^[a-zA-Z0-9]+\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const { Title } = Typography;

class ForgotPasswordForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ loading: true });
        this.props.onSubmit(values.email.toLowerCase())
          .then(() => this.props.onRedirect({ redirectTo: '/login' }))
          .catch(error => {
            this.setState({ error });
            this.setState({ loading: false });
          });
      }
    });
  };

  renderError() {
    var { error } = this.state;
    if (!error) {
      return;
    }
    var msg;
    switch (error.message) {
      case "email":
        msg = "Địa chỉ email của bạn không chính xác";
        break;
      default:
        msg = "Có lỗi xảy ra";
        break;
    }

    return (
      <Alert
        message={msg}
        type="error"
        showIcon
        style={{ marginBottom: "12px" }}
      />
    );
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleSubmit} className="login-form forget-password-form">
        <img className="login-logo" src="/images/logo-oncustomer.svg" />
        {this.renderError()}
        <div className='title-wrapper'>
          <Title level={4}>Bạn quên mật khẩu.</Title>
          <p>Đừng lo. Chúng tôi sẽ gửi email hướng dẫn cài đặt lại mật khẩu tới bạn trong giây lát.</p>
        </div>
        <Form.Item>
          {getFieldDecorator("email", {
            rules: [
              {
                required: true,
                message: "Vui lòng điền email"
              },
              {
                pattern: REGEX_EMAIL,
                message: "Địa chỉ email của bạn không chính xác"
              }
            ],
            trigger: "onChange"
          })(
            <Input
              autoFocus
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Điền email của bạn vào đây"
              className="input"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="forgetPassowrd-form-button"
            loading={this.state.loading}
          >
            Gửi yêu cầu
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

class ForgotPassword extends React.Component {

  render() {
    const ForgotPasswordFormWrapper = Form.create({
      name: "forgot_password"
    })(ForgotPasswordForm);

    return (
      <div className="login-page forgot-password-page">
        <Row>
          <Col span={12} className='login-frame'>
            <div className='login-frame-inner'>
              <Title level={3}>Giúp bạn mang đến sự hài lòng</Title>
              <Title level={4}>Nền tảng giao tiếp khách hàng đa kênh đầu tiên</Title>
              <img className='login-frame-image' src='/images/login-frame.svg' />
            </div>
          </Col>
          <Col className="form-side" span={12}>
            <div className="login-wrapper forget-password-wrapper">
              <ForgotPasswordFormWrapper
                onSubmit={this.props.onSubmit}
                onRedirect={this.props.redirect}
              />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onSubmit: email => dispatch(userActions.forgotPassword(email)),
  redirect: payload => dispatch({ type: userConstants.REDIRECT_TO, payload })
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);