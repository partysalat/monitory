import React from 'react';
import styled from 'styled-components';
import { compose } from 'redux';
import { withColor, withShowWhen, withViewValue, withSubscription, withAlert } from '../hoc';
import Base from '../utils/Base';
import PropTypes from 'prop-types';


const FailedBuildSteps = styled.ul`
  font-size:1rem;
`;


const List = (props) => {
  const {
    viewValue = [],
  } = props;

  return (
    <Base {...props}>
      <FailedBuildSteps>
        {viewValue.map(step => <li key={step}>{step}</li>)}
      </FailedBuildSteps>
    </Base>);
};


export default compose(
  withSubscription,
  withViewValue,
  withColor,
  withShowWhen,
  withAlert,
)(List);

List.propTypes = {
  viewValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};
