import type { LabelName, ParameterOptions } from '@noomorph/allure-js-commons';
import type { Parameter } from '@noomorph/allure-js-commons';

import type {
  AttachmentContent,
  Function_,
  MaybePromise,
} from '../utils/types';

export interface IAllureRuntime {
  flush(): Promise<void>;

  description(value: string): void;

  descriptionHtml(value: string): void;

  label(name: LabelName | string, value: string): void;

  link(name: string, url: string, type?: string): void;

  parameter(name: string, value: unknown, options?: ParameterOptions): void;

  parameters(parameters: Record<string, unknown>): void;

  attachment<T extends AttachmentContent>(
    name: string,
    content: MaybePromise<T>,
    mimeType?: string,
  ): typeof content;

  createAttachment<T extends AttachmentContent>(
    function_: Function_<MaybePromise<T>>,
    name: string,
  ): typeof function_;
  createAttachment<T extends AttachmentContent>(
    function_: Function_<MaybePromise<T>>,
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

  createFileAttachment(
    function_: Function_<MaybePromise<string>>,
  ): typeof function_;
  createFileAttachment(
    function_: Function_<MaybePromise<string>>,
    name: string,
  ): typeof function_;
  createFileAttachment(
    function_: Function_<MaybePromise<string>>,
    options: AttachmentOptions,
  ): typeof function_;

  createStep<F extends Function>(name: string, function_: F): F;
  createStep<F extends Function>(
    name: string,
    arguments_: ParameterOrString[],
    function_: F,
  ): F;

  step<T>(name: string, function_: () => T): T;
}

export type ParameterOrString = string | Omit<Parameter, 'value'>;

export type AttachmentOptions = {
  name?: string;
  mimeType?: string;
};
