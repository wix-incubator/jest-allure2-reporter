import type {
  ExtractorContext,
  PluginContext,
  ReporterConfig,
} from 'jest-allure2-reporter';

import { categories } from './categories';
import { defaultPlugins } from './plugins';
import { testCase } from './testCase';
import { testFile } from './testFile';
import { testStep } from './testStep';
import { executor } from './executor';

const identity = <T>(context: ExtractorContext<T>) => context.value;

export function defaultOptions(context: PluginContext): ReporterConfig {
  return {
    overwrite: true,
    resultsDir: 'allure-results',
    injectGlobals: true,
    attachments: {
      subDir: 'attachments',
      fileHandler: 'ref',
    },
    testFile,
    testCase,
    testStep,
    categories,
    environment: identity,
    executor: executor(),
    plugins: defaultPlugins(context),
  };
}
