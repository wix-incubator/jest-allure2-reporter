import { state } from 'jest-metadata';
import { TestEnvironment } from 'jest-metadata/environment-node';
import type { ForwardedCircusEvent } from 'jest-metadata/environment-decorator';

import { PREFIX } from './constants';
import type { AllureTestCaseMetadata, AllureTestStepMetadata } from './options';
import {Stage, Status} from "@noomorph/allure-js-commons";

export class AllureNodeJestEnvironment extends TestEnvironment {
  constructor(config: any, context: any) {
    super(config, context);

    state.currentMetadata.set(
      ['allure2', 'workerId'],
      process.env.JEST_WORKER_ID,
    );

    this.testEvents
      .on('add_hook', this.#addHook.bind(this))
      .on('add_test', this.#addTest.bind(this))
      .on('hook_start', this.#executableStart.bind(this))
      .on('hook_failure', this.#executableFailure.bind(this))
      .on('hook_success', this.#executableSuccess.bind(this))
      .on('test_fn_start', this.#executableStart.bind(this))
      .on('test_fn_success', this.#executableSuccess.bind(this))
      .on('test_fn_failure', this.#executableFailure.bind(this));
  }

  #addHook({event}: ForwardedCircusEvent) {
    const metadata = {
      name: event.hookType,
      start: Date.now(),
      code: event.fn.toString(),
    } as AllureTestStepMetadata;

    state.currentMetadata.assign(PREFIX, metadata);
  }

  #addTest({event}: ForwardedCircusEvent) {
    const metadata: AllureTestCaseMetadata = {
      identifier: state.currentMetadata.id,
      stage: Stage.SCHEDULED,
      code: event.fn.toString(),
    };

    state.currentMetadata.assign(PREFIX, metadata);
  }

  #executableStart({}: ForwardedCircusEvent) {
    const metadata: AllureTestStepMetadata = {
      start: Date.now(),
      stage: Stage.RUNNING,
    };

    state.currentMetadata.assign(PREFIX, metadata);
  }

  #executableFailure({event}: ForwardedCircusEvent) {
    const metadata: AllureTestStepMetadata = {
      stop: Date.now(),
      stage: Stage.FINISHED,
      status: Status.FAILED,
      statusDetails: event.error ? {
        message: event.error.message,
        trace: event.error.stack,
      } : {},
    };

    state.currentMetadata.assign(PREFIX, metadata);
  }

  #executableSuccess({}: ForwardedCircusEvent) {
    const metadata: AllureTestStepMetadata = {
      stop: Date.now(),
      stage: Stage.FINISHED,
      status: Status.PASSED,
      statusDetails: {},
    };

    state.currentMetadata.assign(PREFIX, metadata);
  }
}

export default AllureNodeJestEnvironment;
