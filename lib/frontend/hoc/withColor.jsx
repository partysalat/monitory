import React from 'react';
import Color from 'color';
import isFunction from 'lodash/isFunction';
import PropTypes from 'prop-types';
import { ThemeConsumer } from '../utils/Theme';


function getColors(color, theme) {
  const c = Color(color || theme.cardBackgroundColor);
  const isLightBackground = !!Math.round((c.red() + c.blue() + c.green()) / (255 * 3));
  return {
    fontColor: isLightBackground ? theme.cardFontColorDark : theme.cardFontColorBright,
    fontColorLight: isLightBackground ? theme.cardFontColorLightDark : theme.cardFontColorBrightLight,
    backgroundColor: c.string(),
  };
}

export default (WrappedComponent) => {
  const withColor = (props) => {
    const {
      color,
      current,
      last,
    } = props;
    const calculatedColor = isFunction(color) ? color({ current, last }) : color;

    return (
      <ThemeConsumer>
        {theme => (
          <WrappedComponent {...getColors(calculatedColor, theme)} {...props} />)}
      </ThemeConsumer>);
  };
  withColor.propTypes = {
    color: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
    ]),
    current: PropTypes.any.isRequired,
    last: PropTypes.any.isRequired,

  };
  return withColor;
};

