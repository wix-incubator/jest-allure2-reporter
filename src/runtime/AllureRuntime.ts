import path from 'node:path';

import type {
  LabelName,
  ParameterOptions,
  StatusDetails,
} from '@noomorph/allure-js-commons';
import { Stage, Status } from '@noomorph/allure-js-commons';
import type { Metadata } from 'jest-metadata';
import type {
  AllureTestStepMetadata,
  AttachmentContent,
  AttachmentOptions,
  IAllureRuntime,
  ParameterOrString,
} from 'jest-allure2-reporter';

import {
  CURRENT_STEP,
  DESCRIPTION,
  DESCRIPTION_HTML,
  LABELS,
  LINKS,
  PREFIX,
} from '../constants';
import { isPromiseLike } from '../utils/isPromiseLike';
import { inferMimeType } from '../utils/inferMimeType';
import { hijackFunction } from '../utils/hijackFunction';
import type { Function_, MaybePromise } from '../utils/types';
import { processMaybePromise } from '../utils/processMaybePromise';
import { wrapFunction } from '../utils/wrapFunction';
import { formatString } from '../utils/formatString';

import type { IAttachmentsHandler } from './AttachmentsHandler';

export type AllureRuntimeConfig = {
  attachmentsHandler: IAttachmentsHandler;
  metadataProvider: () => Metadata;
  nowProvider: () => number;
};

const noop = (..._arguments: unknown[]) => void 0;

export class AllureRuntime implements IAllureRuntime {
  readonly #attachmentsHandler: AllureRuntimeConfig['attachmentsHandler'];
  readonly #metadataProvider: AllureRuntimeConfig['metadataProvider'];
  readonly #now: AllureRuntimeConfig['nowProvider'];
  #idle = Promise.resolve();

  get #metadata(): Metadata {
    return this.#metadataProvider();
  }

  constructor(config: AllureRuntimeConfig) {
    this.#attachmentsHandler = config.attachmentsHandler;
    this.#metadataProvider = config.metadataProvider;
    this.#now = config.nowProvider;
  }

  async flush(): Promise<void> {
    await this.#idle;
  }

  description(value: string) {
    this.#metadata.push(DESCRIPTION, [value]);
  }

  descriptionHtml(value: string) {
    this.#metadata.push(DESCRIPTION_HTML, [value]);
  }

  label(name: LabelName | string, value: string) {
    this.#metadata.push(LABELS, [{ name, value }]);
  }

  link(name: string, url: string, type?: string) {
    this.#metadata.push(LINKS, [{ name, url, type }]);
  }

  parameter(name: string, value: unknown, options?: ParameterOptions) {
    this.#metadata.push(this.#localPath('parameters'), [
      {
        name,
        value: `${value}`,
        ...options,
      },
    ]);
  }

  parameters(parameters: Record<string, unknown>) {
    for (const [name, value] of Object.entries(parameters)) {
      this.parameter(name, value);
    }
  }

  status(status?: Status | StatusDetails, statusDetails?: StatusDetails) {
    this.#metadata.assign(this.#localPath(), { status, statusDetails });
  }

  statusDetails(statusDetails: StatusDetails) {
    this.#metadata.assign(this.#localPath(), { statusDetails });
  }

  attachment<T extends AttachmentContent>(
    name: string,
    content: MaybePromise<T>,
    mimeType?: string,
  ): typeof content {
    return processMaybePromise(
      content,
      this.#handleDynamicAttachment({ name, mimeType }),
    );
  }

  createAttachment<T extends AttachmentContent>(
    function_: Function_<MaybePromise<T>>,
    rawOptions: string | AttachmentOptions,
  ): typeof function_ {
    const options = this.#resolveAttachmentOptions(rawOptions);
    return hijackFunction(function_, this.#handleDynamicAttachment(options));
  }

  fileAttachment(
    filePathOrPromise: MaybePromise<string>,
    rawOptions?: string | AttachmentOptions,
  ): any {
    const options = this.#resolveAttachmentOptions(rawOptions);
    return processMaybePromise(
      filePathOrPromise,
      this.#handleStaticAttachment(options),
    );
  }

  createFileAttachment(
    function_: Function_<MaybePromise<string>>,
    rawOptions?: string | AttachmentOptions,
  ): typeof function_ {
    const options = this.#resolveAttachmentOptions(rawOptions);
    return hijackFunction<string>(
      function_,
      this.#handleStaticAttachment(options),
    );
  }

  step<T = unknown>(name: string, function_: () => T): T {
    this.#startStep(name, function_);
    const end = this.#stopStep;

    let result: T;
    try {
      result = function_();

      if (isPromiseLike(result)) {
        this.#updateStep(Stage.RUNNING);

        result.then(
          () => end(Status.PASSED),
          (error) =>
            end(Status.FAILED, { message: error.message, trace: error.stack }),
        );
      } else {
        end(Status.PASSED);
      }

      return result;
    } catch (error: unknown) {
      end(Status.FAILED, {
        message: (error as Error).message,
        trace: (error as Error).stack,
      });
      throw error;
    }
  }

  createStep<F extends Function>(
    nameFormat: string,
    maybeParameters: F | ParameterOrString[],
    maybeFunction?: F,
  ): F {
    const function_: any = maybeFunction ?? (maybeParameters as F);
    if (typeof function_ !== 'function') {
      throw new TypeError(
        `Expected a function, got ${typeof function_} instead`,
      );
    }

    const runtime = this;
    const userParameters = Array.isArray(maybeParameters)
      ? maybeParameters
      : null;

    const handleArguments = (arguments_: IArguments) => {
      const parameters = userParameters ?? Array.from(arguments_, noop);
      const allureParameters = parameters.map(resolveParameter, arguments_);
      for (const [name, value, options] of allureParameters) {
        runtime.parameter(name, value, options);
      }
    };

    return wrapFunction(function_, function (this: unknown) {
      const arguments_ = arguments;
      const name = formatString(nameFormat, ...arguments_);
      return runtime.step(
        name,
        wrapFunction(
          function_,
          function step(this: unknown) {
            handleArguments(arguments_);
            return Reflect.apply(function_, this, arguments_);
          }.bind(this),
        ),
      );
    });
  }

  #startStep = (name: string, function_: Function) => {
    const count = this.#metadata.get(this.#localPath('steps', 'length'), 0);
    this.#metadata.push(this.#localPath('steps'), [
      {
        name,
        stage: Stage.SCHEDULED,
        start: this.#now(),
        code: function_.toString(),
      },
    ]);
    // eslint-disable-next-line unicorn/no-array-push-push
    this.#metadata.push(CURRENT_STEP, ['steps', `${count}`]);
  };

  #stopStep = (status: Status, statusDetails?: StatusDetails) => {
    const existing = this.#metadata.get(this.#localPath(), {} as any);

    this.#metadata.assign(this.#localPath(), {
      stage: Stage.FINISHED,
      status: existing.status ?? status,
      statusDetails: existing.statusDetails ?? statusDetails,
      stop: this.#now(),
    });

    const currentStep = this.#metadata.get(CURRENT_STEP, []) as string[];
    this.#metadata.set(CURRENT_STEP, currentStep.slice(0, -2));
  };

  #updateStep = (stage: Stage) => {
    this.#metadata.set(this.#localPath('stage'), stage);
  };

  #localPath(key?: keyof AllureTestStepMetadata, ...innerKeys: string[]) {
    const stepPath = this.#metadata.get(CURRENT_STEP, []) as string[];
    const allKeys = key ? [key, ...innerKeys] : innerKeys;
    return [PREFIX, ...stepPath, ...allKeys];
  }

  #resolveAttachmentOptions(rawOptions?: string | AttachmentOptions) {
    return !rawOptions || typeof rawOptions === 'string'
      ? { name: rawOptions, mimeType: undefined }
      : rawOptions;
  }

  #handleDynamicAttachment =
    ({ name: nameFormat, mimeType }: AttachmentOptions) =>
    (content: AttachmentContent, arguments_?: unknown[]) => {
      const name = this.#formatName(nameFormat, arguments_);
      const source = this.#attachmentsHandler.placeAttachment(name, content);
      this.#metadata.push(this.#localPath('attachments'), [
        {
          name,
          source: path.resolve(source),
          type: mimeType ?? inferMimeType(name),
        },
      ]);
      const promise = this.#attachmentsHandler.writeAttachment(source, content);
      this.#idle = this.#idle.then(() => promise);
    };

  #handleStaticAttachment =
    ({ name: rawName, mimeType }: AttachmentOptions) =>
    (filePath: string, arguments_?: unknown[]) => {
      const name = this.#formatName(
        rawName ?? path.basename(filePath),
        arguments_,
      );
      const securedPath = this.#attachmentsHandler.placeAttachment(name);
      const result = this.#attachmentsHandler.secureAttachment(
        filePath,
        securedPath,
      );
      this.#metadata.push(this.#localPath('attachments'), [
        {
          name,
          source: path.resolve(result.destinationPath),
          type: mimeType ?? inferMimeType(name, filePath),
        },
      ]);
      if (result.promise) {
        this.#idle = this.#idle.then(() => result.promise);
      }
    };

  #formatName(nameFormat?: string, arguments_?: unknown[]) {
    return arguments_
      ? formatString(nameFormat ?? 'untitled', ...arguments_)
      : nameFormat ?? 'untitled';
  }
}

function resolveParameter(
  this: unknown[],
  parameter: ParameterOrString | undefined,
  index: number,
) {
  const { name = `${index}`, ...options } =
    typeof parameter === 'string' ? { name: parameter } : parameter ?? {};

  return [name, this[index], options] as const;
}
