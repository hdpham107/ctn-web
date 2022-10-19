import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from "react-redux";
import { message, Input, Button } from 'antd';
// import Header from './components/Header';
// import AddSchedule from './AddSchedule';
// import LoginPopup from '../../../containers/Auth/LoginPopup'
import { scheduleActions, userActions } from '../../../_actions'

import './style.scss'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      loading: false,
      code: '',
    }
  }

  joinRoom() {
    const { app, openLogin } = this.props;
    if (!app) {
      openLogin('isLogin');
    } else {
      if (_.isEmpty(this.state.code)) {
        this.setState({error: true});
      } else {
        this.setState({loading: true, error: false});
        setTimeout(() => {
          this.props.checkCode(this.state.code).then(isPass => {
            this.setState({loading: false});
            if (!isPass) {
              message.error('Mã code không đúng hoặc đã hết hạn');
            }
          });
        }, 1000);
      }
    }
  }
  // createRoom(type) {
  //   const { app, openLogin } = this.props;
  //   if (!app) {
  //     openLogin('isLogin');
  //   } else {
  //     this.setState({createRoom: type});
  //   }
  // }
  render() {
    const { app } = this.props;
    const { error } = this.state;
    return (
      <div className='area-join-room'>
        {error && <span style={{color: 'red'}}>Vui lòng nhập code!</span>}
        <Input style={{border: error && '1px solid red'}} size='large' onChange={(e) => this.setState({code: e.target.value})} value={this.state.code} placeholder="Nhập mã phòng" />
        <Button onClick={() => this.joinRoom()} type="default" shape="round" loading={this.state.loading} size={'large'}>
          {app ? 'Vào phòng' : 'Đăng nhập vào phòng miễn phí'}
        </Button>
      </div>
      )
  }
}

const mapStateToProps = ({ common }) => {
  const { app } = common;
  return { app }
};

const mapDispatchToProps = dispatch => ({
  checkCode: dispatch(scheduleActions.checkCode),
  openLogin: dispatch(userActions.openLogin),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)

