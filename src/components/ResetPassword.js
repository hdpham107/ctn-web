import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { Row, Col, Typography, Form, Icon, Input, Button } from "antd";
import { userActions } from "../_actions";
import { userConstants } from '../_constants';

const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])\S{6,}$/;
const { Title } = Typography;

class ResetPasswordForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ loading: true });
        this.props.onResetPassword({
          token: this.props.token,
          newPassword: values.password
        })
          .then(() => {
            this.setState({ success: true })
            setTimeout(
              (function () { this.props.onRedirect({ redirectTo: '/login' }) }).bind(this),
              2000
            );
          })
          .catch(() => {
            this.setState({ failed: true })
          })
          .finally(() => {
            this.setState({ loading: false })
          });
      }
    });
  };

  validateConfirmPassword = (rule, value, callback) => {
    const { getFieldValue } = this.props.form;
    if (value !== getFieldValue("password")) {
      callback("Mật khẩu nhập lại không khớp");
    }
    callback();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form reset-password-form">
        <img className="login-logo" src="/images/logo-oncustomer.svg" />
        {
          this.state.success &&
          <p className='info-notification'>Cài đặt thành công</p>
        }
        {
          this.state.failed &&
          <p className='warning-notification'>Đã có lỗi xảy ra</p>
        }
        <div className='title-wrapper'>
          <Title level={4}>Cài đặt lại mật khẩu.</Title>
          <p>Đừng lo. Chúng tôi sẽ gửi email hướng dẫn cài đặt lại mật khẩu tới bạn trong giây lát.</p>
        </div>
        <Form.Item>
          {getFieldDecorator("password", {
            rules: [
              {
                required: true,
                pattern: PASSWORD_REGEX,
                message: "Mật khẩu cần dài hơn 6 ký tự, bao gồm số và chữ cái"
              }
            ],
            trigger: "onChange"
          })(
            <Input.Password
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Điền mật khẩu mới"
              className="input"
              autoFocus
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("confirmPassword", {
            rules: [
              {
                required: true,
                message: "Mật khẩu nhập lại không khớp",
                validator: this.validateConfirmPassword
              }
            ],
            trigger: "onChange"
          })(
            <Input.Password
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Xác nhận lại mật khẩu mới"
              className="input"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="reset-password-form-button"
            loading={this.state.loading}
          >
            Cài đặt lại mật khẩu
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

class ResetPassword extends React.Component {

  componentDidMount() {
    this.props.validateResetPwToken(_.get(this.props, 'match.params.token'))
      .catch(() => this.props.redirect({ redirectTo: '/login' }));
  }

  render() {
    const ResetPasswordFormWrapper = Form.create({
      name: "normal_reset_password"
    })(ResetPasswordForm);

    return (
      <div className="login-page reset-password-page">
        <Row>
          <Col span={12} className='login-frame'>
            <div className='login-frame-inner'>
              <Title level={3}>Giúp bạn mang đến sự hài lòng</Title>
              <Title level={4}>Turn visitors into leads and customers into happy, engaged users</Title>
              <img className='login-frame-image' src='/images/login-frame.png' />
            </div>
          </Col>
          <Col className="form-side" span={12}>
            <div className="login-wrapper reset-password-wrapper">
              <ResetPasswordFormWrapper
                className="reset-password-form"
                token={_.get(this.props, 'resetPwToken.token')}
                onResetPassword={this.props.resetPassword}
                onRedirect={this.props.redirect}
              />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.auth
});

const mapDispatchToProps = dispatch => ({
  validateResetPwToken: (token) => dispatch(userActions.validateResetPwToken(token)),
  resetPassword: (data) => dispatch(userActions.resetPassword(data)),
  redirect: payload => dispatch({ type: userConstants.REDIRECT_TO, payload })
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);