import type { AllureTestItemSourceLocation } from 'jest-allure2-reporter';
import type { Circus } from '@jest/types';
import type {
  EnvironmentListenerFn,
  TestEnvironmentCircusEvent,
  TestEnvironmentSetupEvent,
} from 'jest-environment-emit';
import * as StackTrace from 'stacktrace-js';

import * as api from '../api';
import realm from '../realms';
import { autoIndent, getStatusDetails, isJestAssertionError, isLibraryPath } from '../utils';

const listener: EnvironmentListenerFn = (context) => {
  context.testEvents
    .on('test_environment_setup', injectGlobals)
    .on('test_environment_setup', setWorkerId)
    .on('add_hook', addHookType)
    .on('add_hook', addSourceLocation)
    .on('add_test', addSourceLocation)
    .on('run_start', flush)
    .on('hook_start', addSourceCode)
    .on('hook_start', executableStart)
    .on('hook_failure', executableFailure)
    .on('hook_failure', flush)
    .on('hook_success', executableSuccess)
    .on('hook_success', flush)
    .on('test_start', testStart)
    .on('test_todo', testSkip)
    .on('test_skip', testSkip)
    .on('test_done', testDone)
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
}: TestEnvironmentCircusEvent<Circus.Event & { name: 'add_hook' | 'add_test' }>) {
  const metadata = realm.runtimeContext.getCurrentMetadata();
  const task = StackTrace.fromError(event.asyncError).then((stackFrames) => {
    const first = stackFrames.find((s) => !isLibraryPath(s.fileName));
    if (!first) {
      return;
    }

    const sourceLocation: AllureTestItemSourceLocation = {
      fileName: first.fileName,
      lineNumber: first.lineNumber,
      columnNumber: first.columnNumber,
    };

    metadata.set('sourceLocation', sourceLocation);
  });

  realm.runtimeContext.enqueueTask(task);
}

function injectGlobals({ env }: TestEnvironmentSetupEvent) {
  env.global.__ALLURE__ = realm;

  const { injectGlobals } = realm.runtimeContext.getReporterConfig();
  if (injectGlobals) {
    Object.assign(env.global, api);
  }
}

function setWorkerId() {
  realm.runtimeContext.getFileMetadata().set('workerId', process.env.JEST_WORKER_ID);
}

function addHookType({ event }: TestEnvironmentCircusEvent<Circus.Event & { name: 'add_hook' }>) {
  const metadata = realm.runtimeContext.getCurrentMetadata();
  metadata.set('hookType', event.hookType);
}

function addSourceCode({ event }: TestEnvironmentCircusEvent) {
  let code = '';
  if (event.name === 'hook_start') {
    const { type, fn } = event.hook;
    code = `${type}(${fn});`;

    if (code.includes("during setup, this cannot be null (and it's fine to explode if it is)")) {
      code = '';
      realm.runtimeContext
        .getCurrentMetadata()
        .set('displayName', 'Reset mocks, modules and timers (Jest)');
    }
  }

  if (event.name === 'test_fn_start') {
    const { name, fn } = event.test;
    code = `test(${JSON.stringify(name)}, ${fn});`;
  }

  if (code) {
    realm.runtimeContext.getCurrentMetadata().set('transformedCode', autoIndent(code));
  }
}

// eslint-disable-next-line no-empty-pattern
function executableStart(
  _event: TestEnvironmentCircusEvent<Circus.Event & { name: 'hook_start' | 'test_fn_start' }>,
) {
  realm.runtimeContext.getCurrentMetadata().assign({
    stage: 'running',
    start: Date.now(),
  });
}

function executableFailure({
  event: { error },
}: TestEnvironmentCircusEvent<Circus.Event & { name: 'test_fn_failure' | 'hook_failure' }>) {
  realm.runtimeContext.getCurrentMetadata().assign({
    stage: 'interrupted',
    status: isJestAssertionError(error) ? 'failed' : 'broken',
    statusDetails: getStatusDetails(error),
    stop: Date.now(),
  });
}

function executableSuccess(
  _event: TestEnvironmentCircusEvent<Circus.Event & { name: 'test_fn_success' | 'hook_success' }>,
) {
  realm.runtimeContext.getCurrentMetadata().assign({
    stage: 'finished',
    stop: Date.now(),
  });
}

function testStart(_event: TestEnvironmentCircusEvent<Circus.Event & { name: 'test_start' }>) {
  realm.runtimeContext.getCurrentMetadata().assign({
    start: Date.now(),
  });
}

function testSkip(
  _event: TestEnvironmentCircusEvent<Circus.Event & { name: 'test_skip' | 'test_todo' }>,
) {
  realm.runtimeContext.getCurrentMetadata().assign({
    stop: Date.now(),
  });
}

function testDone({ event }: TestEnvironmentCircusEvent<Circus.Event & { name: 'test_done' }>) {
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
