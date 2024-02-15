import type { Status, StatusDetails } from 'jest-allure2-reporter';

import { getStatusDetails, isPromiseLike } from '../../utils';
import type { AllureTestItemMetadataProxy } from '../../metadata';
import type { AllureRuntimeContext } from '../AllureRuntimeContext';

export type BasicStepsModuleContext = {
  readonly metadata: AllureTestItemMetadataProxy;
  readonly now: number;
};

export class StepsModule {
  constructor(protected readonly context: BasicStepsModuleContext) {}

  static create(context: AllureRuntimeContext): StepsModule {
    return new StepsModule({
      get metadata() {
        return context.getCurrentMetadata();
      },
      get now() {
        return context.getNow();
      },
    });
  }

  step<T = unknown>(name: string, function_: () => T): T {
    this.#startStep(name);
    const end = this.#stopStep;

    let result: T;
    try {
      result = function_();

      if (isPromiseLike(result)) {
        this.context.metadata.set('stage', 'running');

        result.then(
          () => end('passed'),
          (error: unknown) => end('failed', getStatusDetails(error)),
        );
      } else {
        end('passed');
      }

      return result;
    } catch (error: unknown) {
      end('failed', getStatusDetails(error));
      throw error;
    }
  }

  #startStep = (name: string) => {
    this.context.metadata.$startStep().assign({
      stage: 'scheduled',
      start: this.context.now,
      description: [name],
    });
  };

  #stopStep = (status: Status, statusDetails?: StatusDetails) => {
    this.context.metadata
      .assign({
        stage: 'finished',
        stop: this.context.now,
      })
      .defaults({
        status,
        statusDetails,
      })
      .$stopStep();
  };
}
