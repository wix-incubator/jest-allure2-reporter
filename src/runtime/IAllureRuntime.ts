import type {
  AttachmentsOptions as AttachmentsConfigOptions,
  LabelName,
  LinkType,
  Parameter,
  Status,
  StatusDetails,
} from 'jest-allure2-reporter';

import type { Function_, MaybePromise } from '../utils/types';

export interface IAllureRuntime {
  /**
   * Advanced API for attaching metadata to the same step or test.
   * Useful when your artifacts are delayed and are created asynchronously.
   */
  $bind(options?: AllureRuntimeBindOptions): IAllureRuntime;

  description(value: string): void;

  descriptionHtml(value: string): void;

  status(status: Status, statusDetails?: StatusDetails): void;

  statusDetails(statusDetails: StatusDetails): void;

  label(name: LabelName, value: string): void;

  link(url: string, name?: string, type?: LinkType | string): void;

  parameter(name: string, value: unknown, options?: ParameterOptions): void;

  parameters(parameters: Record<string, unknown>): void;

  attachment<T extends AttachmentContent>(
    name: string,
    content: MaybePromise<T>,
    mimeType?: string,
  ): typeof content;

  createAttachment<
    T extends AttachmentContent,
    F extends Function_<MaybePromise<T>>,
  >(
    function_: F,
    name: string,
  ): F;
  createAttachment<
    T extends AttachmentContent,
    F extends Function_<MaybePromise<T>>,
  >(
    function_: F,
    options: ContentAttachmentOptions,
  ): typeof function_;

  fileAttachment(filePath: string, name?: string): string;
  fileAttachment(filePath: string, options?: FileAttachmentOptions): string;
  fileAttachment(
    filePathPromise: Promise<string>,
    name?: string,
  ): Promise<string>;
  fileAttachment(
    filePathPromise: Promise<string>,
    options?: FileAttachmentOptions,
  ): Promise<string>;

  createFileAttachment<F extends Function_<MaybePromise<string>>>(
    function_: F,
  ): F;
  createFileAttachment<F extends Function_<MaybePromise<string>>>(
    function_: F,
    name: string,
  ): F;
  createFileAttachment<F extends Function_<MaybePromise<string>>>(
    function_: F,
    options: FileAttachmentOptions,
  ): F;

  createStep<F extends Function>(name: string, function_: F): F;
  createStep<F extends Function>(
    name: string,
    arguments_: ParameterOrString[],
    function_: F,
  ): F;

  step<T>(name: string, function_: () => T): T;
}

export type FileAttachmentOptions = {
  name?: AttachmentContext['name'];
  mimeType?: AttachmentContext['mimeType'];
  handler?: AttachmentsConfigOptions['fileHandler'];
};

export type ContentAttachmentOptions = {
  name?: AttachmentContext['name'];
  mimeType?: AttachmentContext['mimeType'];
  handler?: AttachmentsConfigOptions['contentHandler'];
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
  outDir: string;
  name?: string;
  mimeType?: string;
}

export interface FileAttachmentContext extends AttachmentContext {
  fileHandlers: Record<string, FileAttachmentHandler>;
  sourcePath: string;
}

export interface ContentAttachmentContext extends AttachmentContext {
  contentHandlers: Record<string, ContentAttachmentHandler>;
  content: AttachmentContent;
}

export type AttachmentContent = Buffer | string;

export type FileAttachmentHandler = (
  context: FileAttachmentContext,
) => string | Promise<string>;

export type ContentAttachmentHandler = (
  context: ContentAttachmentContext,
) => string | Promise<string>;

export interface MIMEInfererContext {
  sourcePath?: string;
  content?: AttachmentContent;
}

export interface RuntimeAugmentation {
  contentAttachmentHandlers: Record<string, ContentAttachmentHandler>;
  fileAttachmentHandlers: Record<string, FileAttachmentHandler>;
  inferMimeType?: (context: MIMEInfererContext) => string | undefined;
}
