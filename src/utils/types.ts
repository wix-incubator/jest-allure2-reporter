export type MaybePromise<T> = T | Promise<T>;

export type Function_<T> = (...arguments_: any[]) => T;

export type AttachmentContent = Buffer | string;
