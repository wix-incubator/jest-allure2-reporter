// eslint-disable-next-line node/no-extraneous-require,@typescript-eslint/no-var-requires,import/no-extraneous-dependencies
const _ = require('lodash');
const PRESET = process.env.ALLURE_PRESET ?? 'default';

/** @type {import('jest-allure2-reporter').ReporterOptions} */
const jestAllure2ReporterOptions = {
  resultsDir: `allure-results/${PRESET}`,
  testCase: {
    name: ({ testCase }) =>
      [...testCase.ancestorTitles, testCase.title].join(' » '),
    labels: {
      parentSuite: ({ filePath }) => filePath[0],
      suite: ({ filePath }) => filePath.slice(1, 2).join('/'),
      subSuite: ({ filePath }) => filePath.slice(2).join('/'),
      epic: ({ value }) => value ?? 'Uncategorized',
      story: ({ value }) => value ?? 'Untitled story',
      feature: ({ value }) => value ?? 'Untitled feature',
      package: ({ filePath }) => filePath.slice(0, -1).join('.'),
      testClass: ({ filePath }) => filePath.join('.').replace(/\.test\.[jt]s$/, ''),
      testMethod: ({ testCase }) => testCase.fullName,
    },
  },
};

/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  // eslint-disable-next-line node/no-unpublished-require,import/no-extraneous-dependencies
  ...require('@wix/jest-config-jest-allure2-reporter'),
  rootDir: './src/programmatic/grouping',
  testEnvironment: 'jest-allure2-reporter/dist/environment/node',
  reporters: ['default', ['jest-allure2-reporter', jestAllure2ReporterOptions]],
};
