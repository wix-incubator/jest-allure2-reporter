export function isPromiseLike(maybePromise: unknown): maybePromise is PromiseLike<unknown> {
  return maybePromise ? typeof (maybePromise as PromiseLike<unknown>).then === 'function' : false;
}
