import _ from 'lodash';
import fp from 'lodash/fp';
import React from 'react';
import { connect } from 'react-redux';
import uuidv1 from 'uuid/v1';
import moment from 'moment-timezone';
import { Radio, Menu, Icon, Input, Dropdown, Button, Form, Select, } from 'antd';

import db from '../../common/db';
import { removeVietnameseAccents } from '../../_helpers';
import { getInitialPredicate, PredicateEdit } from '../../components/predicate-edit/PredicateEdit';
import { campaignFields } from '../../constants/app';

const mapStateToProps = (state, ownProps) => {
  const allFields = fp.concat(ownProps.fields || campaignFields, fp.map(field => ({
    icon: '/images/field/icon-default.png',
    title: field.name,
    field: 'customFields.' + field.code,
    type: field.dataType,
    resourceType: 'user',
  }), state.customField.fields));

  const segmentIds = state.campaign.segmentIds;
  const segmentTable = db.getTable(state, db.tableNames.userSegments);
  const segments = db.getMany(segmentTable, segmentIds);
  return {
    allFields,
    customFields: state.customField.fields,
    labels: fp.get('label.labels', state) || [],
    segments,
    segmentIds,
    campaign: state.campaign.editing.campaign,
  };
};

const mapDispatchToProps = dispatch => ({
  // conditionUpdated: fp.compose(dispatch, actions.conditionUpdated),
});

function _normalize(str) {
  return removeVietnameseAccents(str).toLowerCase().replace(/\s+/, '');
}

const booleanOptions = [{ value: 1, label: 'đúng' }, { value: 0, label: 'sai' }];

const defaultTimezone = 'Asia/Ho_Chi_Minh';

const stringOpMappings = {
  startWith: 'startsWith',
  endWith: 'endsWith',
  unknown: 'notExists',
  known: 'any',
};

const dateOpMappings = {
  gt: 'after',
  lte: 'before',
  eq: 'on',
};

const dateFormat = 'DD/MM/YYYY';

const _conditionToConditionItemsReduce = context => (conditionItems, condition) => {
  const allFields = context.allFields;
  const { name, attribute } = condition;
  const id = uuidv1();
  const currentFieldInfo = fp.find(
    f => (
      condition.triggerOnly
        ? f.triggerType === condition.triggerType
        : f.field === condition.attribute
    ),
    allFields,
  );
  const title = currentFieldInfo.title || name || attribute;
  const icon = currentFieldInfo.icon;
  if (attribute === 'label') {
    return conditionItems.concat({
      field: {
        title,
        icon,
        type: 'select2way',
        options: context.labels.map(label => ({
          value: label._id,
          label: label.title
        })),
      },
      id,
      name,
      attribute,
      op: condition.comparison,
      value: condition.value,
    });
  }
  switch (condition.type) {
    case 'string': {
      if (condition.attribute === 'clientType') {
        // for now only zalo
        return conditionItems.concat({
          field: {
            title,
            icon,
            type: 'tag',
            triggerOnly: currentFieldInfo.triggerOnly,
            triggerType: currentFieldInfo.triggerType,
          },
          attribute,
          name,
          value: condition.value,
          id,
        });
      }
      return conditionItems.concat({
        field: {
          title,
          icon,
          type: 'string',
          triggerOnly: currentFieldInfo.triggerOnly,
          triggerType: currentFieldInfo.triggerType,
        },
        id,
        name,
        attribute,
        op: stringOpMappings[condition.comparison] || condition.comparison,
        value: condition.value,
      });
    }
    case 'date':
      return conditionItems.concat({
        field: {
          title,
          icon,
          type: 'date',
          triggerOnly: currentFieldInfo.triggerOnly,
          triggerType: currentFieldInfo.triggerType,
        },
        id,
        name,
        attribute,
        op: dateOpMappings[condition.comparison],
        value: {
          dateFormat,
          date: moment.tz(condition.value, defaultTimezone).format(dateFormat),
        },
      });
    case 'number':
      return conditionItems.concat({
        field: {
          title,
          icon,
          type: 'number',
          options: null, // currentFieldInfo.triggerType === 'presenceDuration' ? { eqOnly: true } : null,
          triggerOnly: currentFieldInfo.triggerOnly,
          triggerType: currentFieldInfo.triggerType,
        },
        id,
        name,
        attribute,
        op: condition.comparison,
        value: condition.value,
      });
    case 'boolean':
      return conditionItems.concat({
        field: {
          title,
          icon,
          type: 'select',
          options: booleanOptions,
          triggerOnly: currentFieldInfo.triggerOnly,
          triggerType: currentFieldInfo.triggerType,
        },
        id,
        name,
        attribute,
        op: condition.comparison,
        value: condition.value,
      });
    case 'list':
      return conditionItems.concat({
        field: {
          title,
          icon,
          type: 'exactValue',
          triggerOnly: currentFieldInfo.triggerOnly,
          triggerType: currentFieldInfo.triggerType,
        },
        id,
        name,
        attribute,
        op: condition.comparison,
        value: condition.value,
      });
    default:
      return conditionItems;
  }
};

const _conditionItemToConditionsReduce = (conditionsAcc, conditionItem) => {
  const { name, attribute } = conditionItem;
  switch (conditionItem.field.type) {
    case 'string':
      if (conditionItem.field.triggerOnly) {
        return conditionsAcc.concat({
          triggerType: conditionItem.field.triggerType,
          triggerOnly: true,
          type: 'string',
          comparison: fp.findKey(fp.isEqual(conditionItem.op), stringOpMappings) || conditionItem.op,
          value: conditionItem.value,
        });
      }
      return conditionsAcc.concat({
        name,
        attribute,
        type: 'string',
        comparison: fp.findKey(fp.isEqual(conditionItem.op), stringOpMappings) || conditionItem.op,
        value: conditionItem.value,
      });
    case 'date':
      return conditionsAcc.concat({
        name,
        attribute,
        type: 'date',
        comparison: fp.findKey(fp.isEqual(conditionItem.op), dateOpMappings),
        value: moment.tz(conditionItem.value.date, conditionItem.value.dateFormat, defaultTimezone).toISOString(),
      });
    case 'tag':
      return conditionsAcc.concat({
        name,
        attribute,
        type: 'string',
        comparison: 'eq',
        value: conditionItem.value,
      });
    case 'number': {
      if (conditionItem.field.triggerOnly) {
        return conditionsAcc.concat({
          triggerType: conditionItem.field.triggerType,
          triggerOnly: true,
          type: 'number',
          comparison: conditionItem.op,
          value: conditionItem.value,
        });
      }
      return conditionsAcc.concat({
        name,
        attribute,
        type: 'number',
        comparison: conditionItem.op,
        value: conditionItem.value,
      });
    }
    case 'select':
    case 'select2way':
      // for now there's only boolean that's a select type
      return conditionsAcc.concat({
        name,
        attribute,
        type: 'boolean',
        comparison: conditionItem.op,
        value: conditionItem.value,
      });
    case 'exactValue':
      return conditionsAcc.concat({
        name,
        attribute,
        type: 'list',
        comparison: conditionItem.op,
        value: conditionItem.value,
      });
    default:
      return conditionsAcc;
  }
};

class UserFilter extends React.Component {
  constructor(props) {
    super(props);
    const { allFields, labels } = this.props;
    this.state = {
      conditionCombination: 'and',
      searchTerm: '',
      conditionItems: fp.reduce(
        _conditionToConditionItemsReduce({ allFields, labels }),
        [],
        [], // _.get(condition, 'conditions', []), // Input condition
      ),
    };
  }

  onFieldSelect(_field) {
    const field = fp.pick(['title', 'icon', 'type'], _field);
    if (field.type === 'boolean') {
      field.type = 'select';
      field.options = booleanOptions;
    }
    if (_field.type === 'list') {
      field.type = 'exactValue';
    }
    if (_field.triggerOnly) {
      field.triggerOnly = true;
      field.triggerType = _field.triggerType;
      // if (field.triggerType === 'presenceDuration') {
      //   field.options = { eqOnly: true };
      // }
    }
    if (_field.type === 'label') {
      field.type = 'select2way';
      field.options = this.props.labels.map(label => ({
        value: label._id,
        label: label.title
      }));
    }
    if (field.type === 'tag') {
      field.data = _field.data;
    }
    const initialPredicate = getInitialPredicate(field);
    const conditionItems = [...this.state.conditionItems || [], {
      field,
      op: fp.get('operation.name', initialPredicate),
      value: fp.isNil(initialPredicate.value) ? _field.value : initialPredicate.value,
      name: _field.title || _field.name || _field.field,
      attribute: _field.field,
      openImmediately: true,
      id: uuidv1(),
    }];
    this.setState({ conditionItems });
    const { segmentId, conditionCombination, useSegment } = this.state;
    const condition = this._getCondition(segmentId, conditionCombination, useSegment, conditionItems);
    this.conditionUpdated(condition);
  }

  setCondition(condition) {
    if (_.isEqual(this.state.condition, condition)) {
      return;
    }
    const { allFields, labels } = this.props;
    this.setState({
      condition,
      conditionItems: fp.reduce(
        _conditionToConditionItemsReduce({ allFields, labels }),
        [],
        _.get(condition, 'conditions', []),
      ),
    });
  }

  _getCondition(segmentId, conditionCombination, useSegment, conditionItems) {
    return useSegment
      ? {
        type: 'segment',
        segmentId,
      }
      : {
        type: conditionCombination,
        conditions: fp.reduce(
          _conditionItemToConditionsReduce,
          [],
          conditionItems,
        ),
      };
  }

  getCondition() {
    const { segmentId, conditionCombination, useSegment, conditionItems } = this.state;
    return this._getCondition(segmentId, conditionCombination, useSegment, conditionItems);
  }

  conditionItemUpdated(conditionItemId, predicate) {
    const conditionItems = fp.map(conditionItem => {
      if (conditionItem.id !== conditionItemId) {
        return conditionItem;
      }
      return {
        ...conditionItem,
        op: fp.get('operation.name', predicate),
        value: predicate.value,
      };
    }, this.state.conditionItems) || [];
    this.setState({
      conditionItems,
    });

    const { segmentId, conditionCombination, useSegment } = this.state;
    const condition = this._getCondition(segmentId, conditionCombination, useSegment, conditionItems);
    this.conditionUpdated(condition);
  }

  removeConditionItem = conditionItemId => {
    const conditionItems =
      fp.reject(conditionItem => conditionItem.id === conditionItemId, this.state.conditionItems) || [];
    this.setState({
      conditionItems,
    });
    const { segmentId, conditionCombination, useSegment } = this.state;
    const condition = this._getCondition(segmentId, conditionCombination, useSegment, conditionItems);
    this.conditionUpdated(condition);
  }

  handleInputSearch = e => {
    this.setState({
      searchTerm: e.target.value,
    });
  }

  renderConditionItem = conditionItem => {
    const self = this;
    if (!conditionItem) {
      return;
    }
    // using the key prop here makes React re-instantiate the component instead of
    // reusing the instance
    return (
      <div style={{ display: 'inline-block', marginRight: '9px', marginTop: '5px' }} key={conditionItem.id}>
        <PredicateEdit
          field={conditionItem.field}
          options={conditionItem.field.options || {}}
          openImmediately={conditionItem.openImmediately}
          onRemove={self.removeConditionItem.bind(self, conditionItem.id)}
          onChange={predicate => self.conditionItemUpdated(conditionItem.id, predicate)}
          op={conditionItem.op} value={conditionItem.value} />
      </div>
    );
  }

  render() {
    const self = this;
    const { searchTerm } = this.state;
    const { allFields } = this.props;
    const a = _normalize(searchTerm);
    const shownFields = fp.filter(
      field => {
        if (field.notSelectable) {
          return true;
        }
        return fp.compose(fp.includes(_normalize(searchTerm)), _normalize, fp.get('title'))(field);
      },
      allFields,
    );
    const fieldsMenu = (
      <Menu className='user-filter user selection-menu' style={{ maxHeight: '300px', overflowY: 'auto' }}>
        <div className='selection-search'>
          <Icon type='search' />
          <Input
            autoFocus
            className='input-search-form'
            placeholder='Tìm kiếm'
            value={searchTerm}
            onChange={this.handleInputSearch} />
        </div>
        <Menu.Divider />
        {
          shownFields.map(field => {
            if (field.notSelectable) {
              return (<Menu.Item className='menu-item-part' key={field.title + '-notSelectable'} disabled={field.notSelectable} >
                <span>{field.title}</span>
              </Menu.Item>);
            }
            return (
              <Menu.Item
                className='middle'
                key={field.title}
                disabled={field.notSelectable}
                onClick={self.onFieldSelect.bind(self, field)}>
                <div className='field-icon' style={{ backgroundImage: 'url(' + field.icon + ')' }} />
                <span>{field.title}</span>
              </Menu.Item>
            );
          })
        }
      </Menu>
    );
    return (
      <div className='condition-action-wrapper'>
        {fp.map(this.renderConditionItem, this.state.conditionItems)}
        <Dropdown overlay={fieldsMenu}>
          <Button
            type="link" icon="plus"
            style={{ display: 'inline-block' }}
            className='bold-btn add-more'>
            Thêm điều kiện
          </Button>
        </Dropdown>
        { this.props.saveIcon }
      </div>
    );
  }

  combinationChanged = value => {
    this.setState({
      conditionCombination: value,
    });
    const { segmentId, conditionItems, useSegment } = this.state;
    const condition = this._getCondition(segmentId, value, useSegment, conditionItems);
    this.conditionUpdated(condition);
  }

  conditionUpdated(condition) {
    if (!this.props.conditionUpdated) {
      return;
    }
    this.props.conditionUpdated(condition);
  }

  useSegmentChanged = e => {
    e.preventDefault();
    this.setState({
      useSegment: e.target.value,
    });
    const { segmentId, conditionItems, conditionCombination } = this.state;
    const condition = this._getCondition(segmentId, conditionCombination, e.target.value, conditionItems);
    this.conditionUpdated(condition);
  }

  segmentChanged = value => {
    this.setState({
      segmentId: value,
    });
    const { useSegment, conditionItems, conditionCombination } = this.state;
    const condition = this._getCondition(value, conditionCombination, useSegment, conditionItems);
    this.conditionUpdated(condition);
  }

  renderCombinationTypeDropdown(campaign) {
    const { conditionCombination } = this.state;
    return (
      <Select
        value={conditionCombination}
        onChange={this.combinationChanged}
        style={{ maxWidth: '100px' }}>
        <Select.Option key='and' value='and'>Tất cả</Select.Option>
        <Select.Option key='or' value='or'>Bất kỳ</Select.Option>
      </Select>
    );
  }

  renderSegmentSelect() {
    const { segments } = this.props;
    const { useSegment, segmentId } = this.state;
    return (
      <Form.Item style={{ minHeight: '100px', borderBottom: '2px solid rgba(189, 189, 189, 0.4)' }}>
        <Radio.Group style={{ fontWeight: 500 }} onChange={this.useSegmentChanged} value={useSegment}>
          <Radio value={true} style={{ marginRight: '20px' }}>
            Nhóm khách hàng định sẵn
          </Radio>
          <Radio value={false}>
            Nhóm khách hàng tùy chọn
          </Radio>
        </Radio.Group>
        {useSegment && segments
          ? <Select value={segmentId} onChange={this.segmentChanged} style={{ maxWidth: '200px', display: 'block' }}>
            {segments.map(segment => (
              <Select.Option key={segment._id} value={segment._id}>
                {segment.name}
              </Select.Option>
            ))
            }
          </Select>
          : null
        }
      </Form.Item>
    )
  }

}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { withRef: true },
)(UserFilter);
