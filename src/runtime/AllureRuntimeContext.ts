import type {
  AllureGlobalMetadata,
  AllureTestFileMetadata,
} from 'jest-allure2-reporter';

import { once } from '../utils';
import { AllureMetadataProxy, AllureTestItemMetadataProxy } from '../metadata';

import type { AllureRuntimeConfig } from './AllureRuntimeConfig';
import * as attachmentHandlers from './attachment-handlers';
import type {
  ContentAttachmentHandler,
  FileAttachmentHandler,
  MIMEInferer,
  SharedReporterConfig,
} from './types';

export class AllureRuntimeContext {
  readonly contentAttachmentHandlers: Record<string, ContentAttachmentHandler> =
    {
      write: attachmentHandlers.writeHandler,
    };
  readonly fileAttachmentHandlers: Record<string, FileAttachmentHandler> = {
    copy: attachmentHandlers.copyHandler,
    move: attachmentHandlers.moveHandler,
    ref: attachmentHandlers.referenceHandler,
  };
  inferMimeType: MIMEInferer = attachmentHandlers.inferMimeType;
  readonly getReporterConfig: () => SharedReporterConfig;
  readonly getFileMetadata: () => AllureMetadataProxy<AllureTestFileMetadata>;
  readonly getGlobalMetadata: () => AllureMetadataProxy<AllureGlobalMetadata>;
  readonly getCurrentMetadata: () => AllureTestItemMetadataProxy;
  readonly getNow: () => number;
  idle: Promise<unknown> = Promise.resolve();

  constructor(config: AllureRuntimeConfig) {
    this.getNow = config.getNow;
    this.getReporterConfig = once(config.getReporterConfig);
    this.getCurrentMetadata = () =>
      new AllureTestItemMetadataProxy(config.getCurrentMetadata());
    this.getFileMetadata = () =>
      new AllureMetadataProxy(config.getFileMetadata());
    this.getGlobalMetadata = () =>
      new AllureMetadataProxy(config.getGlobalMetadata());

    Object.defineProperty(this.contentAttachmentHandlers, 'default', {
      get: () => {
        const defaultName = this.getReporterConfig().attachments.contentHandler;
        return this.contentAttachmentHandlers[defaultName];
      },
    });

    Object.defineProperty(this.fileAttachmentHandlers, 'default', {
      get: () => {
        const defaultName = this.getReporterConfig().attachments.fileHandler;
        return this.fileAttachmentHandlers[defaultName];
      },
    });
  }
}
