import React, { Component } from 'react';
import { connect } from 'react-redux';
import { subscribe } from '../redux/actions';

class Card extends Component {
  componentWillMount() {
    this.props.subscribe(this.props.job);
  }

  render() {

    return (
      <div>Foooooo</div>
    );
  }
}
function mapStateToProps(state) {
  return {
  };
}
function mapDispatchToProps(dispatch) {
  return {
    subscribe: jobId => dispatch(subscribe(jobId)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Card);
