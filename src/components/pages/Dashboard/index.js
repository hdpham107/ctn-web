import React, { Component } from "react";
import _ from 'lodash';

import { connect } from 'react-redux';
import { Col, Row, Layout, message, Input, Button } from "antd";
import Widget from '../../Widget';
import Auxiliary from '../../../util/Auxiliary';
import Portfolio from "./components/Portfolio";
import CircularProgress from '../../../components/CircularProgress/index';
import { Helmet } from "react-helmet";

import { scheduleActions, userActions } from '../../../_actions'

const { Content, Footer } = Layout;
class Dashboard extends Component {

    constructor(props) {
        super();
        this.state = {
            loader: true,
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

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                loader: false
            })
        }, 500);
    }
    render() {
        let classFullContent = 'gx-container-wrap';
        const { app } = this.props;
        const { error } = this.state;
        return (
            <Auxiliary>
                {/* <Content className={`gx-layout-content`}> */}
                <div className='gx-main-content-wrapper'>
                    {this.state.loader ?
                        <div className="gx-loader-view">
                            <CircularProgress size={30} />
                        </div> :
                        <Row>
                            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                            <Widget styleName="gx-card-full">
                                <div className='area-join-room'>
                                    {error && <span style={{color: 'red'}}>Vui lòng nhập code!</span>}
                                    <Input style={{border: error && '1px solid red'}} size='large' onChange={(e) => this.setState({code: e.target.value})} value={this.state.code} placeholder="Nhập mã phòng" />
                                    <Button onClick={() => this.joinRoom()} type="default" shape="round" loading={this.state.loading} size={'large'}>
                                    {app ? 'Vào phòng' : 'Đăng nhập vào phòng miễn phí'}
                                    </Button>
                                </div>
                                </Widget>
                            </Col>
                            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                                <Portfolio />
                            </Col>
                        </Row>
                    }  
                            </div>

                {/* </Content> */}
                <Helmet>
                    <title>Tuforu || Quản lý học viên, lịch học, báo cáo doanh số</title>
                </Helmet>
            </Auxiliary>
        );
    };
}

const mapStateToProps = ({ common }) => {
    const { app } = common;
    return { app }
  };
const mapDispatchToProps = dispatch => ({
    checkCode: dispatch(scheduleActions.checkCode),
    openLogin: dispatch(userActions.openLogin),
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard)

