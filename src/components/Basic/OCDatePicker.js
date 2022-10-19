import _ from 'lodash';
import moment from 'moment';
import React from 'react';
import { DatePicker } from 'antd';
const DEFAULT_FORMAT = 'DD/MM/YYYY';

class OCDatePicker extends React.Component {
  render() {
    var inputKey = this.props.inputKey || {};
    let value;
    //check if date is in format DD/MM/YYYY or default format and parse it accordingly
    if (!inputKey.value) {
      value = moment();
    } else {
      const temp = moment(inputKey.value, 'DD/MM/YYYY', true);
      if (temp.isValid()) {
        value = temp;
      } else {
        value = moment(inputKey.value).tz('Asia/Ho_Chi_Minh');
      }
    }
    return <DatePicker
      format={DEFAULT_FORMAT}
      value={value}
      placeholder={inputKey.placeHolder}
      className='input-small'
      onChange={this.change.bind(this)}
      onPressEnter={this.props.onSave} />
  }

  change(date) {
    this.props.onChange(date ? date.tz('Asia/Ho_Chi_Minh') : null);
  }
}

export default OCDatePicker;
