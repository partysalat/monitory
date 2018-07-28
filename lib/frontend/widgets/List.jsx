import React from 'react';
import styled, { keyframes } from 'styled-components';
import { flipInX } from 'react-animations';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { Bolt as ErrorIcon } from 'styled-icons/fa-solid/Bolt';
import { Search as InvestigateIcon } from 'styled-icons/fa-solid/Search';
import isObject from 'lodash/isObject';
import { withSubscription, withViewValue } from '../hoc';
import Base from '../utils/Base';
import Content from '../utils/Content';
import { ThemeConsumer } from '../utils/Theme';


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
  height: 1.875rem;
  width: 1.875rem;
  color:white;
  display:flex;
  align-items: center;
  justify-content:center;
  flex: 0 0 auto;
  margin-right: 5px;  
`;
const StyledErrorIcon = ErrorIcon.extend`
  height: 0.9375rem;
`;
const StyledInvestigeIcon = InvestigateIcon.extend`
  height: 0.9375rem;
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
  const Icon = assignee ? <StyledInvestigeIcon /> : <StyledErrorIcon />;
  return (
    <StyledLi>
      <ThemeConsumer>{
        ({ listAssigneeColor, listFailedColor }) => (
          <Status style={{ background: assignee ? listAssigneeColor : listFailedColor }}>
            {Icon}
          </Status>)
      }
      </ThemeConsumer>
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
