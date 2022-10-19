import React from 'react';
import { Modal, Button } from 'antd';

class ConfirmModal extends React.Component {
  constructor(props) {
    super(props);

    this._isMounted = true;

    this.state = {
      visible: false,
      loading: false,
    };

    this.onCancel = this.onCancel.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
  }

  onCancel() {
    this.closeModal();

    if (this.props.onCancel) {
      this.props.onCancel();
    }
  }

  onConfirm = () => {
    this.setState({
      loading: true,
    });

    return Promise.resolve()
      .then(() => this.props.onConfirm && this.props.onConfirm(this.data))
      .then(() => this.resolve(this.data))
      .catch(() => this.reject())
      .finally(this.closeModal);
  }

  closeModal = () => {
    if (!this._isMounted) {
      return;
    }
    this.setState({
      loading: false,
      visible: false,
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  show({ data, title, text } = {}) {
    this.setState({
      visible: true,
      title,
      text
    });
    this.data = data;
    return new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }

  render() {
    const { visible, loading } = this.state;
    const { text, title, switchButtons, cancelText, confirmText, noOptions } = this.props;
    const footer = [
        <Button
          key="back"
          onClick={switchButtons ? this.onConfirm : this.onCancel}
          loading={switchButtons && loading}
          type={noOptions ? 'primary' : 'default'}>
        {cancelText || 'Hủy'}
      </Button >
    ];
    if (!this.props.noOptions) {
      footer.push(
        <Button
          key="submit"
          type="primary"
          onClick={switchButtons ? this.onCancel : this.onConfirm}
          loading={!switchButtons && loading}>
          {confirmText || 'Xác nhận'}
        </Button>
      )
    }
    return (
      <Modal
        visible={visible}
        title={this.state.title || this.props.title}
        onCancel={this.onCancel}
        footer={footer}
      >
        <div>{this.state.text || this.props.text}</div>
      </Modal>
    )
  }
}

export default ConfirmModal;
