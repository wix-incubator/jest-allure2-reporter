import realm from '../realms';
import type { AllureRuntime } from '../runtime';

export * from './annotations';
export * from './decorators';

export const allure = realm.runtime as AllureRuntime;

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
  AllureRuntime,
  MIMEInferer,
  MIMEInfererContext,
  ParameterOrString,
} from '../runtime';
