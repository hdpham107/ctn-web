import React from 'react'
import {
    Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Switch, Upload, Icon, Modal
} from 'antd';

import NumericInput from './NumericInput'

const { Option } = Select;

function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

class DrawerForm extends React.Component {

    constructor(props) {
        super(props);

        const value = props.value || {};
        this.state = {
            number: value.number || 0,
            price: '',
            previewVisible: false,
            previewImage: '',
            fileList: [
              {
                uid: '-1',
                name: 'image.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
              }
            ]
        };
    }

      handleCancel = () => this.setState({ previewVisible: false });
    
      handlePreview = async file => {
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj);
        }
    
        this.setState({
          previewImage: file.url || file.preview,
          previewVisible: true,
        });
      };
    
      handleChange = ({ fileList }) => this.setState({ fileList });
    

    onChangeSetNumber = (value) => {
        this.setState({
            price: value
        })
    }

    handleValueForm = (e) => {
        const { form, handleSubmit } = this.props

        e.preventDefault()
        form.validateFields((err, values) => {
            if (!err) {
                let course = {
                    ...values,
                    price: this.state.price
                }
                handleSubmit(course)
            }
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { onClose, visible } = this.props;
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
        <div>
            <Icon type="plus" />
            <div className="ant-upload-text">Upload</div>
        </div>
        );
        return (
            <div>
                <Drawer
                    title={<h2>Tạo khóa học mới</h2>}
                    width={720}
                    onClose={onClose}
                    visible={visible}
                    className={'add-course'}
                >
                    <Form layout="vertical" hideRequiredMark>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="Tên khóa học">
                                    {getFieldDecorator('name', {
                                        rules: [{ required: true, message: 'Vui lòng nhập tên khóa học' }],
                                    })(<Input size="large" placeholder="TIẾNG ANH GIAO TIẾP" />)}
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={12}>
                            <strong>Upload ảnh đại diện</strong>
                                <div className="clearfix">
                                    <Upload
                                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                        listType="picture-card"
                                        fileList={fileList}
                                        onPreview={this.handlePreview}
                                        onChange={this.handleChange}
                                    >
                                        {fileList.length >= 8 ? null : uploadButton}
                                    </Upload>
                                    <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                    </Modal>
                                </div>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="Nhập youtube giới thiệu">
                                    {getFieldDecorator('video_introduce', {
                                        rules: [{ required: true, message: 'Vui lòng nhập video giới thiệu' }],
                                    })(<Input size="large" placeholder="https://www.youtube.com/watch?v=YEQblGI5-Mw" />)}
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="Trạng thái">
                                    {getFieldDecorator('status', { valuePropName: 'checked' })(
                                        <Switch checkedChildren="Công khai" unCheckedChildren="Riêng tư" />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="Trợ giảng">
                                    {getFieldDecorator('coach', {
                                        rules: [{ required: true, message: 'Vui lòng nhập trọn trợ giảng' }],
                                    })(
                                        <Select placeholder="-chọn-">
                                            <Option value="" selected={true}>--</Option>
                                            <Option value="jack">Jack Ma</Option>
                                            <Option value="tom">Tom Liu</Option>
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Thể loại">
                                    {getFieldDecorator('category_id', {
                                        rules: [{ required: true, message: 'Vui lòng chọn thể loại' }],
                                    })(
                                        <Select placeholder="-chọn-">
                                            <Option value="1" selected={true}>Toán học</Option>
                                            <Option value="2">Tiếng anh</Option>
                                            <Option value="3">Văn Học</Option>
                                            <Option value="4">Vật Lý</Option>
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Thời gian bắt và kết thúc">
                                    {getFieldDecorator('dateTime', {
                                        rules: [{ required: true, message: 'Vui lòng nhập thời gian bắt đầu và kết thúc' }],
                                    })(
                                        <DatePicker.RangePicker
                                            style={{ width: '100%' }}
                                            getPopupContainer={trigger => trigger.parentNode}
                                        />
                                    )}
                                </Form.Item>
                            </Col>

                            <Col span={12}>
                                <Form.Item label="Học phí của khóa học">
                                    <NumericInput value={this.state.price} onChange={this.onChangeSetNumber} />
                                </Form.Item>
                            </Col>

                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item label="Description">
                                    {getFieldDecorator('description', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập mô tả cho khóa học',
                                            },
                                        ],
                                    })(<Input.TextArea size="large" rows={4} placeholder="Vui lòng nhập mô tả cho khóa học" />)}
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                    <div
                        style={{
                            position: 'absolute',
                            left: 0,
                            bottom: 0,
                            width: '100%',
                            borderTop: '1px solid #e9e9e9',
                            padding: '10px 16px',
                            background: '#fff',
                            textAlign: 'right',
                        }}
                    >
                        <Button onClick={onClose} style={{ marginRight: 8 }}>
                            Thoát
              </Button>
                        <Button onClick={(e) => this.handleValueForm(e)} type="primary">
                            Thêm mới
              </Button>
                    </div>
                </Drawer>
            </div>
        );
    }
}

const AddCourse = Form.create()(DrawerForm);

export default AddCourse