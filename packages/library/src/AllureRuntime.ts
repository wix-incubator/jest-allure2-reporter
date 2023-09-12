import type { Metadata } from 'jest-metadata';
import { Status, Stage } from '@noomorph/allure-js-commons';
import type {
  StatusDetails,
  ParameterOptions,
  LabelName,
} from '@noomorph/allure-js-commons';

import {
  $POINTER,
  DESCRIPTION,
  DESCRIPTION_HTML,
  LABELS,
  LINKS,
  PREFIX,
} from './constants';
import type { AllureTestStepMetadata } from './options';
import { isPromiseLike } from './utils/isPromiseLike';

export type AllureRuntimeConfig = {
  metadataProvider: () => Metadata;
  nowProvider: () => number;
};

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

  attachment(name: string, content: Buffer | string, type: string) {
    this.#metadata.push(this.#localPath('attachments'), [
      { name, content, type },
    ]);
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
    this.#metadata.push($POINTER, ['steps', `${count}`]);
  };

  #stopStep = (status: Status, statusDetails?: StatusDetails) => {
    this.#metadata.assign(this.#localPath(), {
      stage: Stage.FINISHED,
      status,
      statusDetails,
      stop: this.#now(),
    });
    const $pointer = this.#metadata.get($POINTER, []) as string[];
    this.#metadata.set($POINTER, $pointer.slice(0, -2));
  };

  #updateStep = (stage: Stage) => {
    this.#metadata.set(this.#localPath('stage'), stage);
  };

  #localPath(key?: keyof AllureTestStepMetadata, ...innerKeys: string[]) {
    const stepPath = this.#metadata.get($POINTER, []) as string[];
    const allKeys = key ? [key, ...innerKeys] : innerKeys;
    return [PREFIX, ...stepPath, ...allKeys];
  }
}
