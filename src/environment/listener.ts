import type { Circus } from '@jest/types';
import type {
  EnvironmentListenerFn,
  TestEnvironmentCircusEvent,
  TestEnvironmentSetupEvent,
} from 'jest-environment-emit';
import * as StackTrace from 'stacktrace-js';

import * as api from '../api';
import realm from '../realms';
import { getStatusDetails, isJestAssertionError } from '../utils';

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
    .on('add_hook', addHookType)
    .on('add_hook', addSourceLocation)
    .on('add_hook', addSourceCode)
    .on('add_hook', markJestReset)
    .on('add_test', addSourceLocation)
    .on('add_test', addSourceCode)
    .on('test_start', testStart)
    .on('test_todo', testSkip)
    .on('test_skip', testSkip)
    .on('test_done', testDone)
    .on('hook_start', executableStart)
    .on('hook_failure', executableFailure)
    .on('hook_failure', flush)
    .on('hook_success', executableSuccess)
    .on('hook_success', flush)
    .on('test_fn_start', executableStart)
    .on('test_fn_success', executableSuccess)
    .on('test_fn_success', flush)
    .on('test_fn_failure', executableFailure)
    .on('test_fn_failure', flush)
    .on('teardown', flush);
};

async function flush() {
  await realm.runtime.flush();
}

function addHookType({
  event,
}: TestEnvironmentCircusEvent<Circus.Event & { name: 'add_hook' }>) {
  const metadata = realm.runtimeContext.getCurrentMetadata();
  metadata.set('hookType', event.hookType);
}

function addSourceLocation({
  event,
}: TestEnvironmentCircusEvent<
  Circus.Event & { name: 'add_hook' | 'add_test' }
>) {
  const metadata = realm.runtimeContext.getCurrentMetadata();
  const task = StackTrace.fromError(event.asyncError).then(([frame]) => {
    if (frame) {
      metadata.set('sourceLocation', {
        fileName: frame.fileName,
        lineNumber: frame.lineNumber,
        columnNumber: frame.columnNumber,
      });
    }
  });

  realm.runtimeContext.enqueueTask(task);
}

function addSourceCode({
  event,
}: TestEnvironmentCircusEvent<
  Circus.Event & {
    name: 'hook_start' | 'test_fn_start' | 'add_test' | 'add_hook';
  }
>) {
  const code = `${getFunction(event) ?? ''}`;
  if (code) {
    realm.runtimeContext.getCurrentMetadata().set('sourceCode', code);
  }
}

function getFunction(
  event: Circus.Event & {
    name: 'hook_start' | 'test_fn_start' | 'add_test' | 'add_hook';
  },
) {
  switch (event.name) {
    case 'hook_start': {
      return event.hook.fn;
    }
    case 'test_fn_start': {
      return event.test.fn;
    }
    default: {
      return event.fn;
    }
  }
}

const JEST_RESET_LINE =
  "during setup, this cannot be null (and it's fine to explode if it is)";

function markJestReset({
  event,
}: TestEnvironmentCircusEvent<Circus.Event & { name: 'add_hook' }>) {
  if (
    event.name === 'add_hook' &&
    `${getFunction(event)}`.includes(JEST_RESET_LINE)
  ) {
    realm.runtimeContext.getCurrentMetadata().assign({
      sourceCode: '',
      title: 'Reset mocks, modules and timers (Jest)',
    });
  }
}

// eslint-disable-next-line no-empty-pattern
function executableStart(
  _event: TestEnvironmentCircusEvent<
    Circus.Event & { name: 'hook_start' | 'test_fn_start' }
  >,
) {
  realm.runtimeContext.getCurrentMetadata().assign({
    stage: 'running',
    start: Date.now(),
  });
}

function executableFailure({
  event: { error },
}: TestEnvironmentCircusEvent<
  Circus.Event & { name: 'test_fn_failure' | 'hook_failure' }
>) {
  realm.runtimeContext.getCurrentMetadata().assign({
    stage: 'interrupted',
    status: isJestAssertionError(error) ? 'failed' : 'broken',
    statusDetails: getStatusDetails(error),
    stop: Date.now(),
  });
}

function executableSuccess(
  _event: TestEnvironmentCircusEvent<
    Circus.Event & { name: 'test_fn_success' | 'hook_success' }
  >,
) {
  realm.runtimeContext.getCurrentMetadata().assign({
    stage: 'finished',
    stop: Date.now(),
  });
}

function testStart(
  _event: TestEnvironmentCircusEvent<Circus.Event & { name: 'test_start' }>,
) {
  realm.runtimeContext.getCurrentMetadata().assign({
    start: Date.now(),
  });
}

function testSkip(
  _event: TestEnvironmentCircusEvent<
    Circus.Event & { name: 'test_skip' | 'test_todo' }
  >,
) {
  realm.runtimeContext.getCurrentMetadata().assign({
    stop: Date.now(),
  });
}

function testDone({
  event,
}: TestEnvironmentCircusEvent<Circus.Event & { name: 'test_done' }>) {
  const current = realm.runtimeContext.getCurrentMetadata();

  if (event.test.errors.length > 0) {
    const hasFailedAssertions = event.test.errors.some((errors) => {
      return Array.isArray(errors)
        ? errors.some(isJestAssertionError)
        : isJestAssertionError(errors);
    });

    current.assign({
      status: hasFailedAssertions ? 'failed' : 'broken',
    });
  }

  realm.runtimeContext.getCurrentMetadata().assign({
    stop: Date.now(),
  });
}

export default listener;
