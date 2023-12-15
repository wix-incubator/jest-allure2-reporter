import type { IAllureRuntime } from './runtime';
import realm from './realms';

export * from './annotations';
export * from './decorators';

export const allure = realm.runtime as IAllureRuntime;

export type {
  AttachmentContent,
  AttachmentOptions,
  IAllureRuntime,
  ParameterOrString,
} from './runtime';
