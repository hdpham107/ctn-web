import UserPreview from './UserPreview';
import React from 'react';

// const mapStateToProps = state => ({ ...state.home });

const UserList = props => {
  if (!props.users) {
    return (
      <div className="article-preview">Loading user...</div>
    );
  }

  if (props.users.length === 0) {
    return (
      <div className="article-preview">
        No users are here... yet.
      </div>
    );
  }

  return (
    <div id="shortcode6">
      <div className="container">
        <div className="shortcode-html">
          <div className="row">
            {
              props.users.map(user => {
                return (
                  <div className="col-lg-3 g-mb-30 instagram-user" key={user._id}>
                    <UserPreview user={user} />
                  </div>
                );
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
