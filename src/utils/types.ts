import type { Parameter } from '@noomorph/allure-js-commons';

export type MaybePromise<T> = T | Promise<T>;

export type Function_<T> = (...arguments_: any[]) => T;

export type ParameterOrString = string | Parameter;

export type AttachmentContent = Buffer | string;
