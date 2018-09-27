import React from 'react';
import Color from 'color';
import isFunction from 'lodash/isFunction';
import {ThemeConsumer, Theme} from '../utils/Theme';

interface WithColorProps<T, U> {
    current: T,
    viewValue: U,
    color: (current: T, viewValue: U) => string | string
}

function getColors(color:string, theme:Theme) {
  const c = Color(color || theme.cardBackgroundColor);
  const isLightBackground = !!Math.round((c.red() + c.blue() + c.green()) / (255 * 3));
  const {
    cardFontColorDark,
    cardFontColorBright,
    cardFontColorLightDark,
    cardFontColorBrightLight,
  } = theme;
  return {
    fontColor: isLightBackground ? cardFontColorDark : cardFontColorBright,
    fontColorLight: isLightBackground ? cardFontColorLightDark : cardFontColorBrightLight,
    backgroundColor: c.string(),
  };
}

export default <T,U>(WrappedComponent: typeof React.Component) => {
  return (props: WithColorProps<T,U>) => {
    const {
      color,
      current,
      viewValue,
    } = props;
    const calculatedColor = isFunction(color) ? color(current, viewValue) : color;

    return (
      <ThemeConsumer>
        {(theme:Theme )=> (
          <WrappedComponent {...getColors(calculatedColor, theme)} {...props} />)
        }
      </ThemeConsumer>);
  };
};

