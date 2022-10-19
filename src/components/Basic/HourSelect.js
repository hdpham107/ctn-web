import React from 'react';
import { Select } from 'antd';
import moment from 'moment';

const hours = [
  '00:00',
  '01:00',
  '02:00',
  '03:00',
  '04:00',
  '05:00',
  '06:00',
  '07:00',
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
  '22:00',
  '23:00',
  '24:00',
];

const defaultTimeFormat = 'HH:mm';

class HourSelect extends React.Component {
  constructor(props) {
    super(props);
  }

  onChange = value => {
    if (!this.props.onChange) {
      return;
    }

    const result = this.props.format
      ? moment(value, defaultTimeFormat).format(this.props.format)
      : value;
    this.props.onChange(result);
  }

  render() {
    const valueInDefaultFormat = this.props.value
      ? (
          this.props.format
            ? moment(this.props.value, this.props.format).format(defaultTimeFormat)
            : this.props.value
        )
      : null;
    return (
      <Select value={ valueInDefaultFormat } style={{ minWidth: '80px' }} onChange={ this.onChange }>
        { hours.map(hour => <Select.Option key={ hour } value={ hour }>{ hour }</Select.Option>) }
      </Select>
    );
  }
}

export default HourSelect;
