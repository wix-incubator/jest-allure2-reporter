export function novalue(): Promise<never> {
  // TODO: better error subclass and message
  const promise = Promise.reject('Cannot use base value');
  promise.catch(() => {});
  return promise;
}
