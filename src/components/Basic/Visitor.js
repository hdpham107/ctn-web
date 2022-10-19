
import _ from 'lodash';
import React from 'react';
import { connect } from "react-redux";
import {
} from 'antd';
import EditableInput from '../Basic/EditableInput';
import VisitorAvatar from '../Photo/VisitorAvatar';

class Visitor extends React.Component {
  saveName(editConfig) {
    var data = {};
    _.each(editConfig, edit => {
      data[edit.key] = edit.value;
    })
    this.props.updateVisitorDetail(this.props.visitor._id, data);
  }

  getName(editValue) {
    var value = _.trim(_.get(editValue, '[0].value', ''));
    var lastName =  _.trim(_.get(editValue, '[1].value', ''));
    if (lastName) {
      value += ' ' + editValue[1].value;
    }
    return value;
  }

  renderLocation(visitor) {
    if (!_.has(visitor, 'geoLocation.city')) {
      return;
    }
    return (
      <div className='location'>
        <img src='/images/field/icon-location.svg' width={8}/>
        <span className="right-key">
          { _.get(visitor.geoLocation, 'city','') + ', ' +  _.get(visitor.geoLocation, 'country', '') }
        </span>
      </div>
    )
  }

  render() {
    var {visitor} = this.props;
    if (!visitor) {
      return <div></div>;
    }
    return (
      <div className='visitor'>
        <div style={{ marginLeft: 10, float: "left" }}>
          <VisitorAvatar size={40} visitor={visitor} />
        </div>
        <div style={{ marginLeft: 12, float: "left" }}>
          <div className="name">
            <EditableInput
              addTitle={'Chưa có tên'}
              getValue={this.getName}
              edit={[
                {
                  placeHolder: 'Tên',
                  key: 'firstName',
                  value: visitor.nameGenerated ? '': visitor.firstName
                },
                {
                  placeHolder: 'Họ và tên đệm',
                  key: 'lastName',
                  value: visitor.nameGenerated ? '': visitor.lastName
                }
              ]}
              onSave={this.saveName.bind(this)}/>
          </div>
          { this.renderLocation(visitor)}
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  updateVisitorDetail: (visitorId, data) => {

  },
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Visitor);