import React, { Component, useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';
import { playAudio } from '../redux/actions';
import { ValueFn } from './index';

export default function withAudio(WrappedComponent) {
  function mapStateToProps() {
    return {};
  }
  function mapDispatchToProps(dispatch) {
    return {
      playSound: (audioPath) => dispatch(playAudio(audioPath)),
    };
  }

  const WithAudio = class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        lastSound: false,
      };
    }

    static getDerivedStateFromProps(props, state) {
      const { playAudioWhen, current, viewValue, playSound } = props;

      const sound = isFunction(playAudioWhen)
        ? playAudioWhen(current, viewValue)
        : false;

      if (sound === state.lastSound) {
        return state;
      }

      if (isString(sound)) {
        playSound(sound);
      }
      return { lastSound: sound };
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

  WithAudio.propTypes = {
    playAudioWhen: PropTypes.func,
  };
  return connect(mapStateToProps, mapDispatchToProps)(WithAudio);
}

export function usePlaySound(
  current: any,
  viewValue: number | string,
  playAudioWhen: ValueFn<string>
): { lastSound: string } {
  const [lastSound, setLastSound] = useState<string>();
  const dispatch = useDispatch();
  const sound = isFunction(playAudioWhen)
    ? playAudioWhen(current, viewValue)
    : null;

  if (sound === lastSound) {
    return { lastSound };
  }

  if (isString(sound)) {
    dispatch(playAudio(sound));
    setLastSound(sound);
  }
  return { lastSound: sound };
}
