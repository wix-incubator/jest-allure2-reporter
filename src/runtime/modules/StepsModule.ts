import type {
  AllureTestCaseMetadata,
  Status,
  StatusDetails,
} from 'jest-allure2-reporter';

import { isPromiseLike } from '../../utils';
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
    this.#startStep(name, function_);
    const end = this.#stopStep;

    let result: T;
    try {
      result = function_();

      if (isPromiseLike(result)) {
        this.context.metadata.set('stage', 'running');

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

  #startStep = (name: string, function_: Function) => {
    this.context.metadata.$startStep().assign({
      stage: 'scheduled',
      start: this.context.now,
      code: function_.toString(),
      description: [name],
    });
  };

  #stopStep = (status: Status, statusDetails?: StatusDetails) => {
    const existing = this.context.metadata.get<Partial<AllureTestCaseMetadata>>(
      undefined,
      {},
    );

    this.context.metadata
      .assign({
        stage: 'finished',
        status: existing.status ?? status,
        statusDetails: existing.statusDetails ?? statusDetails,
        stop: this.context.now,
      })
      .$stopStep();
  };
}
