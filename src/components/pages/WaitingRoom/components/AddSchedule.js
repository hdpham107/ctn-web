import React from 'react';
import { connect } from 'react-redux';
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

import {
  utilHelpers
} from '../../../../_helpers';
import { scheduleActions } from '../../../../_actions'

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
    pass: utilHelpers.makeId(15),
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
    const { schedules } = this.props;
    
    const columns = [
      {
        title: 'Chủ đề',
        dataIndex: 'title',
        render: text => <a>{text}</a>,
      },
      {
        title: 'Mã phòng',
        className: 'column-money',
        dataIndex: 'code',
      },
      {
        title: 'Thời gian bắt đầu',
        dataIndex: 'time',
        render: text => moment(text, 'YYYY-MM-DD HH:mm:ss').tz('Asia/Bangkok').format('YYYY-MM-DD HH:mm:ss'),
      },
    ];

    const data = _.map(schedules, (item, index) => {
      return {
        key: index,
        title: _.get(item, 'title'),
        code: _.get(item, 'code'),
        time: _.get(item, 'startTime'),
      }
    })
    return (
      <Row>
        <Col className='form' sm={{ span: 24}} xs={{ span: 24 }} md={{ span: 10 }} lg={{ span: 10}}>
          <Content
            className="site-layout-background"
            style={{
              padding: 100,
              minHeight: 280,
            }}
          >
            <div className='wrapper_form'>
              <div className='title-form'>
                <h2>Tạo lịch phòng</h2>
                <hr />
              </div>
              <Form.Item label='Chủ đề phòng'>
                {getFieldDecorator('title', {
                  rules: [
                    {
                      required: true,
                      message: 'Vui lòng nhập chủ đề  của phòng!',
                    },
                  ],
                })(<Input placeholder="Tiếng anh giao tiếp" />)}
              </Form.Item>
              <Form.Item label="Mã phòng">
                <Input
                  value={this.state.pass}
                  placeholder="Vui lòng nhập mã phòng" suffix={
                  <Tooltip title='Đổi mã khác'>
                    <Icon onClick={() => this.setState({
                      pass: utilHelpers.makeId(15),
                    })} className='icon-load-pass' type="reload" />
                  </Tooltip>
                }/>
              </Form.Item>
               <Form.Item label="Thời gian bắt đầu">
               {getFieldDecorator('date_picker', {
                  rules: [
                    {
                      required: true,
                      message: 'Vui lòng nhập ngaỳ bắt đầu',
                    },
                  ],
                })(<DatePicker
                  format="YYYY-MM-DD"
                  value={moment()}
                  disabledDate={disabledDate}
                  placeholder={moment(new Date()).format('YYYY-MM-DD')}
                />)}
                {getFieldDecorator('time_picker', {
                  rules: [
                    {
                      required: true,
                      message: 'Vui lòng nhập thời gian bắt đầu',
                    },
                  ],
                })(<TimePicker placeholder='09:55:00' onChange={() => {}} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />)}
                </Form.Item>
              <Form.Item label="Thời gian">
              {getFieldDecorator('time', {
                  initialValue: 50,
                  rules: [
                    {
                      required: true,
                      message: 'Vui lòng nhập thời gian bắt đầu',
                    },
                  ],
                })(<Select style={{ width: 120 }} allowClear>
                    <Option value={50}>50 phút</Option>
                  </Select>)}
              </Form.Item>
              <Form.Item>
                <Button type="primary" loading={this.state.loading} onClick={this.add}>
                  Tạo lịch
                </Button>
              </Form.Item>
            </div>
          </Content>
        </Col>
        <Col className='schedule' sm={{ span: 24}} xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12}}>
          <h2>Lịch đã tạo</h2>
          <hr />
          <Tabs defaultActiveKey="1" animated={false}>
            <TabPane tab="Hoạt động" key="1">
              <Table
                columns={columns}
                dataSource={data}
                bordered
              />  
            </TabPane>
            <TabPane tab="Kết thúc" key="2">
              Kết thúc
            </TabPane>
          </Tabs>
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
});
export default connect(mapStateToProps, mapDispatchToProps)(WrappedDynamicRule);
