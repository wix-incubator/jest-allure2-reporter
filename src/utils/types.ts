export type MaybePromise<T> = T | Promise<T>;
export type MaybeFunction<T> = T | Function_<T>;

export type Function_<T = unknown> = (...arguments_: any[]) => T;
