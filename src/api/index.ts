import realm from '../realms';

import type { IAllureRuntime } from './runtime';

export * from './annotations';
export * from './decorators';

export const allure = realm.runtime as IAllureRuntime;

export type {
  AttachmentContent,
  AttachmentOptions,
  IAllureRuntime,
  ParameterOrString,
} from './runtime';
