import React from 'react';

interface WithShowWhenProps<T, U> {
    current: T,
    viewValue: U,
    showWhen?: (current: T, viewValue: U) => boolean
}

export default <T, U>(WrappedComponent: typeof React.Component) => (props: WithShowWhenProps<T, U>) => {
    const {
        showWhen = () => true,
        current,
        viewValue,
    } = props;

    if (!showWhen(current, viewValue)) {
        return null;
    }

    return <WrappedComponent {...props} />;
};

