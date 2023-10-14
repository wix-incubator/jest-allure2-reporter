import type { Function_, MaybePromise } from './types';
import { isPromiseLike } from './isPromiseLike';

export function hijackValue<T>(input: T, callback: (resolvedValue: T) => T): T;
export function hijackValue<T>(
  input: Promise<T>,
  callback: (resolvedValue: T) => T,
): Promise<T>;
export function hijackValue<T>(
  input: Function_<T>,
  callback: (resolvedValue: T) => T,
): Function_<T>;
export function hijackValue<T>(
  input: Function_<MaybePromise<T>>,
  callback: (resolvedValue: T) => T,
): Function_<MaybePromise<T>>;
export function hijackValue<T>(
  input: Function_<Promise<T>>,
  callback: (resolvedValue: T) => T,
): Function_<Promise<T>>;
export function hijackValue<T>(
  input: T | Promise<T> | Function_<MaybePromise<T>>,
  callback: (resolvedValue: T) => void,
): typeof input;
export function hijackValue<T>(
  input: T | Promise<T> | Function_<MaybePromise<T>>,
  callback: (resolvedValue: T) => void,
): typeof input {
  if (typeof input === 'function') {
    const function_ = input;
    const wrapper = function (this: unknown, ...arguments_: any[]) {
      const result = Reflect.apply(
        function_,
        this,
        arguments_,
      ) as MaybePromise<T>;

      return isPromiseLike(result)
        ? result.then(
            (resolvedValue) => (callback(resolvedValue), resolvedValue),
          )
        : (callback(result), result);
    };
    wrapper.toString = function_.toString.bind(function_);
    return wrapper as Function_<T>;
  } else if (isPromiseLike(input)) {
    return input.then(
      (resolvedValue) => (callback(resolvedValue), resolvedValue),
    );
  } else {
    return callback(input), input;
  }
}
