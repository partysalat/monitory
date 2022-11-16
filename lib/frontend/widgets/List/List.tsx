import React from 'react';
import styled from 'styled-components';
import { ViewValueFn } from '../../hoc';
import Base from '../../utils/Base';
import Content from '../../utils/Content';
import ListItem, { ListItemEntry } from './ListItem';
import { useSubscription } from '../../hoc/withSubscription';
import { useViewValue } from '../../hoc/withViewValue';
import { BaseProps } from '../../utils/Base/Base';

const FailedBuildSteps = styled.ul`
  font-size: 1rem;
  margin: 0;
  padding: 0;
  width: 100%;
`;
const BaselineContent = styled(Content)`
  align-items: baseline;
  justify-content: flex-start;
`;
type ListProps = BaseProps & {
  job: string;
  value: ViewValueFn<ListItemEntry[]>;
};

export default (props: ListProps) => {
  const { value, job } = props;
  const jobData = useSubscription(job);
  const viewValue =
    useViewValue<ListItemEntry[], ListItemEntry[]>(jobData?.current, value) ||
    [];

  return (
    <Base {...props}>
      <BaselineContent>
        <FailedBuildSteps>
          {viewValue.map((build) => (
            <ListItem key={JSON.stringify(build)} build={build} />
          ))}
        </FailedBuildSteps>
      </BaselineContent>
    </Base>
  );
};
