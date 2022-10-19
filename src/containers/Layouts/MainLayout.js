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
import { Switch } from 'react-router-dom';

import { IntlProvider } from "react-intl";

import AppLocale from "../../lngProvider";
import "../../assets/vendors/style";
import '../../styles/wieldy.less';
import '../../style/home.scss';
import '../../style/layout.scss';

import Sidebar from "../Sidebar/index";
import HorizontalDefault from "../Topbar/HorizontalDefault/index";
import HorizontalDark from "../Topbar/HorizontalDark/index";
import InsideHeader from "../Topbar/InsideHeader/index";
import AboveHeader from "../Topbar/AboveHeader/index";
import BelowHeader from "../Topbar/BelowHeader/index";
import Topbar from "../Topbar/index";
import NoHeaderNotification from "../Topbar/NoHeaderNotification/index";
import Customizer from "../Customizer";
import LoginPopup from '../Auth/LoginPopup';


import {
  NAV_STYLE_ABOVE_HEADER,
  NAV_STYLE_BELOW_HEADER,
  NAV_STYLE_DARK_HORIZONTAL,
  NAV_STYLE_DEFAULT_HORIZONTAL,
  NAV_STYLE_DRAWER,
  NAV_STYLE_FIXED,
  NAV_STYLE_INSIDE_HEADER_HORIZONTAL,
  NAV_STYLE_MINI_SIDEBAR,
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  TAB_SIZE
} from "../../constants/ThemeSetting";

const { Content } = Layout;

Spin.setDefaultIndicator(<Icon type='loading' className='loading-icon' />)


Moment.globalMoment = moment;
Moment.globalLocale = 'vi';
moment.locale('vi', {
  relativeTime: {
    future: "trong %s tới",
    past: "%s trước",
    s: function (number, withoutSuffix, key, isFuture) {
      return number + ' giây';
    },
    m: "1 phút",
    mm: function (number, withoutSuffix, key, isFuture) {
      return number + ' phút';
    },
    h: "1 giờ",
    hh: "%d giờ",
    d: "1 ngày",
    dd: "%d ngày",
    M: "1 tháng",
    MM: "%d tháng",
    y: "1 năm",
    yy: "%d năm"
  },
  meridiem: function (hours, minutes, isLower) {
    return hours < 12 ? 'am' : 'pm';
  },
});

const mapStateToProps = state => {
  const { locale, navStyle, layoutType } = state.settings;

  return {
    locale, navStyle, layoutType,
  }
};

const mapDispatchToProps = dispatch => ({
});

const getContainerClass = (navStyle) => {
  switch (navStyle) {
    case NAV_STYLE_DARK_HORIZONTAL:
      return "gx-container-wrap";
    case NAV_STYLE_DEFAULT_HORIZONTAL:
      return "gx-container-wrap";
    case NAV_STYLE_INSIDE_HEADER_HORIZONTAL:
      return "gx-container-wrap";
    case NAV_STYLE_BELOW_HEADER:
      return "gx-container-wrap";
    case NAV_STYLE_ABOVE_HEADER:
      return "gx-container-wrap";
    default:
      return '';
  }
};
const getNavStyles = (navStyle) => {
  switch (navStyle) {
    case NAV_STYLE_DEFAULT_HORIZONTAL:
      return <HorizontalDefault />;
    case NAV_STYLE_DARK_HORIZONTAL:
      return <HorizontalDark />;
    case NAV_STYLE_INSIDE_HEADER_HORIZONTAL:
      return <InsideHeader />;
    case NAV_STYLE_ABOVE_HEADER:
      return <AboveHeader />;
    case NAV_STYLE_BELOW_HEADER:
      return <BelowHeader />;
    case NAV_STYLE_FIXED:
      return <Topbar />;
    case NAV_STYLE_DRAWER:
      return <Topbar />;
    case NAV_STYLE_MINI_SIDEBAR:
      return <Topbar />;
    case NAV_STYLE_NO_HEADER_MINI_SIDEBAR:
      return <NoHeaderNotification />;
    case NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR:
      return <NoHeaderNotification />;
    default:
      return null;
  }
};

const getSidebar = (navStyle, width) => {
  if (width < TAB_SIZE) {
    return <Sidebar />;
  }
  switch (navStyle) {
    case NAV_STYLE_FIXED:
      return <Sidebar />;
    case NAV_STYLE_DRAWER:
      return <Sidebar />;
    case NAV_STYLE_MINI_SIDEBAR:
      return <Sidebar />;
    case NAV_STYLE_NO_HEADER_MINI_SIDEBAR:
      return <Sidebar />;
    case NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR:
      return <Sidebar />;
    default:
      return null;
  }
};


class MainLayout extends React.Component {
  render() {
    const { navStyle, width, locale } = this.props;
    const currentAppLocale = AppLocale[locale.locale];
    return (
      <LocaleProvider locale={currentAppLocale.antd}>
        <IntlProvider
          locale={currentAppLocale.locale}
          messages={currentAppLocale.messages}>

          <Layout className="gx-app-layout">
          <LoginPopup />
            {getSidebar(navStyle, width)}
            <Layout>
              {getNavStyles(navStyle)}
              <Content className={`gx-layout-content ${getContainerClass(navStyle)} `}>
                <Switch>
                  {this.props.children}
                </Switch>
              </Content>
            </Layout>
            <Customizer />
          </Layout>
        </IntlProvider>
      </LocaleProvider>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
