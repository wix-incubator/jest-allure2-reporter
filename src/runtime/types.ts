import type { ReporterConfig } from 'jest-allure2-reporter';
import type {
  BuiltinFileAttachmentHandler,
  BuiltinContentAttachmentHandler,
  LabelName,
  LinkType,
  Parameter,
  Status,
  StatusDetails,
} from 'jest-allure2-reporter';

import type { Function_, MaybePromise } from '../utils';

export interface AllureRuntime {
  /**
   * Advanced API for attaching metadata to the same step or test.
   * Useful when your artifacts are delayed and are created asynchronously.
   */
  $bind(options?: AllureRuntimeBindOptions): AllureRuntime;

  /**
   * Attach a runtime plugin using a callback.
   * The callback will be called with the runtime plugin context.
   */
  $plug(callback: AllureRuntimePluginCallback): void;

  description(value: string): void;

  descriptionHtml(value: string): void;

  displayName(value: string): void;

  fullName(value: string): void;

  historyId(value: string): void;

  label(name: LabelName, value: string): void;

  link(url: string, name?: string, type?: LinkType | string): void;

  parameter(name: string, value: unknown, options?: ParameterOptions): void;

  parameters(parameters: Record<string, unknown>): void;

  status(status: Status, statusDetails?: StatusDetails): void;

  statusDetails(statusDetails: StatusDetails): void;

  attachment<T extends AttachmentContent>(
    name: string,
    content: MaybePromise<T>,
    mimeType?: string,
  ): Promise<string | undefined>;

  createAttachment<T extends AttachmentContent, F extends Function_<MaybePromise<T>>>(
    function_: F,
    name: string,
  ): F;
  createAttachment<T extends AttachmentContent, F extends Function_<MaybePromise<T>>>(
    function_: F,
    options: ContentAttachmentOptions,
  ): typeof function_;

  fileAttachment(filePath: string | Promise<string>, name?: string): Promise<string | undefined>;
  fileAttachment(
    filePath: string | Promise<string>,
    options?: FileAttachmentOptions,
  ): Promise<string | undefined>;

  createFileAttachment<F extends Function_<MaybePromise<string>>>(function_: F, name?: string): F;
  createFileAttachment<F extends Function_<MaybePromise<string>>>(
    function_: F,
    options?: FileAttachmentOptions,
  ): F;

  createStep<F extends Function>(name: string, function_: F): F;
  createStep<F extends Function>(name: string, arguments_: ParameterOrString[], function_: F): F;

  step<T>(name: string, function_: () => T): T;
}

export type SharedReporterConfig = ReporterConfig;

export type AllureRuntimePluginCallback = (context: AllureRuntimePluginContext) => void;

export interface AllureRuntimePluginContext {
  readonly runtime: AllureRuntime;
  readonly contentAttachmentHandlers: Record<
    BuiltinContentAttachmentHandler | 'default' | string,
    ContentAttachmentHandler
  >;
  readonly fileAttachmentHandlers: Record<
    BuiltinFileAttachmentHandler | 'default' | string,
    FileAttachmentHandler
  >;
  inferMimeType: MIMEInferer;
}

export type AttachmentOptions<Context extends AttachmentContext> = {
  name?: string;
  mimeType?: string;
  handler?: string | AttachmentHandler<Context>;
};

export type FileAttachmentOptions = AttachmentOptions<FileAttachmentContext>;
export type ContentAttachmentOptions = AttachmentOptions<ContentAttachmentContext> & {
  name: string;
};

export type ParameterOrString = string | Omit<Parameter, 'value'>;

export type ParameterOptions = Pick<Parameter, 'mode' | 'excluded'>;

export type AllureRuntimeBindOptions = {
  /** @default true */
  metadata?: boolean;
  /** @default false */
  time?: boolean;
};

export interface AttachmentContext {
  name: string;
  mimeType: string;
  outDir: string;
  sourcePath?: string;
  content?: AttachmentContent;
}

export interface FileAttachmentContext extends AttachmentContext {
  sourcePath: string;
}

export interface ContentAttachmentContext extends AttachmentContext {
  content: AttachmentContent;
}

export type AttachmentContent = Buffer | string;

export type AttachmentHandler<Context extends AttachmentContext> = (
  context: Readonly<Context>,
) => MaybePromise<string | undefined>;

export type FileAttachmentHandler = AttachmentHandler<FileAttachmentContext>;

export type ContentAttachmentHandler = AttachmentHandler<ContentAttachmentContext>;

export type MIMEInferer = (context: MIMEInfererContext) => string | undefined;

export interface MIMEInfererContext {
  sourcePath?: string;
  content?: AttachmentContent;
}
