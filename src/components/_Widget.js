import _ from 'lodash';
import React from "react";
import { connect } from "react-redux";
import { utilHelpers } from '../_helpers';

const mapStateToProps = state => ({
  ...state.home,
  ...state.common,
});
const mapDispatchToProps = dispatch => ({
});

class ComingSoon extends React.Component {
  render() {
    const {app} = this.props;
    return (
      <div>
         { app ?
        <pre>
          { utilHelpers.getWidgetToken(app) }
        </pre>
        : null
        }
      </div>
    );
  }
}

export default connect( 
  mapStateToProps,
  mapDispatchToProps
)(ComingSoon);


