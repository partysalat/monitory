import React from 'react';
import Color from 'color';
import isFunction from 'lodash/isFunction';
import PropTypes from 'prop-types';

function getColors(color = '#fff') {
  const c = Color(color);
  const isLightBackground = !!Math.round((c.red() + c.blue() + c.green()) / (255 * 3));
  return {
    fontColor: isLightBackground ? 'rgba(0,0,0,1)' : 'rgba(255,255,255,1)',
    fontColorLight: isLightBackground ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.7)',
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
    const colorValues = getColors(isFunction(color) ? color({ current, last }) : color);

    return <WrappedComponent {...colorValues} {...props} />;
  };
  withColor.propTypes = {
    color: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
    ]),
    current: PropTypes.any.isRequired,
    last: PropTypes.any.isRequired,

  };
  withColor.defaultProps = {
    color: '#fff',
  };
  return withColor;
};

