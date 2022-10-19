import React from "react";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  ...state.common,
});
const mapDispatchToProps = dispatch => ({
});

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return <div></div>;
    if (!this.props.app || !this.props.currentAgent) {
      return <div></div>;
    }
    // return <Redirect to= { '/app/' + this.props.app._id + '/inbox' } />
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
