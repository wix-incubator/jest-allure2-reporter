import type {
  ExtractorContext,
  ReporterConfig,
} from 'jest-allure2-reporter';

import { categories } from './categories';
import { helpers } from './helpers';
import { testRun } from './testRun';
import { testFile } from './testFile';
import { testCase } from './testCase';
import { testStep } from './testStep';

const identity = <T>(context: ExtractorContext<T>) => context.value;

export function defaultOptions(): ReporterConfig {
  return {
    overwrite: true,
    resultsDir: 'allure-results',
    injectGlobals: true,
    attachments: {
      subDir: 'attachments',
      contentHandler: 'write',
      fileHandler: 'ref',
    },
    helpers,
    testRun,
    testFile,
    testCase,
    testStep,
    categories,
    environment: identity,
    executor: ({ $ }) => $.getExecutorInfo(true),
  };
}
