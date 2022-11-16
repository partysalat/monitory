import React from 'react';
import Color from 'color';
import isFunction from 'lodash/isFunction';
import PropTypes from 'prop-types';
import { Theme, ThemeConsumer, useGetTheme } from '../utils/Theme';
import { ValueFn } from './index';

function getColors(color: string, theme: Theme) {
  const c = Color(color || theme.cardBackgroundColor);
  const isLightBackground = !!Math.round(
    (c.red() + c.blue() + c.green()) / (255 * 3)
  );
  const {
    cardFontColorDark,
    cardFontColorBright,
    cardFontColorLightDark,
    cardFontColorBrightLight,
  } = theme;
  return {
    fontColor: isLightBackground ? cardFontColorDark : cardFontColorBright,
    fontColorLight: isLightBackground
      ? cardFontColorLightDark
      : cardFontColorBrightLight,
    backgroundColor: c.string(),
  };
}

export function useColor<C, V>(
  current: C,
  viewValue: V,
  color: ValueFn<C, V, string>
) {
  const theme = useGetTheme();
  const calculatedColor = isFunction(color) ? color(current, viewValue) : color;

  return getColors(calculatedColor, theme);
}
