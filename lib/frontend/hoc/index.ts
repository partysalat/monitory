import withViewValue from './withViewValue';
import withShowWhen from './withShowWhen';
import withColor from './withColor';
import withSubscription from './withSubscription';
import withAlert from './withAlert';
import withReloadableSrc from './withReloadableSrc';
import withAudio from './withAudio';
export type ValueFn<T> = ((viewValue: number | string, current: any) => T) | T;
export type ViewValueFn<T> = (current: any) => T;
export {
  withViewValue,
  withShowWhen,
  withColor,
  withSubscription,
  withAlert,
  withReloadableSrc,
  withAudio,
};
