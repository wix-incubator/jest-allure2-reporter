import type { Function_ } from '../../utils/types';
import { wrapFunction } from '../../utils/wrapFunction';
import { formatString } from '../../utils/formatString';

import type { IAllureRuntime, ParameterOrString } from './types';

export type FunctionalStepsModuleContext = {
  runtime: Pick<IAllureRuntime, 'step' | 'parameter'>;
};

export class StepsDecorator {
  constructor(protected readonly context: FunctionalStepsModuleContext) {}

  createStep<T, F extends Function_<T>>(
    nameFormat: string,
    function_: F,
    userParameters?: ParameterOrString[],
  ): F {
    const runtime = this.context.runtime;
    const handleArguments = (arguments_: IArguments) => {
      const parameters =
        userParameters ??
        (Array.from(arguments_, noop) as (ParameterOrString | undefined)[]);

      const allureParameters = parameters.map(resolveParameter, arguments_);

      for (const [name, value, options] of allureParameters) {
        runtime.parameter(name, value, options);
      }
    };

    return wrapFunction(function_, function (this: unknown): T {
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
    } as F);
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

function noop() {
  /* no-op */
}
