import React from 'react';
import Color from 'color';
import isFunction from 'lodash/isFunction';
import PropTypes from 'prop-types';
import { ThemeConsumer } from '../utils/Theme';


function getColors(color, theme) {
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

export default (WrappedComponent) => {
  const withColor = (props) => {
    const {
      color,
      current,
      viewValue,
    } = props;
    const calculatedColor = isFunction(color) ? color(current, viewValue) : color;

    return (
      <ThemeConsumer>
        {theme => (
          <WrappedComponent {...getColors(calculatedColor, theme)} {...props} />)
        }
      </ThemeConsumer>);
  };
  withColor.propTypes = {
    color: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
    ]),
    current: PropTypes.any,
    viewValue: PropTypes.any,
  };
  return withColor;
};

