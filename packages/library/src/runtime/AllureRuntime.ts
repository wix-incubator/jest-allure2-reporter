/* eslint-disable @typescript-eslint/ban-types, prefer-rest-params */
import type { Metadata } from 'jest-metadata';
import { Status, Stage } from '@noomorph/allure-js-commons';
import type {
  StatusDetails,
  Parameter,
  ParameterOptions,
  LabelName,
} from '@noomorph/allure-js-commons';

import {
  CURRENT_STEP,
  DESCRIPTION,
  DESCRIPTION_HTML,
  LABELS,
  LINKS,
  PREFIX,
} from '../constants';
import { isPromiseLike } from '../utils/isPromiseLike';
import type { AllureTestStepMetadata } from '../metadata/metadata';

export type AllureRuntimeConfig = {
  metadataProvider: () => Metadata;
  nowProvider: () => number;
};

export type ParameterOrString = string | Parameter;

export class AllureRuntime {
  readonly #metadataProvider: AllureRuntimeConfig['metadataProvider'];
  readonly #now: AllureRuntimeConfig['nowProvider'];

  get #metadata(): Metadata {
    return this.#metadataProvider();
  }

  constructor(config: AllureRuntimeConfig) {
    this.#metadataProvider = config.metadataProvider;
    this.#now = config.nowProvider;
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

  attachment(name: string, content: Buffer | string, type: string) {
    this.#metadata.push(this.#localPath('attachments'), [
      { name, content, type },
    ]);
  }

  createStep<F extends Function>(
    name: string,
    arguments_: ParameterOrString[],
    function_: F,
  ): F;
  createStep<F extends Function>(name: string, function_: F): F;
  createStep<F extends Function>(
    name: string,
    maybeArguments: F | ParameterOrString[],
    maybeFunction?: F,
  ): F {
    // eslint-disable-next-line @typescript-eslint/no-this-alias,unicorn/no-this-assignment
    const runtime = this;
    const function_ =
      typeof maybeArguments === 'function' ? maybeArguments : maybeFunction!;
    const definitions = Array.isArray(maybeArguments) ? maybeArguments : null;

    function wrapped(this: unknown) {
      const thisWrapped = () => Reflect.apply(function_, this, arguments);
      return runtime.step(name, () => {
        const parameters =
          definitions ?? Array.from(arguments, (_, index) => `${index}`);

        // eslint-disable-next-line unicorn/no-for-loop
        for (let index = 0; index < parameters.length; index++) {
          const parameter = parameters[index];
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { name, value: _value, ...options } = parameter as Parameter;
          runtime.parameter(name ?? parameter, arguments[index], options);
        }
        return thisWrapped();
      });
    }

    wrapped.toString = function_.toString.bind(function_);
    return wrapped as unknown as F;
  }

  step(name: string, function_: () => Promise<unknown>): Promise<unknown>;
  step(name: string, function_: () => unknown): unknown;
  step(name: string, function_: () => unknown) {
    this.#startStep(name, function_);
    const end = this.#stopStep;

    let result: unknown;
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

  // eslint-disable-next-line @typescript-eslint/ban-types
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
    this.#metadata.assign(this.#localPath(), {
      stage: Stage.FINISHED,
      status,
      statusDetails,
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
}
