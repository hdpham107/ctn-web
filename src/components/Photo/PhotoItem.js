import React from 'react';
import { Icon, Progress } from 'antd';

class PhotoItem extends React.Component {

  onDelete(photo) {
    return () => {
      this.props.onDelete(photo);
    }
  }
  render() {
    var { photo } = this.props; 
    return (
      <div className= {"photo-upload-card status-" + photo.status } >
        <img src={photo.thumbnailUrl} />
        <div className='photo-upload-mask'>
          <span>Đang tải...</span>
          <Progress percent={photo.percent} showInfo={false} strokeWidth={3}
            strokeColor={'#02b875'}/>
        </div>
        <div className='photo-remove-btn' onClick={this.onDelete.bind(this)(photo)}>
          <Icon type="close" />
        </div>
      </div>
    );
  }
}

export default PhotoItem;
