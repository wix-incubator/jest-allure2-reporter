import type {
  AllureTestCaseMetadata,
  Status,
  StatusDetails,
} from 'jest-allure2-reporter';

import { isPromiseLike } from '../../../utils/isPromiseLike';
import type { AllureTestCaseMetadataProxy } from '../proxies';

export type BasicStepsModuleContext = {
  readonly metadata: AllureTestCaseMetadataProxy;
  readonly now: number;
};

export class StepsModule {
  constructor(protected readonly context: BasicStepsModuleContext) {}

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
