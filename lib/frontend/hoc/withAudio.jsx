import React from 'react';
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

  const WithAudio = (props) => {
    const {
      playAudioWhen,
      current,
      viewValue,
    } = props;

    const sound = isFunction(playAudioWhen) ? playAudioWhen(current, viewValue) : false;

    if (sound) {
      props.playSound(sound);
    }

    return <WrappedComponent {...props} />;
  };

  WithAudio.propTypes = {
    playAudioWhen: PropTypes.func.isRequired,
  };
  return connect(mapStateToProps, mapDispatchToProps)(WithAudio);
}
