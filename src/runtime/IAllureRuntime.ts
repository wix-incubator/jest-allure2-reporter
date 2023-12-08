import type {
  LabelName,
  LinkType,
  Parameter,
  Status,
  StatusDetails,
} from 'jest-allure2-reporter';

import type { Function_, MaybePromise } from '../utils/types';

export interface IAllureRuntime {
  // TODO: hide this method
  flush(): Promise<void>;

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
    options: AttachmentOptions,
  ): typeof function_;

  fileAttachment(filePath: string, name?: string): string;
  fileAttachment(filePath: string, options?: AttachmentOptions): string;
  fileAttachment(
    filePathPromise: Promise<string>,
    name?: string,
  ): Promise<string>;
  fileAttachment(
    filePathPromise: Promise<string>,
    options?: AttachmentOptions,
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
    options: AttachmentOptions,
  ): F;

  createStep<F extends Function>(name: string, function_: F): F;
  createStep<F extends Function>(
    name: string,
    arguments_: ParameterOrString[],
    function_: F,
  ): F;

  step<T>(name: string, function_: () => T): T;
}

export type AttachmentContent = Buffer | string;

export type AttachmentOptions = {
  name?: string;
  mimeType?: string;
};

export type ParameterOrString = string | Omit<Parameter, 'value'>;

export type ParameterOptions = Pick<Parameter, 'mode' | 'excluded'>;
