import * as React from 'react';
import * as PropTypes from 'prop-types';
import {isFunction} from 'lodash';

interface WithAlertProps<T, U> {
    current: T,
    viewValue: U,
    alert: (current: T, viewValue: U) => boolean | boolean
}

export default <T,U>(WrappedComponent: typeof React.Component) => {
    return (props: WithAlertProps<T,U>) => {
        const {alert, current, viewValue} = props;
        const isAlert = isFunction(alert) ? alert(current, viewValue) : alert;
        return <WrappedComponent isAlert={isAlert} {...props} />;
    };
};
