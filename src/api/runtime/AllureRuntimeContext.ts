import path from 'node:path';

import {
  StepsModule,
  ContentAttachmentsModule,
  CoreModule,
  FileAttachmentsModule,
} from './modules';
import * as attachmentHandlers from './attachment-handlers';
import type { MIMEInferer, SharedReporterConfig } from './types';
import type { AllureTestCaseMetadataProxy } from './proxies';

export type AllureRuntimeConfig = SharedReporterConfig & {
  inferMimeType: MIMEInferer;
  metadataProvider: () => AllureTestCaseMetadataProxy;
  nowProvider: () => number;
};

//
// /**
//  * @internal
//  */
// export interface AllureRuntimeContext {
//   readonly contentAttachmentHandlers: Record<string, ContentAttachmentHandler>;
//   readonly fileAttachmentHandlers: Record<string, FileAttachmentHandler>;
//   readonly metadata: AllureTestCaseMetadataProxy;
//   readonly now: Number;
//   idle: Promise<unknown>;
//   inferMimeType: MIMEInferer;
// }

export class AllureRuntimeContext {
  readonly modules: {
    basicSteps: StepsModule;
    core: CoreModule;
    contentAttachments: ContentAttachmentsModule;
    fileAttachments: FileAttachmentsModule;
  };

  readonly idle: Promise<unknown> = Promise.resolve();

  constructor(readonly config: AllureRuntimeConfig) {
    this.modules = {
      basicSteps: new StepsModule({
        get metadata() {
          return config.metadataProvider();
        },
        get now() {
          return config.nowProvider();
        },
      }),
      core: new CoreModule({
        get metadata() {
          return config.metadataProvider();
        },
      }),
      contentAttachments: new ContentAttachmentsModule({
        handlers: {
          write: attachmentHandlers.writeHandler,
        },
        inferMimeType: config.inferMimeType,
        get metadata() {
          return config.metadataProvider();
        },
        outDir: path.join(config.resultsDir, config.attachments.subDir),
        waitFor: (promise) => {
          this.idle.then(() => promise);
        },
      }),
      fileAttachments: new FileAttachmentsModule({
        handlers: {
          copy: attachmentHandlers.copyHandler,
          move: attachmentHandlers.moveHandler,
          ref: attachmentHandlers.referenceHandler,
        },
        inferMimeType: config.inferMimeType,
        get metadata() {
          return config.metadataProvider();
        },
        outDir: path.join(config.resultsDir, config.attachments.subDir),
        waitFor: (promise) => {
          this.idle.then(() => promise);
        },
      }),
    };
  }
}
