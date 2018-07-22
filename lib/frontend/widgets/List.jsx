import React from 'react';
import styled from 'styled-components';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { withColor, withShowWhen, withViewValue, withSubscription, withAlert } from '../hoc';
import Base from '../utils/Base';
import Content from '../styled/Content';


const FailedBuildSteps = styled.ul`
  font-size:1rem;
`;
const BaselineContent = Content.extend`
  align-items: baseline;
  justify-content: flex-start;
`;

const List = (props) => {
  const {
    viewValue = [],
  } = props;

  return (
    <Base {...props} >
      <BaselineContent>
        <FailedBuildSteps>
          {viewValue.map(step => <li key={step}>{step}</li>)}
        </FailedBuildSteps>
      </BaselineContent>
    </Base>);
};


export default compose(
  withSubscription,
  withViewValue,
)(List);

List.propTypes = {
  viewValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};
