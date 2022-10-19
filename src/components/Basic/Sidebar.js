import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { checkDashBoard, checkFAQs, checkIntegration, checkAdmin } from '../../_helpers/authorization';
import {
  Link
} from "react-router-dom";
import {
  Layout, Menu, Icon, Badge
} from 'antd';
const { Sider } = Layout;
const PATH_REGEX = /\/app\/[0-9a-zA-Z]+\/([a-zA-Z-]+)/;

const SIDEBAR_TOP_LIST = [
  {
    key: 'dashboard',
    title: 'Tổng quan',
    pathUrl: '/dashboard',
    checkRender: checkDashBoard,
  },
  {
    key: 'inbox',
    title: 'Inbox',
    pathUrl: '/inbox',
  },
  {
    key: 'calendar',
    title: 'Lịch học',
    pathUrl: '/calendar',
  },
  {
    key: 'live',
    title: 'Học viên Live',
    pathUrl: '/live',
    id: 'sidebar-live',
  },
  {
    key: 'people',
    title: 'Tất cả học viên',
    pathUrl: '/people',
  },
  // {
  //   key: 'faq',
  //   title: 'Câu hỏi thường gặp',
  //   pathUrl: '/faq',
  //   checkRender: checkFAQs,
  // },
  // {
  //   key: 'campaign',
  //   title: 'Chiến dịch',
  //   pathUrl: '/campaign',
  //   checkRender: checkAdmin,
  // },
  // {
  //   key: 'bot',
  //   title: 'Bot',
  //   pathUrl: '/bot/information',
  //   checkRender: checkAdmin,
  // },
  {
    key: 'report',
    title: 'Báo cáo',
    pathUrl: '/report',
    checkRender: checkAdmin,
  },
];

const SIDEBAR_BOTTOM_LIST = [
  // {
  //   key: 'connect',
  //   title: 'Kết nối đa kênh',
  //   pathUrl: '/connect',
  //   checkRender: checkAdmin,
  // },
  // {
  //   key: 'third-integration',
  //   title: 'Kho ứng dụng',
  //   pathUrl: '/third-integration',
  //   checkRender: checkAdmin,
  // },
  {
    key: 'settings',
    title: 'Cài đặt',
    pathUrl: '/settings',
  },
];

const mapStateToProps = state => ({
  ...state.home,
  ...state.router,
  appName: state.common.appName,
  token: state.common.token,
  app: state.common.app,
  group: state.group,
  groupFilters: state.inboxRefactored.filters,
});

const mapDispatchToProps = dispatch => ({
});

class Sidebar extends React.Component {
  state = {
    collapsed: true,
    keySelect: 2,
  };

  onHover = () => {
    this.setState({
      collapsed: false,
    })
  }
  onHoverOut = () => {
    this.setState({
      collapsed: true,
    })
  }

  componentDidMount() {
    this.onUpdateSelectedMenu();
  }

  // componentDidUpdate() {
  //   this.onUpdateSelectedMenu();
  // }

  onUpdateSelectedMenu() {
    const pathname = this.props.location.pathname;
    const result = pathname.match(PATH_REGEX);
    if (result && result[1] !== this.state.selected) {
      this.setState({
        selected: result[1]
      });
    }
  }

  selectedSidebar(item) {
    this.setState({
      selected: item,
    });
  }

  renderSidebarItem = (item, appId) => {
    let width = 20;
    let height = 20;

    if (item.key === 'calendar') {
      width = 35;
      height = 33;
    }
    return (
      (!item.checkRender || item.checkRender()) &&
      <Menu.Item key={item.key} id={item.id}>
        <Link to={`/app/${appId}${item.pathUrl}`} onClick={() => this.selectedSidebar(item.key)}>
          <div className={`sidebar-icon anticon icon-${item.key}`}>
            {item.key === 'inbox' &&
              <Badge count={_.get(this.props.groupFilters, '[0].conversationCounts')}></Badge>
            }
            <svg>
              <use xlinkHref={`/images/menu/sidebar-icon.svg#${item.key}`} width={width} height={height} />
            </svg>
          </div>
          <span>
            {item.title}
          </span>
        </Link>
      </Menu.Item>
    )
  }

  render() {
    var appId = _.get(this.props, 'app._id');
    return (
      <Sider className='main-sidebar' style={{
        overflow: 'auto',
        minHeight: '100vh',
        left: 0,
        Index: 2,
      }}
        collapsedWidth={65}
        collapsible
        collapsed={this.state.collapsed}
        trigger={null}
      >
        <Link to={'/app/' + appId + '/dashboard'} className="logo">
          <div className='logo'></div>
        </Link>
        <Menu theme="dark" className='main-menu' mode="inline" selectedKeys={[this.state.selected]}>
          {_.map(SIDEBAR_TOP_LIST, item => this.renderSidebarItem(item, appId))}
          <div className="spacer"></div>
          {_.map(SIDEBAR_BOTTOM_LIST, item => this.renderSidebarItem(item, appId))}
        </Menu>


        {/* <Menu theme="dark" className='main-menu bottom' defaultSelectedKeys={['1']} mode="inline">

        </Menu> */}
      </Sider>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
