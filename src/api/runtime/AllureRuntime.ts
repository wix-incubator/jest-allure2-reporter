import util from 'node:util';

import type {
  LabelName,
  Parameter,
  Status,
  StatusDetails,
} from 'jest-allure2-reporter';

import { constant } from '../../utils/constant';

import type {
  AllureRuntimeBindOptions,
  IAllureRuntime,
  ParameterOptions,
  ParameterOrString,
} from './types';
import type {
  AllureRuntimeConfig,
  AllureRuntimeContext,
} from './AllureRuntimeContext';
import { StepsDecorator } from './StepsDecorator';

export class AllureRuntime implements IAllureRuntime {
  readonly #context: AllureRuntimeContext;
  readonly #config: AllureRuntimeConfig;
  readonly #modules: AllureRuntimeContext['modules'];
  readonly #stepsDecorator = new StepsDecorator({ runtime: this });

  constructor(context: AllureRuntimeContext) {
    this.#context = context;
    this.#config = context.config;
    this.#modules = context.modules;
  }

  $bind(options?: AllureRuntimeBindOptions): AllureRuntime {
    const { metadata = true, time = false } = options ?? {};

    return new AllureRuntime({
      ...this.#config,
      metadataProvider: metadata
        ? constant(this.#config.metadataProvider())
        : this.#config.metadataProvider,
      nowProvider: time
        ? constant(this.#config.nowProvider())
        : this.#config.nowProvider,
    } as any); // TODO: fix type
  }

  $plug(_callback: any): any {
    // TODO: implement
  }

  async flush(): Promise<void> {
    await this.#context.idle;
  }

  description(value: string) {
    this.#modules.core.description(value);
  }

  descriptionHtml(value: string) {
    this.#modules.core.descriptionHtml(value);
  }

  label(name: LabelName, value: string) {
    this.#modules.core.label(name, value);
  }

  link(url: string, name = url, type?: string) {
    this.#modules.core.link({ name, url, type });
  }

  parameter(name: string, value: unknown, options?: ParameterOptions) {
    this.#modules.core.parameter({
      name,
      value: String(value),
      ...options,
    });
  }

  parameters(parameters: Record<string, unknown>) {
    for (const [name, value] of Object.entries(parameters)) {
      if (value && typeof value === 'object') {
        const raw = value as Parameter;
        this.#modules.core.parameter({ ...raw, name });
      } else {
        this.parameter(name, value);
      }
    }
  }

  status(status: Status, statusDetails?: StatusDetails) {
    this.#modules.core.status(status);
    if (statusDetails !== undefined) {
      this.#modules.core.statusDetails(statusDetails || {});
    }
  }

  statusDetails(statusDetails: StatusDetails | null) {
    this.#modules.core.statusDetails(statusDetails || {});
  }

  step<T = unknown>(name: string, function_: () => T): T {
    return this.#modules.basicSteps.step<T>(name, function_);
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
    this.#modules.contentAttachments.attachment(content, {
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

    return this.#modules.fileAttachments.attachment(filePath, options) as any; // TODO: fix type
  };

  createAttachment: IAllureRuntime['createAttachment'] = (
    function_,
    nameOrOptions,
  ) => {
    const options =
      typeof nameOrOptions === 'string'
        ? { name: nameOrOptions }
        : { ...nameOrOptions };

    return this.#modules.contentAttachments.createAttachment(
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

    return this.#modules.fileAttachments.createAttachment(
      function_,
      options,
    ) as any; // TODO: fix type
  };
}
