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

const JEST_RESET_LINE =
  "during setup, this cannot be null (and it's fine to explode if it is)";

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
    .on('add_hook', addSourceLocation)
    .on('add_hook', addSourceCode)
    .on('add_hook', addHookType)
    .on('add_test', addSourceLocation)
    .on('add_test', addSourceCode)
    .on('test_start', testStart)
    .on('test_todo', testSkip)
    .on('test_skip', testSkip)
    .on('test_done', testDone)
    .on('hook_start', addSourceCode)
    .on('hook_start', markJestReset)
    .on('hook_start', executableStart)
    .on('hook_failure', executableFailure)
    .on('hook_failure', flush)
    .on('hook_success', executableSuccess)
    .on('hook_success', flush)
    .on('test_fn_start', addSourceCode)
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

function addHookType({
  event,
}: TestEnvironmentCircusEvent<Circus.Event & { name: 'add_hook' }>) {
  const metadata = realm.runtimeContext.getCurrentMetadata();
  metadata.set('hookType', event.hookType);
}

function addSourceCode({
  event,
}: TestEnvironmentCircusEvent<
  Circus.Event & {
    name: 'hook_start' | 'test_fn_start' | 'add_test' | 'add_hook';
  }
>) {
  let code = '';
  switch (event.name) {
    case 'hook_start': {
      if (!isJestReset(event)) {
        const { type, fn } = event.hook;
        code = `${type}(${fn});`;
      }

      break;
    }
    case 'add_hook': {
      if (!isJestReset(event)) {
        const { hookType, fn } = event;
        code = `${hookType}(${fn});`;
      }

      break;
    }
    case 'test_fn_start': {
      const { name, fn } = event.test;
      code = `test(${JSON.stringify(name)}, ${fn});`;

      break;
    }
    case 'add_test': {
      const { testName, fn } = event;
      code = `test(${JSON.stringify(testName)}, ${fn});`;

      break;
    }
  }

  if (code) {
    realm.runtimeContext.getCurrentMetadata().set('sourceCode', code);
  }
}

function markJestReset({
  event,
}: TestEnvironmentCircusEvent<Circus.Event & { name: 'hook_start' }>) {
  if (isJestReset(event)) {
    realm.runtimeContext
      .getCurrentMetadata()
      .push('description', ['Reset mocks, modules and timers (Jest)']);
  }
}

function isJestReset(
  event: Circus.Event & { name: 'hook_start' | 'add_hook' },
) {
  return event.name === 'hook_start'
    ? event.hook.type === 'beforeEach' &&
        `${event.hook.fn}`.includes(JEST_RESET_LINE)
    : event.hookType === 'beforeEach' &&
        `${event.fn}`.includes(JEST_RESET_LINE);
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
