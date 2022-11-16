import React from 'react';
import styled, { keyframes } from 'styled-components';
import { flipInX } from 'react-animations';
import { isFunction, isObject, isUndefined } from 'lodash';
import {
  Bolt as FailedIcon,
  Check as CheckIcon,
  MagnifyingGlass as InvestigatedIcon,
} from 'styled-icons/fa-solid';

import { Theme, ThemeConsumer } from '../../utils/Theme';
import { StyledIcon } from '@styled-icons/styled-icon';

export type ConfigExtPropType = {
  default: boolean;
  background: string | ((theme: Theme) => string);
  icon?: StyledIcon;
};
export type StatusConfigExt = Record<string, ConfigExtPropType>;

export type ItemValueProp =
  | string
  | {
      name: string;
      status: string;
      subtitle: string;
    };

export type ItemProps = {
  statusConfigExt: StatusConfigExt;
  item: ItemValueProp;
};

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
  background: ${(props: { statusColor: string }) => props.statusColor};
`;

export const defaultStatusConfig: StatusConfigExt = {
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

const findDefaultStatus = (statusConfig: StatusConfigExt) => {
  const [defaultStatus] = Object.entries(statusConfig).find(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ([_key, value]) => value.default
  );
  return isUndefined(defaultStatus) ? 'failed' : defaultStatus;
};

const provideBackgroundColor = (
  theme: Theme,
  value: string | ((value: Theme) => string)
) => (isFunction(value) ? value(theme) : value);

export default (props: ItemProps) => {
  const { item, statusConfigExt } = props;
  const statusConfig: StatusConfigExt = {
    ...defaultStatusConfig,
    ...statusConfigExt,
  };
  const defaultStatus = findDefaultStatus(statusConfig);
  const { name, status, subtitle } = isObject(item)
    ? item
    : { name: item, status: defaultStatus, subtitle: undefined };

  const config = statusConfig[status] ?? defaultStatusConfig.failed;
  return (
    <StyledLi>
      <ThemeConsumer>
        {(theme) => (
          <Status
            statusColor={provideBackgroundColor(theme, config.background)}
          >
            {config.icon &&
              React.createElement(config.icon, { height: '0.9375rem' })}
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
