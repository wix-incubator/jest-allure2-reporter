import path from 'node:path';

import type { MaybePromise } from 'jest-allure2-reporter';

import { type Function_, processMaybePromise } from '../../utils';
import { formatString, hijackFunction } from '../../utils';
import type {
  AttachmentContent,
  AttachmentContext,
  AttachmentHandler,
  AttachmentOptions,
  ContentAttachmentContext,
  ContentAttachmentHandler,
  ContentAttachmentOptions,
  FileAttachmentContext,
  FileAttachmentHandler,
  FileAttachmentOptions,
  MIMEInfererContext,
} from '../types';
import type { AllureTestItemMetadataProxy } from '../../metadata';
import type { AllureRuntimeContext } from '../AllureRuntimeContext';

type AttachmentsModuleContext<
  Context extends AttachmentContext,
  Handler extends AttachmentHandler<Context>,
> = {
  readonly handlers: Record<string, Handler>;
  readonly inferMimeType: (context: MIMEInfererContext) => string | undefined;
  readonly metadata: AllureTestItemMetadataProxy;
  readonly outDir: string;
  readonly waitFor: <T>(promise: Promise<T>) => Promise<T>;
};

abstract class AttachmentsModule<
  Context extends AttachmentContext,
  Content extends AttachmentContent,
  Handler extends AttachmentHandler<Context>,
  Options extends AttachmentOptions<Context>,
> {
  constructor(protected readonly context: AttachmentsModuleContext<Context, Handler>) {}

  attachment<T extends Content>(
    content: MaybePromise<T>,
    options: Options,
  ): Promise<string | undefined> {
    if (typeof options.handler === 'string' && !this.context.handlers[options.handler]) {
      // TODO: throw a more specific error
      throw new Error(`Unknown attachment handler: ${options.handler}`);
    }

    return processMaybePromise(content, this.#handleAttachment(options));
  }

  createAttachment<T extends Content>(
    function_: Function_<MaybePromise<T>>,
    options: Options,
  ): typeof function_ {
    return hijackFunction(function_, this.#handleAttachment(options));
  }

  protected abstract _createMimeContext(name: string, content: Content): MIMEInfererContext;

  protected abstract _createAttachmentContext(context: AttachmentContext): Context;

  #handleAttachment(userOptions: Options) {
    return (userContent: Content, arguments_?: unknown[]): Promise<string | undefined> => {
      const handler = this.#resolveHandler(userOptions);
      const name = this.#formatName(userOptions.name, arguments_);
      const mimeContext = this._createMimeContext(name, userContent);
      const mimeType =
        userOptions.mimeType ??
        this.context.inferMimeType(mimeContext) ??
        'application/octet-stream';

      const context = this._createAttachmentContext({
        name,
        mimeType,
        outDir: this.context.outDir,
        sourcePath: mimeContext.sourcePath,
        content: mimeContext.content,
      });

      const pushAttachment = this.#schedulePushAttachment(context);
      return this.context.waitFor(
        Promise.resolve()
          .then(() => handler(context))
          .then(pushAttachment),
      );
    };
  }

  #resolveHandler(options: Options): Handler {
    const handler = (options.handler ?? 'default') as string | Handler;
    return typeof handler === 'function' ? handler : this.context.handlers[handler];
  }

  #schedulePushAttachment(
    context: Context,
  ): (destinationPath: string | undefined) => typeof destinationPath {
    const metadata = this.context.metadata.$bind();
    return (destinationPath) => {
      if (destinationPath) {
        metadata.push('attachments', [
          {
            name: context.name,
            source: destinationPath,
            type: context.mimeType,
          },
        ]);
      }

      return destinationPath;
    };
  }

  #formatName(nameFormat = 'untitled', arguments_?: unknown[]) {
    return arguments_ ? formatString(nameFormat, ...arguments_) : nameFormat;
  }
}

export class FileAttachmentsModule extends AttachmentsModule<
  FileAttachmentContext,
  string,
  FileAttachmentHandler,
  FileAttachmentOptions
> {
  static create(context: AllureRuntimeContext): FileAttachmentsModule {
    return new FileAttachmentsModule({
      get handlers() {
        return context.fileAttachmentHandlers;
      },
      get inferMimeType() {
        return context.inferMimeType;
      },
      get metadata() {
        return context.getCurrentMetadata();
      },
      get outDir() {
        const config = context.getReporterConfig();
        return path.join(config.resultsDir, config.attachments.subDir ?? '');
      },
      waitFor: context.enqueueTask,
    });
  }

  protected _createMimeContext(_name: string, sourcePath: string) {
    return { sourcePath };
  }

  protected _createAttachmentContext(context: AttachmentContext) {
    // somewhat fragile - relying here on _createMimeContext output
    return { sourcePath: context.sourcePath!, ...context };
  }
}

export class ContentAttachmentsModule extends AttachmentsModule<
  ContentAttachmentContext,
  AttachmentContent,
  ContentAttachmentHandler,
  ContentAttachmentOptions
> {
  static create(context: AllureRuntimeContext): ContentAttachmentsModule {
    return new ContentAttachmentsModule({
      get handlers() {
        return context.contentAttachmentHandlers;
      },
      get inferMimeType() {
        return context.inferMimeType;
      },
      get metadata() {
        return context.getCurrentMetadata();
      },
      get outDir() {
        const config = context.getReporterConfig();
        return path.join(config.resultsDir, config.attachments.subDir ?? '');
      },
      waitFor: context.enqueueTask,
    });
  }

  protected _createMimeContext(name: string, content: AttachmentContent) {
    return { sourcePath: name, content };
  }

  protected _createAttachmentContext(context: AttachmentContext) {
    // somewhat fragile - relying here on _createMimeContext output
    return { content: context.content!, ...context };
  }
}
