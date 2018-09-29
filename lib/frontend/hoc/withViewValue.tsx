import * as React from 'react';

interface WithViewValueProps<T, U> {
    current: T,
    value: (current: T) => U,
}

export default <T, U>(WrappedComponent: typeof React.Component) => (props:WithViewValueProps<T,U>) => {
    const {
        value = data => data,
        current
    } = props;
    const viewValue = value(current);
    return <WrappedComponent viewValue={viewValue} {...props} />;
};
