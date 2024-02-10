import realm from '../realms';
import type { IAllureRuntime } from '../runtime';

export * from './annotations';
export * from './decorators';

export const allure = realm.runtime as IAllureRuntime;

export type {
  AllureRuntimePluginCallback,
  AllureRuntimePluginContext,
  AttachmentContent,
  AttachmentHandler,
  AttachmentOptions,
  ContentAttachmentContext,
  ContentAttachmentHandler,
  ContentAttachmentOptions,
  FileAttachmentContext,
  FileAttachmentHandler,
  FileAttachmentOptions,
  IAllureRuntime,
  MIMEInferer,
  MIMEInfererContext,
  ParameterOrString,
} from '../runtime';
