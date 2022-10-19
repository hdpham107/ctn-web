import React, { Component } from 'react';
import { connect } from "react-redux";
import _ from 'lodash';
import moment from 'moment';
import { Layout, List, Typography, Divider, Row, Col, Button, Card } from 'antd';
import Header from './components/Header';
import LoginPopup from '../../../containers/Auth/LoginPopup'
import { scheduleActions } from '../../../_actions'
import {
  utilHelpers
} from '../../../_helpers';

import './style.scss'

const { Content, Footer } = Layout;
class WaitingRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createRoom: false,
      loading: false,
      code: '',
      diviceInfo: {},

    }
  }

  componentDidMount() {
    console.log('sdesds', _.get(this.props, 'match.params.code'))
    this.props.loadScheduleByCode(_.get(this.props, 'match.params.code'));
    utilHelpers.detectWebRTC((data) => {
      this.setState({
        diviceInfo: data,
      });
    })
  }

  _fc(url) {
    window.open(url,'window','menubar=yes,screenX=0,screenY=0,top=0,left=0,location=no,status=no,toolbar=no,scrollbars=yes,resizable=no');
  }

  joinRoom() {
    this._fc(`https://tuforu.com:81/room/${_.get(this.props, 'match.params.code')}`)
    // window.open(, '_blank').focus();
  }

  render() {
    const { schedules } = this.props;
    const { diviceInfo } = this.state;

    // if (_.isEmpty(_.get(schedules, 'data.0'))) {
    //   return <div />;
    // }
    const dataSchedule = _.get(schedules, 'data.0');
    
    return (
      <div className='gx-main-content-wrapper'>
        <Card>
          <Col span={12} style={{margin: '0 auto'}}>
          <Divider orientation="left">Thông tin phòng</Divider>
            <List>
              <List.Item>
                <Typography.Text>Chủ đề : </Typography.Text> {_.get(dataSchedule, 'title')}
              </List.Item>
              <List.Item>
                <Typography.Text>Thời gian bắt đầu: </Typography.Text> 
                {moment(_.get(dataSchedule, 'startTime'), 'YYYY-MM-DD HH:mm:ss').tz('Asia/Bangkok').format('YYYY-MM-DD HH:mm:ss')}
              </List.Item>
              <List.Item>
                <Typography.Text>Thời gian: </Typography.Text> {_.get(dataSchedule, 'time')} phút
              </List.Item>
              <List.Item>
                <Typography.Text>Admin: </Typography.Text> {_.get(dataSchedule, 'admins.0.firstName')} {_.get(dataSchedule, 'admins.0.lastName')}
              </List.Item>
            </List>
            <Divider orientation="left">Thiết bị của bạn</Divider>
            <List>
              <List.Item>
                <Typography.Text>Webcam: </Typography.Text> {diviceInfo.hasWebcam ? 'có' : 'không'}
              </List.Item>
              <List.Item>
                <Typography.Text>Microphone: </Typography.Text> {diviceInfo.hasMicrophone ? 'có' : 'không'}
              </List.Item>
              <List.Item>
                <Typography.Text>Audio: </Typography.Text> {diviceInfo.hasSpeakers ? 'có' : 'không'}
              </List.Item>
            </List>
            <Button onClick={() => this.joinRoom()} type='primary' style={{margin: '0 auto'}}>Vào phòng</Button>
          </Col>
        </Card>
      </div>
    )
  }
}

const mapStateToProps = ({ schedules }) => {
  return { schedules }
};

const mapDispatchToProps = dispatch => ({
  loadScheduleByCode: dispatch(scheduleActions.loadScheduleByCode)
})

export default connect(mapStateToProps, mapDispatchToProps)(WaitingRoom)

