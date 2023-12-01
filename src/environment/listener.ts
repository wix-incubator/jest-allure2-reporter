import type { Circus } from '@jest/types';
import { state } from 'jest-metadata';
import { Stage, Status } from '@noomorph/allure-js-commons';
import type {
  AllureTestCaseMetadata,
  AllureTestStepMetadata,
} from 'jest-allure2-reporter';
import type {
  EnvironmentListenerFn,
  TestEnvironmentCircusEvent,
  TestEnvironmentSetupEvent,
} from 'jest-environment-emit';

import { CODE, PREFIX, WORKER_ID } from '../constants';
import realm from '../realms';

const listener: EnvironmentListenerFn = (context) => {
  context.testEvents
    .on(
      'test_environment_setup',
      function ({ env }: TestEnvironmentSetupEvent) {
        env.global.__ALLURE__ = realm;
        state.currentMetadata.set(WORKER_ID, process.env.JEST_WORKER_ID);
      },
    )
    .on('add_hook', function ({ event }) {
      const code = event.fn.toString();
      const hidden = code.includes(
        "during setup, this cannot be null (and it's fine to explode if it is)",
      );

      const metadata = {
        code,
      } as Record<string, unknown>;

      if (hidden) {
        delete metadata.code;
        metadata.hidden = true;
      }

      state.currentMetadata.assign(PREFIX, metadata);
    })
    .on('add_test', function ({ event }) {
      state.currentMetadata.set(CODE, event.fn.toString());
    })
    .on('test_start', executableStart)
    .on('test_todo', testSkip)
    .on('test_skip', testSkip)
    .on('test_done', testDone)
    .on('hook_start', executableStart)
    .on('hook_failure', executableFailure)
    .on('hook_success', executableSuccess)
    .on('test_fn_start', executableStart)
    .on('test_fn_success', executableSuccess)
    .on('test_fn_failure', executableFailure)
    .on('teardown', async function () {
      await realm.runtime.flush();
    });
};

// eslint-disable-next-line no-empty-pattern
function executableStart({}: TestEnvironmentCircusEvent) {
  const metadata: AllureTestStepMetadata = {
    start: Date.now(),
    stage: Stage.RUNNING,
  };

  state.currentMetadata.assign(PREFIX, metadata);
}

function executableFailure({
  event,
}: TestEnvironmentCircusEvent<
  Circus.Event & { name: 'test_fn_failure' | 'hook_failure' }
>) {
  const metadata: AllureTestStepMetadata = {
    stop: Date.now(),
    stage: Stage.INTERRUPTED,
    status: Status.FAILED,
  };

  if (event.error) {
    const message = event.error.message ?? `${event.error}`;
    const trace = event.error.stack;

    metadata.statusDetails = { message, trace };
  }

  state.currentMetadata.assign(PREFIX, metadata);
}

// eslint-disable-next-line no-empty-pattern
function executableSuccess({}: TestEnvironmentCircusEvent) {
  const metadata: AllureTestStepMetadata = {
    stop: Date.now(),
    stage: Stage.FINISHED,
    status: Status.PASSED,
  };

  state.currentMetadata.assign(PREFIX, metadata);
}

function testSkip() {
  const metadata: AllureTestCaseMetadata = {
    stop: Date.now(),
    stage: Stage.PENDING,
    status: Status.SKIPPED,
  };

  state.currentMetadata.assign(PREFIX, metadata);
}

function testDone({
  event,
}: TestEnvironmentCircusEvent<Circus.Event & { name: 'test_done' }>) {
  const hasErrors = event.test.errors.length > 0;
  const errorStatus = event.test.errors.some((errors) => {
    return Array.isArray(errors)
      ? errors.some(isMatcherError)
      : isMatcherError(errors);
  })
    ? Status.FAILED
    : Status.BROKEN;

  const metadata: AllureTestCaseMetadata = {
    stop: Date.now(),
    stage: hasErrors ? Stage.INTERRUPTED : Stage.FINISHED,
    status: hasErrors ? errorStatus : Status.PASSED,
  };

  state.currentMetadata.assign(PREFIX, metadata);
}

function isMatcherError(error: any) {
  return Boolean(error?.matcherResult);
}

export default listener;
