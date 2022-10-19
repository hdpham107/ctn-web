import React from 'react';
import _ from 'lodash';
import { Upload, Icon, message } from 'antd';
import config from '../../config';
import base from '../../services/base';


function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLimit = file.size / 1024 / 1024 < 10;
  if (!isLimit) {
    message.error('Image must smaller than 10MB!');
  }
  return isJpgOrPng && isLimit;
}

class EditableAvatar extends React.Component {
  state = {
    loading: false,
    imageUrl: this.props.image
  };

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // getBase64(info.file.originFileObj, imageUrl => {
      var imageUrl = _.get(info.file, 'response.url');
      this.setState({
        imageUrl: imageUrl,
        loading: false,
      });
      if (this.props.onChange) {
        this.props.onChange(imageUrl);
      }
      // });
    }
  };

  render() {
    const uploadButton = (
      <div>
        <div>
          <Icon type={this.state.loading ? 'loading' : 'picture'} />
        </div>
        <div className='mask-upload-picture'>
          <div>
            <Icon type='cloud-upload' />
            <p>Upload</p>
          </div>
        </div>
      </div>
    );
    const { imageUrl } = this.state;
    var headers = {
      Authorization: 'Bearer ' + base.getToken(),
    }
    var appId = _.get(base.getApp(), '_id');
    return (
      <Upload
        name="file"
        headers={headers}
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action={config.API_ROOT + 'user/file-upload?appId=' + appId}
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {imageUrl ?
          <div className='avatar' style={{ backgroundImage: 'url(' + imageUrl + ')' }}></div>
          : uploadButton}
      </Upload>
    );
  }
}

export default EditableAvatar;