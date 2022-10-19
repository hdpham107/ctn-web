import _ from 'lodash';
import moment from 'moment-timezone';
import React from 'react';
import { constantHelpers } from '../../_helpers/constant';
import {
  Input, Button, InputNumber, DatePicker, Select
} from 'antd';
import OCDatePicker from './OCDatePicker';
import { utilHelpers } from '../../_helpers';
const { Option } = Select;

class EditableInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: true,
      edit: props.edit,
    }
  }

  componentWillReceiveProps({ edit }) {
    if (this.state.edit !== edit) {
      this.setState({
        edit: edit,
      });
    }
  }

  getValue() {
    return this.props.getValue
      ? this.props.getValue(this.state.edit)
      : _.get(this.state.edit, '[0].value');
  }

  resetEdit() {
    this.setState({
      view: true,
    })
  }

  change(key) {
    return function (e) {
      var edits = this.state.edit;
      var edit = _.find(edits, ['key', key]);
      if (!edit) {
        return;
      }
      if (_.has(e, 'target.value')) {
        edit.value = e.target.value;
      } else {
        edit.value = e;
      }
      this.setState({
        edit: edits,
      })
    }
  }

  save() {
    if (!this.props.onSave) {
      return;
    }
    this.setState({
      view: true,
      value: this.getValue(),
    });
    this.props.onSave(this.state.edit);
  }

  edit() {
    this.setState({
      view: false
    })
  }
  close() {
    this.setState({
      view: true,
    })
  }

  formatValue(edit, value) {
    const dataType = _.get(edit, '[0].dataType');
    if (dataType === constantHelpers.dataType.number.value) {
      return utilHelpers.formatNumber(value);
    }
    if (dataType === constantHelpers.dataType.date.value) {
      //if date is in format DD/MM/YYYY, no need to format,
      //else if it is in default format, format it accordingly
      const dateMoment = moment(value, 'DD/MM/YYYY', true);
      if (dateMoment.isValid()) {
        return value;
      }
      return moment.tz(value, 'Asia/Ho_Chi_Minh').format('DD/MM/YYYY');
    }
    if (dataType === constantHelpers.dataType.boolean.value) {
      return value === 0 ? 'Không' : 'Có';
    }
    return value;
  }

  render() {
    var { addTitle } = this.props;
    var { view, edit } = this.state;
    var value = this.getValue();
    var hasValue = !_.isNil(value);
    addTitle = addTitle || 'Thêm';
    if (view) {
      if (hasValue) {
        return <span className='editable-value' onClick={this.edit.bind(this)}>
          {this.formatValue(edit, value)}
        </span>
      }
      return <a className='editable-value' onClick={this.edit.bind(this)}>{addTitle}</a>
    }
    return (
      <div className='editable-input'>
        {
          _.map(edit, (inputKey, idx) => {
            return this.renderInput(inputKey)
          })
        }

        <div className='inline action-button'>
          <Button size='small' onClick={this.close.bind(this)} icon='close'></Button>
          <Button type='primary' size='small' icon='check'
            onClick={this.save.bind(this)}></Button>
        </div>
      </div>
    );
  }

  renderInput(inputKey) {
    if (!inputKey.dataType) {
      inputKey.dataType = constantHelpers.dataType.string.value;
    }
    switch (inputKey.dataType) {
      case constantHelpers.dataType.string.value:
        return <Input
          value={inputKey.value}
          placeholder={inputKey.placeHolder}
          className='input-small'
          onChange={this.change(inputKey.key).bind(this)}
          onPressEnter={this.save.bind(this)} />
      case constantHelpers.dataType.number.value:
        return <InputNumber
          value={inputKey.value}
          placeholder={inputKey.placeHolder}
          className='input-small'
          onChange={this.change(inputKey.key).bind(this)}
          onPressEnter={this.save.bind(this)} />
      case constantHelpers.dataType.date.value:
        return <OCDatePicker inputKey={inputKey}
          onChange={this.change(inputKey.key).bind(this)}
          onSave={this.save.bind(this)} />
      case constantHelpers.dataType.boolean.value:
        return <Select style={{ width: '100%' }}
          defaultValue={!_.isNil(inputKey.value) ? inputKey.value : ''}
          className='input-small'
          onChange={this.change(inputKey.key).bind(this)}
          onPressEnter={this.save.bind(this)} >
          <Option value={''}> - </Option>
          <Option value={1}>Có</Option>
          <Option value={0}>Không</Option>
        </Select>

      case constantHelpers.dataType.list.value:
        return (
          <Select style={{ width: '100%' }}
            defaultValue={inputKey.value || ''}
            className='input-small'
            onChange={this.change(inputKey.key).bind(this)}
            onPressEnter={this.save.bind(this)} >
            <Option value={''}> - </Option>
            {
              (inputKey.dataDefaultValues || []).map(value => {
                return <Option value={value}>{value}</Option>
              })
            }
          </Select>
        )
    }
  }
}

export default EditableInput;
