import { isPromiseLike } from './isPromiseLike';
import type { MaybePromise } from './types';

interface MaybePromiseProcessor {
  <T, R>(value: T, callback: (resolvedValue: T) => Promise<R>): Promise<R>;
  <T, R>(value: Promise<T>, callback: (resolvedValue: T) => Promise<R>): Promise<R>;
  <T, R>(value: MaybePromise<T>, callback: (resolvedValue: T) => Promise<R>): Promise<R>;
}

export const processMaybePromise: MaybePromiseProcessor = (input, callback) => {
  return isPromiseLike(input)
    ? input.then((resolvedValue) => callback(resolvedValue))
    : callback(input);
};
