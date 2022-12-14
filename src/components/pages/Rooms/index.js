import React, { Component } from 'react'
import { Link } from "react-router-dom";
import _ from 'lodash';
import { connect } from 'react-redux'
import moment from 'moment'
// import { Route, Switch, Link } from 'react-router-dom'
import Auxiliary from '../../../util/Auxiliary';
import { Row, Input, Form, Table, Tooltip, Icon, Layout, DatePicker, Tabs, Select, Button, TimePicker } from 'antd';
import { Helmet } from "react-helmet";

import Widget from '../../Widget';
import CircularProgress from '../../../components/CircularProgress/index';
// import Schedule from './components/Schedule';
// import * as bookingAction from '../../../appRedux/actions/bookings/bookingActions';
// import {formatMoney} from '../../util/helpers/functions';
// import {at, echoTime} from '../../util/helpers/datetime.helper';
// import { apiBase } from '../../util/config';

import { scheduleActions } from '../../../_actions'


import '../../../style/booking.scss';

const { Content } = Layout;
const { TabPane } = Tabs;
const { Option } = Select;

function disabledDate(current) {
  // Can not select days before today and today
  return current && current === moment().endOf('day');
}

class Rooms extends Component {
  constructor(props) {
    super()
    this.state = {
      checkNick: false,
      // pass: utilHelpers.makeId(15),
      loading: false,
      loader: true,
    };
  }

  componentDidMount() {
    this.props.loadSchedule();
    setTimeout(() => {
      this.setState({
        loader: false
      })
    }, 500);
  }
  add = () => {
    this.setState({ loading: true });
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const datas = {
          title: values.title,
          code: this.state.pass,
          startTime: `${_.get(values, 'date_picker').format('YYYY-MM-DD')} ${_.get(values, 'time_picker').format('HH:mm:ss')}`,
          time: values.time,
        }
        this.props.addSchedule(datas).then(() => {
          this.setState({ loading: false });
        });
      }
    });
  };


  showDrawer = () => {
    this.setState({
      visible: true,
    })
  }

  onClose = () => {
    this.setState({
      visible: false,
    })
  }

  handleSubmit = (course) => {
  }

  onToggleDrawer() {
    this.setState({
      drawerState: !this.state.drawerState
    })
  }

  acceptStatus = (data, type) => {
    let sendData = {
      id: data.id,
      type: type
    }
    this.props.acceptStatus(sendData, (dataRep) => {
      window.location.reload();
    });
  }

  render() {
    const { schedules, form } = this.props;
    const { getFieldDecorator } = form;

    const columns = [
      {
        title: 'T??n ph??ng',
        dataIndex: 'title',
        render: (text, record) => {
          return <div className="gx-flex-row gx-align-items-center">
            <span className="gx-mb-0">{text}</span>
          </div>;
        },
      },
      {
        title: 'M?? ph??ng',
        dataIndex: 'code',
        render: (text, record) => {
          return <span className="gx-text-grey">{text}</span>
        },

      },
      {
        title: 'Th???i gian b???t ?????u',
        dataIndex: 'time',
        render: text => moment(text, 'YYYY-MM-DD HH:mm:ss').tz('Asia/Bangkok').format('YYYY-MM-DD HH:mm:ss'),
      },
      {
        title: 'H??nh ?????ng',
        dataIndex: 'action',
        render: (text, item) => {
          return <Link to={`/waiting-room/${_.get(item, 'code')}`}>
            <i className="icon icon-forward gx-fs-sm gx-mr-2" />V??o ph??ng</Link>
        },
      },
    ];
    const dataSource = _.map(schedules, (item, index) => {
      return {
        key: index,
        title: _.get(item, 'title'),
        code: _.get(item, 'code'),
        time: _.get(item, 'startTime'),
      }
    })

    return (
      <Auxiliary>
        <Helmet>
          <title>CTNPQ || Qu???n l??</title>
        </Helmet>
        {this.state.loader ?
          <div className="gx-loader-view">
            <CircularProgress size={30} />
          </div> :
          <div className='gx-main-content-wrapper'>
            <Widget>
              <div className="gx-table-responsive">
                <Content
                  className="site-layout-background"
                  style={{
                    padding: 50,
                    minHeight: 200,
                  }}
                >
                  <div className='wrapper_form'>
                    <div className='title-form' style={{ textAlign: 'center' }}>
                      <h3>T???o l???ch ph??ng</h3>
                      <hr />
                    </div>
                    <Form
                      labelCol={{ span: 4 }}
                      wrapperCol={{ span: 14 }}
                      layout="horizontal"
                    >
                      <Form.Item label='Ch??? ????? ph??ng'>
                        {getFieldDecorator('title', {
                          rules: [
                            {
                              required: true,
                              message: 'Vui l??ng nh???p ch??? ?????  c???a ph??ng!',
                            },
                          ],
                        })(<Input placeholder="Ti???ng anh giao ti???p" />)}
                      </Form.Item>
                      <Form.Item label="M?? ph??ng">
                        <Input
                          value={this.state.pass}
                          placeholder="Vui l??ng nh???p m?? ph??ng" suffix={
                            <Tooltip title='?????i m?? kh??c'>
                              <Icon onClick={() => this.setState({
                                // pass: utilHelpers.makeId(15),
                              })} className='icon-load-pass' type="reload" />
                            </Tooltip>
                          } />
                      </Form.Item>
                      <Form.Item label="Th???i gian b???t ?????u">
                        {getFieldDecorator('date_picker', {
                          rules: [
                            {
                              required: true,
                              message: 'Vui l??ng nh???p nga??? b???t ?????u',
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
                              message: 'Vui l??ng nh???p th???i gian b???t ?????u',
                            },
                          ],
                        })(<TimePicker placeholder='09:55:00' onChange={() => { }} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />)}
                      </Form.Item>
                      <Form.Item label="Th???i gian">
                        {getFieldDecorator('time', {
                          initialValue: 50,
                          rules: [
                            {
                              required: true,
                              message: 'Vui l??ng nh???p th???i gian b???t ?????u',
                            },
                          ],
                        })(<Select style={{ width: 120 }} allowClear>
                          <Option value={50}>50 ph??t</Option>
                        </Select>)}
                      </Form.Item>
                      <Form.Item style={{ textAlign: 'center' }}>
                        <Button type="primary" loading={this.state.loading} onClick={this.add}>
                          T???o l???ch
                      </Button>
                      </Form.Item>
                    </Form>
                  </div>
                </Content>
              </div>
              <p className="gx-text-primary gx-mb-0 gx-pointer gx-d-block gx-d-sm-none gx-mb-0 gx-mt-3">
                <i className="icon icon-add-circle gx-fs-lg gx-d-inline-flex gx-vertical-align-middle" /> T???o l???ch h???c</p>
            </Widget>
            <Widget title={<h2 className="h4 gx-text-capitalize gx-mb-0"> Ph??ng h???c</h2>}>
              <div className="gx-table-responsive">
                <Table className="gx-table-no-bordered" columns={columns} dataSource={dataSource} pagination={false} size="small" />
              </div>
            </Widget>
          </div>}
      </Auxiliary>
    )
  }
}
const WrappedDynamicRule = Form.create({ name: 'dynamic_rule' })(Rooms);

const mapStateToProps = state => ({
  ...state.common,
  schedules: _.get(state, 'schedules.data'),
});

const mapDispatchToProps = dispatch => ({
  loadSchedule: dispatch(scheduleActions.loadSchedule),
  addSchedule: dispatch(scheduleActions.addSchedule),
});
export default connect(mapStateToProps, mapDispatchToProps)(WrappedDynamicRule);
