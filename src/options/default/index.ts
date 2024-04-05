import type { ReporterConfig } from '../types';
import * as common from '../common';
import * as custom from '../custom';

import { categories } from './categories';
import { helpers } from './helpers';
import { testRun } from './testRun';
import { testFile } from './testFile';
import { testCase } from './testCase';
import { testStep } from './testStep';

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
    helpers: custom.helpers(helpers),
    testRun: custom.testCase(testRun),
    testFile: custom.testCase(testFile),
    testCase: custom.testCase(testCase),
    testStep: custom.testStep(testStep),
    categories: common.constant(categories),
    environment: () => ({}),
    executor: ({ $ }) => $.getExecutorInfo(true),
  };
}
