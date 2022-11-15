import React from 'react';
import styled from 'styled-components';
import Base from '../../utils/Base';
import Content from '../../utils/Content';
import Item, { ItemValueProp, StatusConfigExt } from './Item';
import { BaseProps } from '../../utils/Base/Base';
import { useSubscription } from '../../hoc/withSubscription';
import { useViewValue } from '../../hoc/withViewValue';

const ItemList = styled.ul`
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
  statusConfigExt: StatusConfigExt;
  value?: (current: any) => ItemValueProp[];
};

export default (props: ListProps) => {
  const jobData = useSubscription(props.job);
  const viewValue = useViewValue<ItemValueProp[] | undefined>(
    jobData?.current,
    props.value
  );

  const { statusConfigExt } = props;

  const items = (viewValue ?? []).map((item) => (
    <Item
      key={JSON.stringify(item)}
      item={item}
      statusConfigExt={statusConfigExt}
    />
  ));

  return (
    <Base {...props}>
      <BaselineContent>
        <ItemList>{items}</ItemList>
      </BaselineContent>
    </Base>
  );
};
