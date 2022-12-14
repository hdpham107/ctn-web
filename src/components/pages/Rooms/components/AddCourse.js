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
                    title={<h2>T???o kh??a h???c m???i</h2>}
                    width={720}
                    onClose={onClose}
                    visible={visible}
                    className={'add-course'}
                >
                    <Form layout="vertical" hideRequiredMark>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="T??n kh??a h???c">
                                    {getFieldDecorator('name', {
                                        rules: [{ required: true, message: 'Vui l??ng nh???p t??n kh??a h???c' }],
                                    })(<Input size="large" placeholder="TI???NG ANH GIAO TI???P" />)}
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={12}>
                            <strong>Upload ???nh ?????i di???n</strong>
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
                                <Form.Item label="Nh???p youtube gi???i thi???u">
                                    {getFieldDecorator('video_introduce', {
                                        rules: [{ required: true, message: 'Vui l??ng nh???p video gi???i thi???u' }],
                                    })(<Input size="large" placeholder="https://www.youtube.com/watch?v=YEQblGI5-Mw" />)}
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="Tr???ng th??i">
                                    {getFieldDecorator('status', { valuePropName: 'checked' })(
                                        <Switch checkedChildren="C??ng khai" unCheckedChildren="Ri??ng t??" />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="Tr??? gi???ng">
                                    {getFieldDecorator('coach', {
                                        rules: [{ required: true, message: 'Vui l??ng nh???p tr???n tr??? gi???ng' }],
                                    })(
                                        <Select placeholder="-ch???n-">
                                            <Option value="" selected={true}>--</Option>
                                            <Option value="jack">Jack Ma</Option>
                                            <Option value="tom">Tom Liu</Option>
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Th??? lo???i">
                                    {getFieldDecorator('category_id', {
                                        rules: [{ required: true, message: 'Vui l??ng ch???n th??? lo???i' }],
                                    })(
                                        <Select placeholder="-ch???n-">
                                            <Option value="1" selected={true}>To??n h???c</Option>
                                            <Option value="2">Ti???ng anh</Option>
                                            <Option value="3">V??n H???c</Option>
                                            <Option value="4">V???t L??</Option>
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Th???i gian b???t v?? k???t th??c">
                                    {getFieldDecorator('dateTime', {
                                        rules: [{ required: true, message: 'Vui l??ng nh???p th???i gian b???t ?????u v?? k???t th??c' }],
                                    })(
                                        <DatePicker.RangePicker
                                            style={{ width: '100%' }}
                                            getPopupContainer={trigger => trigger.parentNode}
                                        />
                                    )}
                                </Form.Item>
                            </Col>

                            <Col span={12}>
                                <Form.Item label="H???c ph?? c???a kh??a h???c">
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
                                                message: 'Vui l??ng nh???p m?? t??? cho kh??a h???c',
                                            },
                                        ],
                                    })(<Input.TextArea size="large" rows={4} placeholder="Vui l??ng nh???p m?? t??? cho kh??a h???c" />)}
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
                            Tho??t
              </Button>
                        <Button onClick={(e) => this.handleValueForm(e)} type="primary">
                            Th??m m???i
              </Button>
                    </div>
                </Drawer>
            </div>
        );
    }
}

const AddCourse = Form.create()(DrawerForm);

export default AddCourse