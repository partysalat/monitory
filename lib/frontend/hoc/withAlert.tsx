import * as React from 'react';
import * as PropTypes from 'prop-types';
import {isFunction} from 'lodash';

interface WithAlertProps {
    current: any,
    viewValue: any,
    alert: (current: any, viewValue: any) => boolean | boolean
}

export default (WrappedComponent: typeof React.Component) => {
    const withAlert = (props: WithAlertProps) => {
        const {alert, current, viewValue} = props;
        const isAlert = isFunction(alert) ? alert(current, viewValue) : alert;
        return <WrappedComponent isAlert={isAlert} {...props} />;
    };

    return withAlert;
};
