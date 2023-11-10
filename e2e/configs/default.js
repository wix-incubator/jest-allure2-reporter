// eslint-disable-next-line node/no-extraneous-require,@typescript-eslint/no-var-requires,import/no-extraneous-dependencies
const _ = require('lodash');
const PRESET = process.env.ALLURE_PRESET ?? 'default';

/** @type {import('jest-allure2-reporter').ReporterOptions} */
const jestAllure2ReporterOptions = {
  resultsDir: `allure-results/${PRESET}`,
  environment: (context) => {
    return ({
      'version.node': process.version,
      'version.jest': require('jest/package.json').version,
      'package.name': context.manifest.name,
      'package.version': context.manifest.version,
    });
  },
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
      owner: ({ value }) => value ?? 'Unknown',
    },
  },
};

/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  // eslint-disable-next-line node/no-unpublished-require,import/no-extraneous-dependencies
  preset: 'ts-jest',
  reporters: ['default', ['jest-allure2-reporter', jestAllure2ReporterOptions]],
  rootDir: './src/programmatic/grouping',
  testEnvironment: 'jest-allure2-reporter/environment-node',
  testMatch: ['<rootDir>/**/*.test.ts'],
};
