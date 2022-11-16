import withReloadableSrc from './withReloadableSrc';

export type ValueFn<C, V, T> = ((current: C, viewValue: V) => T) | T;
export type ViewValueFn<C, T> = (current: C) => T;
export { withReloadableSrc };
