import { once } from '../../utils';

import type { AllureRuntimeConfig } from './AllureRuntimeConfig';
import * as attachmentHandlers from './attachment-handlers';
import { AllureTestCaseMetadataProxy } from './proxies';
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
  readonly getMetadata: () => AllureTestCaseMetadataProxy;
  readonly getNow: () => number;
  idle: Promise<unknown> = Promise.resolve();

  constructor(config: AllureRuntimeConfig) {
    this.getNow = config.getNow;
    this.getReporterConfig = once(config.getReporterConfig);
    this.getMetadata = () =>
      new AllureTestCaseMetadataProxy(config.getMetadata());

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
