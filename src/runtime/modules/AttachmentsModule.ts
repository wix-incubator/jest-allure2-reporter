import path from 'node:path';

import { formatString, hijackFunction, processMaybePromise } from '../../utils';
import type { Function_, MaybePromise } from '../../utils';
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

export type AttachmentsModuleContext<
  Context extends AttachmentContext,
  Handler extends AttachmentHandler<Context>,
> = {
  readonly handlers: Record<string, Handler>;
  readonly inferMimeType: (context: MIMEInfererContext) => string | undefined;
  readonly metadata: AllureTestItemMetadataProxy;
  readonly outDir: string;
  readonly waitFor: (promise: Promise<unknown>) => void;
};

abstract class AttachmentsModule<
  Context extends AttachmentContext,
  Content extends AttachmentContent,
  Handler extends AttachmentHandler<Context>,
  Options extends AttachmentOptions<Context>,
> {
  constructor(
    protected readonly context: AttachmentsModuleContext<Context, Handler>,
  ) {}

  attachment(content: MaybePromise<Content>, options: Options): typeof content {
    return processMaybePromise(content, this.#handleAttachment(options));
  }

  createAttachment(
    function_: Function_<MaybePromise<Content>>,
    options: Options,
  ): typeof function_ {
    return hijackFunction(function_, this.#handleAttachment(options));
  }

  protected abstract _createMimeContext(
    name: string,
    content: Content,
  ): MIMEInfererContext;

  protected abstract _createAttachmentContext(
    context: AttachmentContext,
  ): Context;

  #handleAttachment(userOptions: Options) {
    return (userContent: Content, arguments_?: unknown[]) => {
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
      this.context.waitFor(
        Promise.resolve()
          .then(() => handler(context))
          .then(pushAttachment),
      );
    };
  }

  #resolveHandler(options: Options): Handler {
    const handler = (options.handler ?? 'default') as string | Handler;
    return typeof handler === 'function'
      ? handler
      : this.context.handlers[handler];
  }

  #schedulePushAttachment(context: Context) {
    const metadata = this.context.metadata.$bind();
    return (destinationPath: string | undefined) => {
      if (destinationPath) {
        metadata.push('attachments', [
          {
            name: context.name,
            source: path.resolve(destinationPath),
            type: context.mimeType,
          },
        ]);
      }
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
        return path.join(config.resultsDir, config.attachments.subDir);
      },
      waitFor: (promise) => {
        context.idle = context.idle.then(() => promise);
      },
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
        return path.join(config.resultsDir, config.attachments.subDir);
      },
      waitFor: (promise) => {
        context.idle = context.idle.then(() => promise);
      },
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
