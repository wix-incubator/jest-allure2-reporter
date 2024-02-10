import type {
  AllureGlobalMetadata,
  AllureTestFileMetadata,
} from 'jest-allure2-reporter';

import { type MaybeFunction, once } from '../utils';
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
  readonly contentAttachmentHandlers: Record<string, ContentAttachmentHandler>;
  readonly fileAttachmentHandlers: Record<string, FileAttachmentHandler>;
  readonly inferMimeType: MIMEInferer;
  readonly getReporterConfig: () => SharedReporterConfig;
  readonly getFileMetadata: () => AllureMetadataProxy<AllureTestFileMetadata>;
  readonly getGlobalMetadata: () => AllureMetadataProxy<AllureGlobalMetadata>;
  readonly getCurrentMetadata: () => AllureTestItemMetadataProxy;
  readonly getNow: () => number;

  readonly flush: () => Promise<unknown>;
  readonly enqueueTask: (task: MaybeFunction<Promise<unknown>>) => void;

  constructor(config: AllureRuntimeConfig) {
    this.contentAttachmentHandlers = config.contentAttachmentHandlers ?? {
      write: attachmentHandlers.writeHandler,
    };
    this.fileAttachmentHandlers = config.fileAttachmentHandlers ?? {
      copy: attachmentHandlers.copyHandler,
      move: attachmentHandlers.moveHandler,
      ref: attachmentHandlers.referenceHandler,
    };
    this.inferMimeType =
      config.inferMimeType ?? attachmentHandlers.inferMimeType;
    this.getNow = config.getNow;
    this.getReporterConfig = once(config.getReporterConfig);
    this.getCurrentMetadata = () =>
      new AllureTestItemMetadataProxy(config.getCurrentMetadata());
    this.getFileMetadata = () =>
      new AllureMetadataProxy(config.getFileMetadata());
    this.getGlobalMetadata = () =>
      new AllureMetadataProxy(config.getGlobalMetadata());

    let idle: Promise<unknown> = Promise.resolve();
    this.flush = () => idle;
    this.enqueueTask = (task) => {
      idle =
        typeof task === 'function' ? idle.then(task) : idle.then(() => task);
    };

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
