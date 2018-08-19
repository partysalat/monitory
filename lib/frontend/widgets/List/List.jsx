import React from 'react';
import styled from 'styled-components';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { withSubscription, withViewValue } from '../../hoc';
import Base from '../../utils/Base';
import Content from '../../utils/Content';
import ListItem from './ListItem';


const FailedBuildSteps = styled.ul`
  font-size:1rem;
  margin: 0;
  padding: 0;
  width: 100%;
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
          {viewValue.map(build => <ListItem key={build} build={build} />)}
        </FailedBuildSteps>
      </BaselineContent>
    </Base>);
};


export default compose(
  withSubscription,
  withViewValue,
)(List);

List.propTypes = {
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
  ]).isRequired,
  cols: PropTypes.number,
  rows: PropTypes.number,
  value: PropTypes.func,
  playAudioWhen: PropTypes.func,
};
