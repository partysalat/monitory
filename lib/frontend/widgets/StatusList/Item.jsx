import React from 'react';
import styled, { keyframes } from 'styled-components';
import { flipInX } from 'react-animations';
import { get, isObject, isUndefined, find, merge, isFunction } from 'lodash';
import {
  Check as CheckIcon,
  Bolt as FailedIcon,
  MagnifyingGlass as InvestigatedIcon,
} from 'styled-icons/fa-solid';

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
  background: ${(props) => props.statusColor};
`;

const defaultStatusConfig = {
  check: {
    default: false,
    background: (theme) => theme.statusCheckColor,
    icon: CheckIcon,
  },
  failed: {
    default: true,
    background: (theme) => theme.statusFailedColor,
    icon: FailedIcon,
  },
  investigated: {
    default: false,
    background: (theme) => theme.statusInvestigatedColor,
    icon: InvestigatedIcon,
  },
};

const Item = styled.div`
  flex: 1 1 auto;
`;
const Subtitle = styled.div`
  font-size: 0.7rem;
`;

const findDefaultStatus = (statusConfig) => {
  const defaultStatus = find(statusConfig, ['default', true]);
  return isUndefined(defaultStatus) ? statusConfig.failed : defaultStatus;
};

const provideBackgroundColor = (theme, value) =>
  isFunction(value) ? value(theme) : value;

export default (props) => {
  const { item, statusConfigExt } = props;
  const statusConfig = merge({}, defaultStatusConfig, statusConfigExt);
  const defaultStatus = findDefaultStatus(statusConfig);
  const { name, status, subtitle } = isObject(item)
    ? item
    : { name: item, status: defaultStatus };

  const config = get(statusConfig, status, defaultStatus);
  const Icon = styled(config.icon)`
    height: 0.9375rem;
  `;

  return (
    <StyledLi>
      <ThemeConsumer>
        {(theme) => (
          <Status
            statusColor={provideBackgroundColor(theme, config.background)}
          >
            <Icon />
          </Status>
        )}
      </ThemeConsumer>
      <Item>
        <div>{name}</div>
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
      </Item>
    </StyledLi>
  );
};
