import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default WrappedComponent => class extends Component {
    static propTypes = {
      src: PropTypes.string.isRequired,
      interval: PropTypes.number,
    }
    constructor(props) {
      super(props);
      this.state = {
        newSrc: props.src,
        lastUpdated: new Date(),

      };
    }

    componentWillMount() {
      if (!this.props.interval) {
        return;
      }
      this.interval = setInterval(() => {
        this.setState({
          newSrc: `${this.props.src}?r=${new Date().getTime()}`,
          lastUpdated: new Date(),
        });
      }, this.props.interval);
    }
    componentWillUnmount() {
      clearInterval(this.interval);
    }

    render() {
      return (<WrappedComponent
        {...this.props}
        src={this.state.newSrc}
        lastUpdated={this.state.lastUpdated}
      />);
    }
};
