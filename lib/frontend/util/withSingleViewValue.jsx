import React from 'react';


export default WrappedComponent => (props) => {
  const value = props.value || function () { return props.current; };
  const viewValue = value({ current: props.current, last: props.last });
  return <WrappedComponent viewValue={viewValue}{...props} />;
};
