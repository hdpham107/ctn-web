// import React, { Component } from 'react'
import { Modal, Button, Upload, Icon } from 'antd'
// import Cropper from './Cropper.js';

import React, {Component} from 'react';
import Cropper from 'react-cropper'; //Import Cropper Component
// import 'cropperjs/dist/cropper.css';  //Import file style

export default class CroperModal extends Component {

  constructor (props) {
    super(props);
    this.state = {
      visible: false,
      // croper state
      image: '',
      imageBase64: ''
    
    }
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    this.props.dataImageBase64(this.state.imageBase64);
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  } 

  getImage(e) {
    this.setState({ image: URL.createObjectURL(e), visible: true })
  }

  _crop(){
    // image in dataUrl
    this.setState({
      imageBase64: this.cropper.getCroppedCanvas().toDataURL()
    });
  }

  render() {
    const { ratio, width, height } = this.props

    return (
      <div>
        <Upload supportServerRender={false} showUploadList={false} data={(e) => this.getImage(e)}>
          <Button>
            <Icon type="upload" /> Tải lên
          </Button>
        </Upload>
        <Modal
          title="Cắt ảnh"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          maskClosable={false}
        >

        <Cropper
            // style={{ width: 100 }}
            src={this.state.image}
            aspectRatio={ratio}
            width={width}
            height={height}
            ref={cropper => { this.cropper = cropper; }}
            crop={this._crop.bind(this)}
          />
        </Modal>
      </div>
    );
  }
}