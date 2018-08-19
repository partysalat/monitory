import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isFunction from 'lodash/isFunction';
import { playAudio } from '../redux/actions';

export default function withAudio(WrappedComponent) {
  function mapStateToProps() {
    return { };
  }
  function mapDispatchToProps(dispatch) {
    return {
      playSound: audioPath => dispatch(playAudio(audioPath)),
    };
  }

  const WithAudio = class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        audioPlayed: false,
      };
    }


    componentWillReceiveProps(props) {
      const {
        playAudioWhen,
        current,
        viewValue,
        playSound,
      } = props;

      const sound = isFunction(playAudioWhen) ? playAudioWhen(current, viewValue) : false;

      if (sound && this.state.audioPlayed) {
        return;
      }

      if (sound) {
        playSound(sound);
        this.setState({ audioPlayed: true });
      } else {
        this.setState({ audioPlayed: false });
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

  WithAudio.propTypes = {
    playAudioWhen: PropTypes.func.isRequired,
  };
  return connect(mapStateToProps, mapDispatchToProps)(WithAudio);
}
