import React from 'react';
import styled, { keyframes } from 'styled-components';
import { flipInX } from 'react-animations';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { Bolt } from 'styled-icons/fa-solid/Bolt';
import { Search } from 'styled-icons/fa-solid/Search';
import isObject from 'lodash/isObject';
import { withSubscription, withViewValue } from '../hoc';
import Base from '../utils/Base';
import Content from '../styled/Content';


const bounceAnimation = keyframes`${flipInX}`;


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
  animation: 1s ${bounceAnimation};
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
  color:white;
  display:flex;
  align-items: center;
  justify-content:center;
  flex: 0 0 auto;
  margin-right: 5px;  
`;
const StyledBolt = Bolt.extend`
  height: 15px;
`;
const StyledSearch = Search.extend`
  height: 15px;
`;
const Build = styled.div`
  flex: 1 1 auto;
`;
const Assignee = styled.div`
  font-size: 0.7rem;
`;
const ListItem = (props) => {
  let {
    build,
  } = props;
  build = isObject(build) ? build : { name: build };
  const { name, assignee } = build;

  const assigneeName = assignee || 'Nobody';
  const Icon = assignee ? <StyledSearch /> : <StyledBolt />;
  return (
    <StyledLi>
      <Status style={{ background: assignee ? '#efd700' : 'red' }}>
        {Icon}
      </Status>
      <Build>
        <div>{name}</div>
        <Assignee>{assigneeName} assigned</Assignee>
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

};
