import React, { Component, useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';
import { playAudio } from '../redux/actions';
import { ValueFn } from './index';

export function usePlaySound<C, V>(
  current: C,
  viewValue: V,
  playAudioWhen: ValueFn<C, V, string>
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
