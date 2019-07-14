import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { isFunction } from 'lodash';

import { withSubscription, withViewValue } from '../hoc';
import Base from '../utils/Base';
import Content from '../utils/Content';

const Card = (props) => {
  const {
    children,
    viewValue,
    current,
  } = props;
  return (
    <Base {...props}>
      <Content>
        {isFunction(children) ? children(current, viewValue) : children}
      </Content>
    </Base>
);
};


export default compose(
  withSubscription,
  withViewValue,
)(Card);

Card.propTypes = {
  job: PropTypes.string.isRequired,
  title: PropTypes.string,
  showWhen: PropTypes.func,
  color: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  alert: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool,
  ]),
  cols: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.func,
  ]),
  rows: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.func,
  ]),
  value: PropTypes.func,

};
