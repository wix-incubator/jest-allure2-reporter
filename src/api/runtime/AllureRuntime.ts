import util from 'node:util';

import type {
  LabelName,
  Parameter,
  Status,
  StatusDetails,
} from 'jest-allure2-reporter';

import { constant } from '../../utils';

import type {
  AllureRuntimeBindOptions,
  AllureRuntimePluginCallback,
  IAllureRuntime,
  ParameterOptions,
  ParameterOrString,
} from './types';
import * as runtimeModules from './modules';
import { AllureRuntimeContext } from './AllureRuntimeContext';
import type { AllureRuntimeConfig } from './AllureRuntimeConfig';

export class AllureRuntime implements IAllureRuntime {
  readonly #config: AllureRuntimeConfig;
  readonly #context: AllureRuntimeContext;
  readonly #coreModule: runtimeModules.CoreModule;
  readonly #basicStepsModule: runtimeModules.StepsModule;
  readonly #contentAttachmentsModule: runtimeModules.ContentAttachmentsModule;
  readonly #fileAttachmentsModule: runtimeModules.FileAttachmentsModule;
  readonly #stepsDecorator: runtimeModules.StepsDecorator;

  constructor(config: AllureRuntimeConfig) {
    this.#config = config;
    this.#context = new AllureRuntimeContext(config);

    const context = this.#context;
    this.#coreModule = runtimeModules.CoreModule.create(context);
    this.#basicStepsModule = runtimeModules.StepsModule.create(context);
    this.#contentAttachmentsModule =
      runtimeModules.ContentAttachmentsModule.create(context);
    this.#fileAttachmentsModule =
      runtimeModules.FileAttachmentsModule.create(context);
    this.#stepsDecorator = new runtimeModules.StepsDecorator({ runtime: this });
  }

  $bind(options?: AllureRuntimeBindOptions): AllureRuntime {
    const { metadata = true, time = false } = options ?? {};

    return new AllureRuntime({
      ...this.#config,
      getMetadata: metadata
        ? constant(this.#config.getMetadata())
        : this.#config.getMetadata,
      getNow: time ? constant(this.#config.getNow()) : this.#config.getNow,
    });
  }

  $plug(callback: AllureRuntimePluginCallback): this {
    callback({
      runtime: this,
      contentAttachmentHandlers: this.#context.contentAttachmentHandlers,
      fileAttachmentHandlers: this.#context.fileAttachmentHandlers,
      inferMimeType: this.#context.inferMimeType,
    });

    return this;
  }

  async flush(): Promise<void> {
    await this.#context.idle;
  }

  description(value: string) {
    this.#coreModule.description(value);
  }

  descriptionHtml(value: string) {
    this.#coreModule.descriptionHtml(value);
  }

  label(name: LabelName, value: string) {
    this.#coreModule.label(name, value);
  }

  link(url: string, name = url, type?: string) {
    this.#coreModule.link({ name, url, type });
  }

  parameter(name: string, value: unknown, options?: ParameterOptions) {
    this.#coreModule.parameter({
      name,
      value: String(value),
      ...options,
    });
  }

  parameters(parameters: Record<string, unknown>) {
    for (const [name, value] of Object.entries(parameters)) {
      if (value && typeof value === 'object') {
        const raw = value as Parameter;
        this.#coreModule.parameter({ ...raw, name });
      } else {
        this.parameter(name, value);
      }
    }
  }

  status(status: Status, statusDetails?: StatusDetails) {
    this.#coreModule.status(status);
    if (statusDetails !== undefined) {
      this.#coreModule.statusDetails(statusDetails || {});
    }
  }

  statusDetails(statusDetails: StatusDetails | null) {
    this.#coreModule.statusDetails(statusDetails || {});
  }

  step<T = unknown>(name: string, function_: () => T): T {
    return this.#basicStepsModule.step<T>(name, function_);
  }

  createStep<F extends Function>(
    nameFormat: string,
    maybeParameters: F | ParameterOrString[],
    maybeFunction?: F,
  ): F {
    const function_: any = maybeFunction ?? (maybeParameters as F);
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
  }

  attachment: IAllureRuntime['attachment'] = (name, content, mimeType) =>
    this.#contentAttachmentsModule.attachment(content, {
      name,
      mimeType,
    }) as any; // TODO: fix type

  fileAttachment: IAllureRuntime['fileAttachment'] = (
    filePath,
    nameOrOptions,
  ) => {
    const options =
      typeof nameOrOptions === 'string'
        ? { name: nameOrOptions }
        : { ...nameOrOptions };

    return this.#fileAttachmentsModule.attachment(filePath, options) as any; // TODO: fix type
  };

  createAttachment: IAllureRuntime['createAttachment'] = (
    function_,
    nameOrOptions,
  ) => {
    const options =
      typeof nameOrOptions === 'string'
        ? { name: nameOrOptions }
        : { ...nameOrOptions };

    return this.#contentAttachmentsModule.createAttachment(
      function_,
      options,
    ) as any; // TODO: fix type
  };

  createFileAttachment: IAllureRuntime['createFileAttachment'] = (
    function_,
    nameOrOptions,
  ) => {
    const options =
      typeof nameOrOptions === 'string'
        ? { name: nameOrOptions }
        : { ...nameOrOptions };

    return this.#fileAttachmentsModule.createAttachment(
      function_,
      options,
    ) as any; // TODO: fix type
  };
}
