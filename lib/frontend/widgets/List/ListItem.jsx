import React from 'react';
import styled, { keyframes } from 'styled-components';
import { flipInX } from 'react-animations';
import {
  Bolt as ErrorIcon,
  MagnifyingGlass as InvestigateIcon,
} from 'styled-icons/fa-solid';

import isObject from 'lodash/isObject';
import { ThemeConsumer } from '../../utils/Theme';

const bounceAnimation = keyframes`${flipInX}`;
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
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  margin-right: 5px;
`;
const StyledErrorIcon = styled(ErrorIcon)`
  height: 0.9375rem;
`;
const StyledInvestigeIcon = styled(InvestigateIcon)`
  height: 0.9375rem;
`;
const Build = styled.div`
  flex: 1 1 auto;
`;
const Assignee = styled.div`
  font-size: 0.7rem;
`;
export default (props) => {
  let { build } = props;
  build = isObject(build) ? build : { name: build };
  const { name, assignee } = build;

  const assigneeName = assignee || 'Nobody';
  const Icon = assignee ? <StyledInvestigeIcon /> : <StyledErrorIcon />;
  return (
    <StyledLi>
      <ThemeConsumer>
        {({ listAssigneeColor, listFailedColor }) => (
          <Status
            style={{
              background: assignee ? listAssigneeColor : listFailedColor,
            }}
          >
            {Icon}
          </Status>
        )}
      </ThemeConsumer>
      <Build>
        <div>{name}</div>
        <Assignee>{assigneeName} assigned</Assignee>
      </Build>
    </StyledLi>
  );
};
