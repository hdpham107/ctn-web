import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import moment from 'moment';
import {
  Form,
  Input,
  Button,
  Select,
  Layout,
  Col,
  Row,
  DatePicker,
  TimePicker,
  Icon,
  Tooltip,
  Tabs,
  Table,
} from 'antd';

const { Content } = Layout;
const { TabPane } = Tabs;
const { Option } = Select;


class Step1 extends React.Component {
  constructor(props) {
    super()
      this.state = {
    };
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
        <strong style={{ fontSize: 16 }}>Thông tin cơ bản</strong>
        <form style={{ marginTop: 10 }}>
          <div className="row g-3">
            <div className="col-md-6">
              <div className="form-floating">
                <Input
                  type="text"
                  className="form-control bg-light border-0"
                  id="name"
                  placeholder="Họ & Tên"
                />
                <label for="name">Họ & Tên</label>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-floating">
                <Input
                  type="email"
                  className="form-control bg-light border-0"
                  id="email"
                  placeholder="Email"
                />
                <label for="email">Email</label>
              </div>
            </div>
            <div className="col-12">
              <div className="form-floating">
                <Input
                  type="number"
                  className="form-control bg-light border-0"
                  id="subject"
                  placeholder="Số điện thoại"
                />
                <label for="subject">Số Điện Thoại</label>
              </div>
            </div>
            <div className="col-12">
              <Select size='large' className='typeof' defaultValue="Cá Nhân">
                <Option value="lucy">Cá nhân</Option>
                <Option value="lucy">Theo nhóm</Option>
              </Select>
            </div>
          </div>
        </form>
        <div className="col-12" style={{ marginTop: 10}}>
          <button className="btn btn-primary w-100 py-3" type="submit" onClick={() => {
            this.props.submitStep('step2');
          }}>
            Tiếp Tục
          </button>
        </div>
      </div>
    );
  }
}

const WrappedDynamicRule = Form.create({ name: 'dynamic_rule' })(Step1);

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  redirect: payload => dispatch({ type: 'REDIRECT_TO', payload }),
});
export default connect(mapStateToProps, mapDispatchToProps)(WrappedDynamicRule);
