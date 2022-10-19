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

import { scheduleActions } from '../../../_actions'

const { Content } = Layout;
const { TabPane } = Tabs;
const { Option } = Select;

function disabledDate(current) {
  // Can not select days before today and today
  return current && current === moment().endOf('day');
}


class AddSchedule extends React.Component {
  state = {
    checkNick: false,
    // pass: utilHelpers.makeId(15),
    loading: false,
  };

  add = () => {
    this.setState({loading: true});
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const datas = {
          title: values.title,
          code: this.state.pass,
          startTime: `${_.get(values, 'date_picker').format('YYYY-MM-DD')} ${_.get(values, 'time_picker').format('HH:mm:ss')}`,
          time: values.time,
        }
        this.props.addSchedule(datas).then(() => {
          this.setState({loading: false});
        });
      }
    });
  };

  componentDidMount() {
    this.props.loadSchedule();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    

    return (
      <Row className="col-lg-12">
        <Col className='form' span={12} offset={6}>
          <Content
            className="site-layout-background"
            style={{
              padding: 100,
              minHeight: 280,
            }}
          >
            <div className='wrapper_form'>
              <div className='title-form'>
                <h2>Thông tin phật tử</h2>
                <hr />
              </div>
              <Form.Item label='Họ và tên'>
                {getFieldDecorator('title', {
                  rules: [
                    {
                      required: true,
                      message: 'Vui lòng nhập chủ đề  của phòng!',
                    },
                  ],
                })(<Input placeholder="Tiếng anh giao tiếp" />)}
              </Form.Item>

              <Form.Item label='Họ và tên'>
                {getFieldDecorator('title', {
                  rules: [
                    {
                      required: true,
                      message: 'Vui lòng nhập chủ đề  của phòng!',
                    },
                  ],
                })(<Input placeholder="Tiếng anh giao tiếp" />)}
              </Form.Item>
              <Form.Item label='Họ và tên'>
                {getFieldDecorator('title', {
                  rules: [
                    {
                      required: true,
                      message: 'Vui lòng nhập chủ đề  của phòng!',
                    },
                  ],
                })(<Input placeholder="Tiếng anh giao tiếp" />)}
              </Form.Item>
              <Form.Item label='Họ và tên'>
                {getFieldDecorator('title', {
                  rules: [
                    {
                      required: true,
                      message: 'Vui lòng nhập chủ đề  của phòng!',
                    },
                  ],
                })(<Input placeholder="Tiếng anh giao tiếp" />)}
              </Form.Item>
              <Form.Item label='Họ và tên'>
                {getFieldDecorator('title', {
                  rules: [
                    {
                      required: true,
                      message: 'Vui lòng nhập chủ đề  của phòng!',
                    },
                  ],
                })(<Input placeholder="Tiếng anh giao tiếp" />)}
              </Form.Item>

              <Form.Item>
                <Button type="primary" loading={this.state.loading} onClick={() => {
                  this.props.redirect({
                    redirectTo: '/step3',
                  })
                }}>
                  Tiếp theo
                </Button>
              </Form.Item>
            </div>
          </Content>
        </Col>
      </Row>
    );
  }
}

const WrappedDynamicRule = Form.create({ name: 'dynamic_rule' })(AddSchedule);

const mapStateToProps = state => ({
  ...state.common,
  schedules: _.get(state, 'schedules.data'),
});

const mapDispatchToProps = dispatch => ({
  loadSchedule: dispatch(scheduleActions.loadSchedule),
  addSchedule: dispatch(scheduleActions.addSchedule),
  redirect: payload => dispatch({ type: 'REDIRECT_TO', payload }),
});
export default connect(mapStateToProps, mapDispatchToProps)(WrappedDynamicRule);
