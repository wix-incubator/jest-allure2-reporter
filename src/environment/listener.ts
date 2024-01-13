import type { Circus } from '@jest/types';
import type {
  AllureTestCaseMetadata,
  AllureTestStepMetadata,
  Status,
} from 'jest-allure2-reporter';
import type {
  EnvironmentListenerFn,
  TestEnvironmentCircusEvent,
  TestEnvironmentSetupEvent,
} from 'jest-environment-emit';

import * as api from '../api';
import realm from '../realms';

const listener: EnvironmentListenerFn = (context) => {
  context.testEvents
    .on(
      'test_environment_setup',
      function ({ env }: TestEnvironmentSetupEvent) {
        env.global.__ALLURE__ = realm;
        const { injectGlobals } = realm.runtimeContext.getReporterConfig();
        if (injectGlobals) {
          Object.assign(env.global, api);
        }

        realm.runtimeContext
          .getFileMetadata()
          .set('workerId', process.env.JEST_WORKER_ID);
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

      realm.runtimeContext.getCurrentMetadata().assign(metadata);
    })
    .on('add_test', function ({ event }) {
      realm.runtimeContext
        .getCurrentMetadata()
        .set('code', event.fn.toString());
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
    stage: 'running',
  };

  realm.runtimeContext.getCurrentMetadata().assign(metadata);
}

function executableFailure({
  event,
}: TestEnvironmentCircusEvent<
  Circus.Event & { name: 'test_fn_failure' | 'hook_failure' }
>) {
  const metadata: AllureTestStepMetadata = {
    stop: Date.now(),
    stage: 'interrupted',
    status: 'failed',
  };

  if (event.error) {
    const message = event.error.message ?? `${event.error}`;
    const trace = event.error.stack;

    metadata.statusDetails = { message, trace };
  }

  realm.runtimeContext.getCurrentMetadata().assign(metadata);
}

// eslint-disable-next-line no-empty-pattern
function executableSuccess({}: TestEnvironmentCircusEvent) {
  const metadata: AllureTestStepMetadata = {
    stop: Date.now(),
    stage: 'finished',
    status: 'passed',
  };

  realm.runtimeContext.getCurrentMetadata().assign(metadata);
}

function testSkip() {
  const metadata: AllureTestCaseMetadata = {
    stop: Date.now(),
    stage: 'pending',
    status: 'skipped',
  };

  realm.runtimeContext.getCurrentMetadata().assign(metadata);
}

function testDone({
  event,
}: TestEnvironmentCircusEvent<Circus.Event & { name: 'test_done' }>) {
  const hasErrors = event.test.errors.length > 0;
  const errorStatus: Status = event.test.errors.some((errors) => {
    return Array.isArray(errors)
      ? errors.some(isMatcherError)
      : isMatcherError(errors);
  })
    ? 'failed'
    : 'broken';

  const metadata: AllureTestCaseMetadata = {
    stop: Date.now(),
    stage: hasErrors ? 'interrupted' : 'finished',
    status: hasErrors ? errorStatus : 'passed',
  };

  realm.runtimeContext.getCurrentMetadata().assign(metadata);
}

function isMatcherError(error: any) {
  return Boolean(error?.matcherResult);
}

export default listener;
