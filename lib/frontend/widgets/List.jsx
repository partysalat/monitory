import React from 'react';
import styled from 'styled-components';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { withSubscription, withViewValue } from '../hoc';
import Base from '../utils/Base';
import Content from '../styled/Content';
import { Bolt } from 'styled-icons/fa-solid/Bolt';

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

const StyledLi = styled.li`
  list-style: none;
  padding: 5px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
`;

const Status = styled.div`
  border-radius: 50%;
  height: 30px;
  width: 30px;
  color: white;
  background: red;
  display:flex;
  align-items: center;
  justify-content:center;
  flex: 0 0 auto;
  margin-right: 5px;  
`;
const StyledBolt = Bolt.extend`
  height: 15px;
`;
const Build = styled.div`
  flex: 1 1 auto;
`;
const Assignee = styled.div`
  font-size: 0.7rem;
`;
const ListItem = (props) => {
  const {
    build,
  } = props;

  return (
    <StyledLi>
      <Status >
        <StyledBolt />
      </Status>
      <Build>
        <div>{build}</div>
        <Assignee>Nobody assigned</Assignee>
      </Build>
    </StyledLi>);
};

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
  viewValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};
