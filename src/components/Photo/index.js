import React from 'react';
import { connect } from 'react-redux';
import PhotoList from './PhotoList';
// import PhotoList from './PhotoList';
import StudioService from '../../services/studio';
import PhotoSelectedBar from './PhotoSelectedBar';

import {
  PHOTO_PAGE_LOADED,
  PHOTO_PAGE_UNLOADED
} from '../../constants/actionTypes';

const mapStateToProps = state => ({
  ...state,
  studio: state.photo.studio,
  albums: state.photo.albums
});

const mapDispatchToProps = dispatch => ({
  onLoad: (payload) =>
    dispatch({ type: PHOTO_PAGE_LOADED, payload }),
  onUnload: () =>
    dispatch({ type: PHOTO_PAGE_UNLOADED })

});

class Photo extends React.Component {
  componentWillMount() {
    var studioId = this.props.match.params.userid;
    var studioInfo = StudioService.getById(studioId);
    var albums = StudioService.getAlbums(studioId);
    this.props.onLoad(Promise.all([studioInfo, albums]));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }
  renderAlbums() {
    if (!this.props.albums || this.props.albums.length === 0) {
      return;
    }
    return this.props.albums.map((item, index) => (
      <div className="col-sm-6 col-md-4 col-xs-12">
        <div className="thumbnail">
          <div className="imgbox">
            <a href="#"><img src={item.featuredPhoto} /></a>
          </div>
          <div className="caption">
            <h3>{item.name}</h3>
          </div>
        </div>
      </div>
    ));
  }

  render() {
    return (
      <div className="container top77">
        <PhotoList studio={this.props.studio} />
        <div className="full-width nav-justified-out">
          <ul className="nav nav-pills nav-justified">
            <li role="presentation" className="active">
              <a href="#">Albums</a>
            </li>
            <li role="presentation">
              <a href="#">Review</a>
            </li>
            <li role="presentation">
              <a href="#">Liên hệ</a>
            </li>
          </ul>
        </div>
        <div className="tab-content float-right">
          <div className="tab-pane active show" role="tabpanel" id="menu1">
            <div className="bs-example" data-example-id="thumbnails-with-custom-content">
              <div className="row">
                {this.renderAlbums()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Photo);
