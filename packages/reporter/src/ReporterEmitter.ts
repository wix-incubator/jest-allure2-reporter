import type { EventEmitter } from 'node:events';

import type {
  AggregatedResult,
  ReporterOnStartOptions,
  Test,
  TestCaseResult,
  TestContext,
  TestResult,
} from '@jest/reporters';

export type RunStartEvent = {
  aggregatedResult: AggregatedResult;
  options: ReporterOnStartOptions;
};

export type TestFileStartEvent = {
  test: Test;
};

export type TestCaseResultEvent = {
  test: Test;
  testCaseResult: TestCaseResult;
};

export type TestFileResultEvent = {
  test: Test;
  testResult: TestResult;
  aggregatedResult: AggregatedResult;
};

export type RunCompleteEvent = {
  testContexts: Set<TestContext>;
  aggregatedResult: AggregatedResult;
};

export type ReporterEmitter = EventEmitter & {
  emit(event: 'runStart', data: RunStartEvent): boolean;
  emit(event: 'testFileStart', data: TestFileStartEvent): boolean;
  emit(event: 'testCaseResult', data: TestCaseResultEvent): boolean;
  emit(event: 'testFileResult', data: TestFileResultEvent): boolean;
  emit(event: 'runComplete', data: RunCompleteEvent): boolean;

  on(
    event: 'runStart',
    listener: (event: RunStartEvent) => void,
  ): ReporterEmitter;
  on(
    event: 'testFileStart',
    listener: (event: TestFileStartEvent) => void,
  ): ReporterEmitter;
  on(
    event: 'testCaseResult',
    listener: (event: TestCaseResultEvent) => void,
  ): ReporterEmitter;
  on(
    event: 'testFileResult',
    listener: (event: TestFileResultEvent) => void,
  ): ReporterEmitter;
  on(
    event: 'runComplete',
    listener: (event: RunCompleteEvent) => void,
  ): ReporterEmitter;
};
