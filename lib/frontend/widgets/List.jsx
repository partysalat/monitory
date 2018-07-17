import React from 'react';
import styled from 'styled-components';
import { compose } from 'redux';
import withSubscription from '../hoc/withSubscription';
import withSingleViewValue from '../hoc/withSingleViewValue';
import withColor from '../hoc/withColor';
import withShowWhen from '../hoc/withShowWhen';
import Base from '../utils/Base';


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
  withSingleViewValue,
  withColor,
  withShowWhen,
)(List);

