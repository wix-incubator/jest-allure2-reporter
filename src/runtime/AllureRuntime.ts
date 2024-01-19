import util from 'node:util';

import type { Parameter } from 'jest-allure2-reporter';

import { constant, isObject } from '../utils';

import type {
  AllureRuntimeBindOptions,
  AllureRuntimePluginCallback,
  IAllureRuntime,
} from './types';
import * as runtimeModules from './modules';
import type { AllureRuntimeContext } from './AllureRuntimeContext';

export class AllureRuntime implements IAllureRuntime {
  readonly #context: AllureRuntimeContext;
  readonly #coreModule: runtimeModules.CoreModule;
  readonly #basicStepsModule: runtimeModules.StepsModule;
  readonly #contentAttachmentsModule: runtimeModules.ContentAttachmentsModule;
  readonly #fileAttachmentsModule: runtimeModules.FileAttachmentsModule;
  readonly #stepsDecorator: runtimeModules.StepsDecorator;

  constructor(context: AllureRuntimeContext) {
    this.#context = context;
    this.#coreModule = runtimeModules.CoreModule.create(context);
    this.#basicStepsModule = runtimeModules.StepsModule.create(context);
    this.#contentAttachmentsModule =
      runtimeModules.ContentAttachmentsModule.create(context);
    this.#fileAttachmentsModule =
      runtimeModules.FileAttachmentsModule.create(context);
    this.#stepsDecorator = new runtimeModules.StepsDecorator({ runtime: this });
  }

  $bind = (options?: AllureRuntimeBindOptions): AllureRuntime => {
    const { metadata = true, time = false } = options ?? {};

    return new AllureRuntime({
      ...this.#context,
      getCurrentMetadata: metadata
        ? constant(this.#context.getCurrentMetadata())
        : this.#context.getCurrentMetadata,
      getNow: time ? constant(this.#context.getNow()) : this.#context.getNow,
    });
  };

  $plug = (callback: AllureRuntimePluginCallback): this => {
    callback({
      runtime: this,
      contentAttachmentHandlers: this.#context.contentAttachmentHandlers,
      fileAttachmentHandlers: this.#context.fileAttachmentHandlers,
      inferMimeType: this.#context.inferMimeType,
    });

    return this;
  };

  flush = () => this.#context.flush();

  description: IAllureRuntime['description'] = (value) => {
    this.#coreModule.description(value);
  };

  descriptionHtml: IAllureRuntime['descriptionHtml'] = (value) => {
    this.#coreModule.descriptionHtml(value);
  };

  label: IAllureRuntime['label'] = (name, value) => {
    this.#coreModule.label(name, value);
  };

  link: IAllureRuntime['link'] = (url, name, type) => {
    this.#coreModule.link({ name, url, type });
  };

  parameter: IAllureRuntime['parameter'] = (name, value, options) => {
    this.#coreModule.parameter({
      name,
      value: String(value),
      ...options,
    });
  };

  parameters: IAllureRuntime['parameters'] = (parameters) => {
    for (const [name, value] of Object.entries(parameters)) {
      if (value && typeof value === 'object') {
        const raw = value as Parameter;
        this.#coreModule.parameter({ ...raw, name });
      } else {
        this.parameter(name, value);
      }
    }
  };

  status: IAllureRuntime['status'] = (status, statusDetails) => {
    this.#coreModule.status(status);
    if (isObject(statusDetails)) {
      this.#coreModule.statusDetails(statusDetails);
    }
  };

  statusDetails: IAllureRuntime['statusDetails'] = (statusDetails) => {
    this.#coreModule.statusDetails(statusDetails || {});
  };

  step: IAllureRuntime['step'] = (name, function_) =>
    this.#basicStepsModule.step(name, function_);

  // @ts-expect-error TS2322: too few arguments
  createStep: IAllureRuntime['createStep'] = (
    nameFormat,
    maybeParameters,
    maybeFunction,
  ) => {
    const function_: any = maybeFunction ?? maybeParameters;
    if (typeof function_ !== 'function') {
      throw new TypeError(
        `Expected a function, got instead: ${util.inspect(function_)}`,
      );
    }

    const userParameters = Array.isArray(maybeParameters)
      ? maybeParameters
      : undefined;

    return this.#stepsDecorator.createStep(
      nameFormat,
      function_,
      userParameters,
    );
  };

  attachment: IAllureRuntime['attachment'] = (name, content, mimeType) =>
    this.#contentAttachmentsModule.attachment(content, {
      name,
      mimeType,
    });

  // @ts-expect-error TS2322: is not assignable to type 'string'
  fileAttachment: IAllureRuntime['fileAttachment'] = (
    filePath,
    nameOrOptions,
  ) => {
    const options =
      typeof nameOrOptions === 'string'
        ? { name: nameOrOptions }
        : { ...nameOrOptions };

    return this.#fileAttachmentsModule.attachment(filePath, options);
  };

  createAttachment: IAllureRuntime['createAttachment'] = (
    function_,
    nameOrOptions,
  ) => {
    const options =
      typeof nameOrOptions === 'string'
        ? { name: nameOrOptions }
        : { ...nameOrOptions };

    return this.#contentAttachmentsModule.createAttachment(function_, options);
  };

  createFileAttachment: IAllureRuntime['createFileAttachment'] = (
    function_,
    nameOrOptions,
  ) => {
    const options =
      typeof nameOrOptions === 'string'
        ? { name: nameOrOptions }
        : { ...nameOrOptions };

    return this.#fileAttachmentsModule.createAttachment(function_, options);
  };
}
