import util from 'node:util';

import type { Parameter } from 'jest-allure2-reporter';

import { constant, isObject } from '../utils';

import type { AllureRuntimeBindOptions, AllureRuntimePluginCallback, AllureRuntime } from './types';
import * as runtimeModules from './modules';
import type { AllureRuntimeContext } from './AllureRuntimeContext';

export class AllureRuntimeImplementation implements AllureRuntime {
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
    this.#contentAttachmentsModule = runtimeModules.ContentAttachmentsModule.create(context);
    this.#fileAttachmentsModule = runtimeModules.FileAttachmentsModule.create(context);
    this.#stepsDecorator = new runtimeModules.StepsDecorator({ runtime: this });
  }

  $bind = (options?: AllureRuntimeBindOptions): AllureRuntimeImplementation => {
    const { metadata = true, time = false } = options ?? {};

    return new AllureRuntimeImplementation({
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

  description: AllureRuntime['description'] = (value) => {
    // TODO: assert is a string
    this.#coreModule.description(value);
  };

  descriptionHtml: AllureRuntime['descriptionHtml'] = (value) => {
    // TODO: assert is a string
    this.#coreModule.descriptionHtml(value);
  };

  fullName: AllureRuntime['fullName'] = (value) => {
    // TODO: assert is a string
    this.#coreModule.fullName(value);
  };

  historyId(value: string) {
    // TODO: assert is a string
    this.#coreModule.historyId(value);
  }

  label: AllureRuntime['label'] = (name, value) => {
    // TODO: assert name is a string
    // TODO: assert value is a string
    this.#coreModule.label(name, value);
  };

  link: AllureRuntime['link'] = (url, name, type) => {
    // TODO: url is a string
    // TODO: name is a string or nullish
    // TODO: type is a string or nullish
    this.#coreModule.link({ name, url, type });
  };

  displayName: AllureRuntime['displayName'] = (value) => {
    // TODO: assert is a string
    this.#coreModule.displayName(value);
  };

  parameter: AllureRuntime['parameter'] = (name, value, options) => {
    // TODO: assert name is a string
    this.#coreModule.parameter({
      name,
      value: String(value),
      ...options,
    });
  };

  parameters: AllureRuntime['parameters'] = (parameters) => {
    for (const [name, value] of Object.entries(parameters)) {
      if (value && typeof value === 'object') {
        const raw = value as Parameter;
        this.#coreModule.parameter({ ...raw, name });
      } else {
        this.parameter(name, value);
      }
    }
  };

  status: AllureRuntime['status'] = (status, statusDetails) => {
    // TODO: assert string literal
    this.#coreModule.status(status);
    if (isObject(statusDetails)) {
      this.#coreModule.statusDetails(statusDetails);
    }
  };

  statusDetails: AllureRuntime['statusDetails'] = (statusDetails) => {
    // TODO: assert is not nullish
    this.#coreModule.statusDetails(statusDetails);
  };

  step: AllureRuntime['step'] = (name, function_) =>
    // TODO: assert name is a string
    // TODO: assert function_ is a function
    this.#basicStepsModule.step(name, function_);

  // @ts-expect-error TS2322: too few arguments
  createStep: AllureRuntime['createStep'] = (nameFormat, maybeParameters, maybeFunction) => {
    // TODO: assert nameFormat is a string
    const function_: any = maybeFunction ?? maybeParameters;
    if (typeof function_ !== 'function') {
      throw new TypeError(`Expected a function, got instead: ${util.inspect(function_)}`);
    }

    const userParameters = Array.isArray(maybeParameters) ? maybeParameters : undefined;

    return this.#stepsDecorator.createStep(nameFormat, function_, userParameters);
  };

  attachment: AllureRuntime['attachment'] = (name, content, mimeType) =>
    // TODO: assert name is a string
    this.#contentAttachmentsModule.attachment(content, {
      name,
      mimeType,
    });

  fileAttachment: AllureRuntime['fileAttachment'] = (filePath, nameOrOptions) => {
    // TODO: assert filePath is a string
    const options =
      typeof nameOrOptions === 'string' ? { name: nameOrOptions } : { ...nameOrOptions };

    return this.#fileAttachmentsModule.attachment(filePath, options);
  };

  createAttachment: AllureRuntime['createAttachment'] = (function_, nameOrOptions) => {
    // TODO: assert function_ is a function
    // TODO: assert nameOrOptions is a string or an object
    const options =
      typeof nameOrOptions === 'string' ? { name: nameOrOptions } : { ...nameOrOptions };

    return this.#contentAttachmentsModule.createAttachment(function_, options);
  };

  createFileAttachment: AllureRuntime['createFileAttachment'] = (function_, nameOrOptions) => {
    // TODO: assert function_ is a function
    // TODO: assert nameOrOptions is a string or an object
    const options =
      typeof nameOrOptions === 'string' ? { name: nameOrOptions } : { ...nameOrOptions };

    return this.#fileAttachmentsModule.createAttachment(function_, options);
  };
}
