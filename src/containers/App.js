// import Header from './Basic/Header';
import React from 'react';
import {
  Spin,
  Icon,
  Layout,
  LocaleProvider,
} from 'antd';
import Moment from 'react-moment';
import moment from 'moment/min/moment-with-locales';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Switch } from 'react-router-dom';

import {IntlProvider} from "react-intl";

import AppLocale from "../lngProvider";
import MainLayout from "./Layouts/MainLayout";
import RoomLayout from "./Layouts/RoomLayout";
import {BlankLayout} from "./Layouts/BlankLayout";


import config from '../config'
import { REDIRECT } from '../constants/actionTypes';

import Rooms from '../components/pages/Rooms';
import Login from '../components/Login';
import LandingPage from '../components/pages/LandingPage';
import Dashboard from '../components/pages/Dashboard';
import AppRoute from './AppRoute';
import Step2 from '../components/pages/Home/Step2';
import Step3 from '../components/pages/Home/Step3';

import {
  appActions,
} from '../_actions';

import { store } from '../store';

const mapStateToProps = state => {
  return {
    appLoaded: state.common.appLoaded,
    redirectTo: state.common.redirectTo
  }
};

const mapDispatchToProps = dispatch => ({
  onLoad: () => appActions.load()(dispatch),
  onRedirect: () => dispatch({ type: REDIRECT }),
  addSettings: () => {
    dispatch({
      type: 'ADD_SETTINGS',
      payload: {
        navCollapsed:false,
        navStyle:"NAV_STYLE_FIXED",
        layoutType:"LAYOUT_TYPE_FULL",
        themeType:"THEME_TYPE_LITE",
        themeColor:"THEME_COLOR",
        pathname:"/social-apps/profile",
        width: 1920,
        isDirectionRTL:false,
        locale: {
          languageId:"english",
          locale:"en",
          name:"English",
          icon:"us",
        }
      }
    });
  },
});


class App extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      store.dispatch(push(nextProps.redirectTo));
      this.props.onRedirect();
    }
  }

  componentDidMount() {
    this.props.addSettings();
  }
  componentWillMount() {
    this.props.onLoad();
  }

  render() {
    if (this.props.appLoaded) {
      return (
        <Switch>
          {/* <AppRoute path="/invitation/:token" component={Invitation} layout={BlankLayout} auth={false} />
          // <AppRoute path="/integration" component={WebIntegration} layout={BlankLayout} auth={false} />
          <AppRoute path="/forgot-password" component={ForgotPassword} auth={false} />
          <AppRoute path="/reset-password/:token" component={ResetPassword} auth={false} />
          <AppRoute path="/choose-app" component={ChooseApp} layout={BlankLayout} /> */}
          {/* <AppRoute path='/sign_up_phone' component={SignUpPhone} layout={BlankLayout} /> */}
          {/* <AppRoute path="/login" component={Login} layout={BlankLayout} auth={false} /> */}
          <AppRoute path="/rooms" component={Rooms} layout={MainLayout} />
          {/* <AppRoute path="/conversation" component={Message} layout={MainLayout} /> */}
          <AppRoute path="/dashboard" component={Dashboard} layout={MainLayout} />
          <AppRoute path="/step2" component={Step2} layout={RoomLayout} />
          <AppRoute path="/step3" component={Step3} layout={RoomLayout} />
          {/* <AppRoute path="/waiting-room/:code" component={WaitingRoom} layout={MainLayout}/> */}
          <AppRoute path="/" component={LandingPage} auth={false} layout={BlankLayout}/>
        </Switch>
      );
    }
    return <div />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
