import type { Metadata } from 'jest-metadata';
import type { LabelName, Status, StatusDetails } from 'jest-allure2-reporter';

import type { ParameterOrString } from './index';
import { isPromiseLike } from '../../utils/isPromiseLike';
import { wrapFunction } from '../../utils/wrapFunction';
import { formatString } from '../../utils/formatString';

import type {
  AllureRuntimeBindOptions,
  IAllureRuntime,
  ParameterOptions,
} from './IAllureRuntime';
import { AllureTestCaseMetadataProxy } from './proxies';

export type AllureRuntimeConfig = {
  metadataProvider: () => Metadata;
  nowProvider: () => number;
};

const constant =
  <T>(value: T) =>
  () =>
    value;
const noop = (..._arguments: unknown[]) => void 0;

export class AllureRuntime implements IAllureRuntime {
  readonly #metadataProvider: AllureRuntimeConfig['metadataProvider'];
  readonly #now: AllureRuntimeConfig['nowProvider'];
  #idle = Promise.resolve();

  get #metadata(): AllureTestCaseMetadataProxy {
    return new AllureTestCaseMetadataProxy(this.#metadataProvider());
  }

  constructor(config: AllureRuntimeConfig) {
    this.#metadataProvider = config.metadataProvider;
    this.#now = config.nowProvider;
  }

  $bind(options?: AllureRuntimeBindOptions): AllureRuntime {
    const { metadata = true, time = false } = options ?? {};

    return new AllureRuntime({
      metadataProvider: metadata
        ? constant(this.#metadataProvider())
        : this.#metadataProvider,
      nowProvider: time ? constant(this.#now()) : this.#now,
    });
  }

  $plug(_callback: any): any {
    // TODO: implement
  }

  async flush(): Promise<void> {
    await this.#idle;
  }

  description(value: string) {
    this.#metadata.push('description', [value]);
  }

  descriptionHtml(value: string) {
    this.#metadata.push('descriptionHtml', [value]);
  }

  label(name: LabelName | string, value: string) {
    this.#metadata.push('labels', [{ name, value }]);
  }

  link(url: string, name = url, type?: string) {
    this.#metadata.push('links', [{ name, url, type }]);
  }

  parameter(name: string, value: unknown, options?: ParameterOptions) {
    this.#metadata.push('parameters', [
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

  status(status: Status, statusDetails?: StatusDetails) {
    if (statusDetails) {
      this.#metadata.assign({ status, statusDetails });
    } else {
      this.#metadata.assign({ statusDetails });
    }
  }

  statusDetails(statusDetails: StatusDetails) {
    this.#metadata.set('statusDetails', statusDetails);
  }

  step<T = unknown>(name: string, function_: () => T): T {
    this.#startStep(name, function_);
    const end = this.#stopStep;

    let result: T;
    try {
      result = function_();

      if (isPromiseLike(result)) {
        this.#metadata.set('stage', 'running');

        result.then(
          () => end('passed'),
          (error) =>
            end('failed', { message: error.message, trace: error.stack }),
        );
      } else {
        end('passed');
      }

      return result;
    } catch (error: unknown) {
      end('failed', {
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
    this.#metadata.$startStep().assign({
      stage: 'scheduled',
      start: this.#now(),
      code: function_.toString(),
      description: [name],
    });
  };

  #stopStep = (status: Status, statusDetails?: StatusDetails) => {
    const existing = this.#metadata.get(undefined, {} as any);
    this.#metadata
      .assign({
        stage: 'finished',
        status: existing.status ?? status,
        statusDetails: existing.statusDetails ?? statusDetails,
        stop: this.#now(),
      })
      .$stopStep();
  };
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
