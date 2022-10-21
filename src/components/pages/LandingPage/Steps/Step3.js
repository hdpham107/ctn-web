import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import _ from "lodash";
import moment from "moment";
import {
  Form,
  Input,
  Button,
  Select,
  Layout,
  Col,
  Row,
  DatePicker,
  TimePicker,
  Icon,
  Tooltip,
  Tabs,
  Table,
} from "antd";

const { Content } = Layout;
const { TabPane } = Tabs;
const { Option } = Select;

class Step3 extends React.Component {
  constructor(props) {
    super();
    this.state = {};
  }
  render() {
    const { submitTarget } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
        <strong style={{ fontSize: 16 }}>Thông tin cập nhật</strong>
        <form style={{ marginTop: 10 }}>
          <div className="row g-3">
            <div className="col-md-12">
              <div className="form-floating">
                <Input
                  type="text"
                  className="form-control bg-light border-0"
                  id="name"
                  placeholder="Họ & Tên"
                />
                <label for="name">Họ & Tên</label>
              </div>
            </div>
          </div>
        </form>
        <div className="col-12" style={{ marginTop: 10 }}>
          <button
            className="btn btn-primary w-100 py-3"
            type="submit"
            onClick={() => {
              this.props.redirect({
                redirectTo: submitTarget,
              });
            }}
          >
            Hoàn thành
          </button>
        </div>
      </div>
    );
  }
}

const WrappedDynamicRule = Form.create({ name: "dynamic_rule" })(Step3);

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  redirect: (payload) => dispatch({ type: "REDIRECT_TO", payload }),
});
export default connect(mapStateToProps, mapDispatchToProps)(WrappedDynamicRule);
