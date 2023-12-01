import { isPromiseLike } from './isPromiseLike';
import type { MaybePromise } from './types';

interface MaybePromiseProcessor {
  <T>(value: T, callback: (resolvedValue: T) => void): T;
  <T>(value: Promise<T>, callback: (resolvedValue: T) => void): Promise<T>;
  <T>(
    value: MaybePromise<T>,
    callback: (resolvedValue: T) => void,
  ): MaybePromise<T>;
}

export const processMaybePromise: MaybePromiseProcessor = (input, callback) => {
  return isPromiseLike(input)
    ? input.then((resolvedValue) => (callback(resolvedValue), resolvedValue))
    : (callback(input), input);
};
