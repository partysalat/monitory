import React from 'react';
import styled from 'styled-components';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import { withSubscription, withViewValue } from '../../hoc';
import Base from '../../utils/Base';
import Content from '../../utils/Content';
import Item from './Item';

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

const List = (props) => {
  const { viewValue = [], statusConfigExt } = props;

  const items = viewValue.map((item) => (
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

export default compose(withSubscription, withViewValue)(List);
const ConfigExtPropType = PropTypes.shape({
  default: PropTypes.bool,
  background: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  icon: PropTypes.element,
});
List.propTypes = {
  job: PropTypes.string.isRequired,
  title: PropTypes.string,
  showWhen: PropTypes.func,
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  alert: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  cols: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  rows: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  value: PropTypes.func,
  playAudioWhen: PropTypes.func,
  statusConfigExt: PropTypes.shape({
    failed: ConfigExtPropType,
    adjusted: ConfigExtPropType,
    investigated: ConfigExtPropType,
  }),
};
