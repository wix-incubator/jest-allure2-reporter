export function isPromiseLike<T>(
  maybePromise: T | Promise<T>,
): maybePromise is Promise<T> {
  return maybePromise
    ? typeof (maybePromise as PromiseLike<T>).then === 'function'
    : false;
}
