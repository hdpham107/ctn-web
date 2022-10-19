import React, {Component} from "react";
import {connect} from "react-redux";
import {Avatar, Popover} from "antd";
import { userActions } from '../../_actions'

class UserProfile extends Component {

  render() {
    const userMenuOptions = (
      <ul className="gx-user-popover">
        <li onClick={() => this.props.onClickLogout()}>Đăng xuất</li>
      </ul>
    );
    let {currentUser} = this.props;
    return (

      <div className="gx-flex-row gx-align-items-center gx-mb-4 gx-avatar-row">
        <Popover placement="bottomRight" content={userMenuOptions} trigger="click">
          <Avatar gap={1} style={{backgroundColor: '#f56a00'}} className="gx-size-40 gx-pointer gx-mr-3" alt="">
            Luong Thai Vien
          </Avatar>
          <span className="gx-avatar-name">Luong Thai Vien<i
            className="icon icon-chevron-down gx-fs-xxs gx-ml-2"/>
          </span>
        </Popover>
      </div>

    )

  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.common.currentUser,
  }
};

const mapDispatchToProps = dispatch => ({
  onClickLogout: () => userActions.onUserLogout()(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
