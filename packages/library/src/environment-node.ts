import { state } from 'jest-metadata';
import { TestEnvironment } from 'jest-metadata/environment-node';
import type { ForwardedCircusEvent } from 'jest-metadata/environment-decorator';
import type { StatusDetails } from '@noomorph/allure-js-commons';
import { Stage, Status } from '@noomorph/allure-js-commons';

import { PREFIX } from './constants';
import type { AllureTestCaseMetadata, AllureTestStepMetadata } from './options';
import { AllureRuntime } from './AllureRuntime';

export class AllureNodeJestEnvironment extends TestEnvironment {
  // @ts-expect-error TS2564
  private readonly allure: AllureRuntime;

  constructor(config: any, context: any) {
    super(config, context);

    state.currentMetadata.set(
      ['allure2', 'workerId'],
      process.env.JEST_WORKER_ID,
    );

    this.allure = new AllureRuntime({
      metadataProvider: () => state.currentMetadata,
      nowProvider: () => Date.now(),
    });

    this.testEvents
      .on('add_hook', this.#addHook.bind(this))
      .on('add_test', this.#addTest.bind(this))
      .on('hook_start', this.#executableStart.bind(this))
      .on('hook_failure', this.#executableFailure.bind(this))
      .on('hook_success', this.#executableSuccess.bind(this))
      .on('test_start', this.#executableStart.bind(this))
      .on('test_done', this.#testDone.bind(this))
      .on('test_fn_start', this.#executableStart.bind(this))
      .on('test_fn_success', this.#executableSuccess.bind(this))
      .on('test_fn_failure', this.#executableFailure.bind(this));
  }

  #addHook({ event }: ForwardedCircusEvent) {
    const metadata = {
      name: event.hookType,
      code: event.fn.toString(),
    } as AllureTestStepMetadata;

    state.currentMetadata.assign(PREFIX, metadata);
  }

  #addTest({ event }: ForwardedCircusEvent) {
    const metadata: AllureTestCaseMetadata = {
      identifier: state.currentMetadata.id,
      stage: Stage.SCHEDULED,
      code: event.fn.toString(),
    };

    state.currentMetadata.assign(PREFIX, metadata);
  }

  // eslint-disable-next-line no-empty-pattern
  #executableStart({}: ForwardedCircusEvent) {
    const metadata: AllureTestStepMetadata = {
      start: Date.now(),
      stage: Stage.RUNNING,
    };

    state.currentMetadata.assign(PREFIX, metadata);
  }

  #executableFailure({ event }: ForwardedCircusEvent) {
    const metadata: AllureTestStepMetadata = {
      stop: Date.now(),
      stage: Stage.FINISHED,
      status: Status.FAILED,
      statusDetails: event.error
        ? {
            message: event.error.message,
            trace: event.error.stack,
          }
        : {},
    };

    state.currentMetadata.assign(PREFIX, metadata);
  }

  // eslint-disable-next-line no-empty-pattern
  #executableSuccess({}: ForwardedCircusEvent) {
    const metadata: AllureTestStepMetadata = {
      stop: Date.now(),
      stage: Stage.FINISHED,
      status: Status.PASSED,
      statusDetails: {},
    };

    const id = state.currentMetadata.id;
    console.log(id);
    state.currentMetadata.assign(PREFIX, metadata);
  }

  #testDone({ event }: ForwardedCircusEvent) {
    const metadata: AllureTestStepMetadata = {
      stop: Date.now(),
      stage: Stage.FINISHED,
      status: event.test.failing ? Status.FAILED : Status.PASSED,
      // eslint-disable-next-line unicorn/no-array-reduce
      statusDetails: event.test.errors.reduce(
        (accumulator: StatusDetails, error: Error) => {
          accumulator.message += error.message + '\n';
          accumulator.trace += error.stack + '\n';
          return accumulator;
        },
        { message: '', trace: '' },
      ),
    };

    state.currentMetadata.assign(PREFIX, metadata);
  }
}

export default AllureNodeJestEnvironment;
