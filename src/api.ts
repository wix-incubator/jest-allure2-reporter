import type { IAllureRuntime } from './api/runtime';
import realm from './realms';

export * from './api/annotations';
export * from './api/decorators';

export const allure = realm.runtime as IAllureRuntime;

export type {
  AttachmentContent,
  AttachmentOptions,
  IAllureRuntime,
  ParameterOrString,
} from './api/runtime';
