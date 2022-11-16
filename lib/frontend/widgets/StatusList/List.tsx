import React from 'react';
import styled from 'styled-components';
import Base from '../../utils/Base';
import Content from '../../utils/Content';
import Item, { ItemValueProp, StatusConfigExt } from './Item';
import { BaseProps } from '../../utils/Base/Base';
import { useSubscription } from '../../hoc/withSubscription';
import { useViewValue } from '../../hoc/withViewValue';
import { ShowWhen, WithShowWhenProps } from '../../hoc/withShowWhen';

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
export interface ListProps
  extends Omit<
      BaseProps<ItemValueProp[], ItemValueProp[]>,
      'current' | 'lastUpdated' | 'viewValue'
    >,
    Omit<
      WithShowWhenProps<ItemValueProp[], ItemValueProp[]>,
      'current' | 'lastUpdated' | 'viewValue'
    > {
  job: string;
  statusConfigExt?: StatusConfigExt;
  value?: (current: ItemValueProp[]) => ItemValueProp[];
}

export default (props: ListProps) => {
  const jobData = useSubscription<ItemValueProp[]>(props.job);
  const viewValue = useViewValue<ItemValueProp[], ItemValueProp[]>(
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
    <ShowWhen showWhen={props.showWhen} {...jobData} viewValue={viewValue}>
      <Base {...props} {...jobData} viewValue={viewValue}>
        <BaselineContent>
          <ItemList>{items}</ItemList>
        </BaselineContent>
      </Base>
    </ShowWhen>
  );
};
