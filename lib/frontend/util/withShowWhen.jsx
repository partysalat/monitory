import React from 'react';


export default WrappedComponent => (props) => {
  const {
    showWhen,
  } = props;
  const currentData = {
    current: props.current,
    last: props.last,
  };

  if (showWhen && !showWhen(currentData)) {
    return null;
  }


  return <WrappedComponent {...props} />;
};
