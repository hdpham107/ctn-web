import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import agent from '../agent';
// import { ARTICLE_FAVORITED, ARTICLE_UNFAVORITED } from '../constants/actionTypes';

// const FAVORITED_CLASS = 'btn btn-sm btn-primary';
// const NOT_FAVORITED_CLASS = 'btn btn-sm btn-outline-primary';

const mapDispatchToProps = dispatch => ({
  // favorite: slug => dispatch({
  //   type: ARTICLE_FAVORITED,
  //   payload: agent.Articles.favorite(slug)
  // }),
  // unfavorite: slug => dispatch({
  //   type: ARTICLE_UNFAVORITED,
  //   payload: agent.Articles.unfavorite(slug)
  // })
});

const UserPreview = props => {
  const user = props.user;
  return (
    <Link to={`/hello/${user._id}/${user.slug}`} className="nav-link" key={user._id}>
      <article className="u-shadow-v1-4">
        <img className="img-fluid w-150 profile-picture" src={user.featuredPhoto} alt="Image Description" />
        <div className="g-bg-white g-pa-10">
          <h1>Xem 100 luot</h1>
          <h3 className="h3 g-font-weight-300 g-ma-0">
            <a className="u-link-v5 g-color-main" href="#!">{user.name}</a>
          </h3>
          <div className="media g-font-size-12 g-ma-0">
            <div className="media-body align-self-center">
              <a className="u-link-v5 text-uppercase g-color-main g-color-primary--hover" href="#!">{user.full_name}</a>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default connect(() => ({}), mapDispatchToProps)(UserPreview);
