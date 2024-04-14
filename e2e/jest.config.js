// eslint-disable-next-line node/no-extraneous-require,@typescript-eslint/no-var-requires,import/no-extraneous-dependencies
const path = require('node:path');

const _ = require('lodash');
const ALLURE_PRESET = process.env.ALLURE_PRESET ?? 'default';

/** @type {import('jest-allure2-reporter').ReporterOptions} */
const jestAllure2ReporterOptions = {
  resultsDir: `allure-results/${ALLURE_PRESET}`,
  categories: [
    {
      name: 'Snapshot mismatches',
      matchedStatuses: ['failed'],
      messageRegex: /.*\btoMatch(?:[A-Za-z]+)?Snapshot\b.*/,
    },
    {
      name: 'Timeouts',
      matchedStatuses: ['broken'],
      messageRegex: /.*Exceeded timeout of.*/,
    },
  ],
  environment: async ({ $  }) => {
    return ({
      'version.node': process.version,
      'version.jest': await $.manifest('jest', 'version'),
      'package.name': await $.manifest('', 'name'),
      'package.version': await $.manifest('', 'version'),
    });
  },
  sourceCode: {
    plugins: {
      coffee: require('./coffee-plugin'),
    },
  },
  testRun: {
    ignored: false,
    labels: {
      thread: 'W',
    },
  },
  testFile: {
    ignored: false,
    labels: {
      thread: ({ value }) => `File ${value.at(-1) || '0'}`,
    },
  },
  testCase: {
    displayName: ({ testCase }) =>
      [...testCase.ancestorTitles, testCase.title].join(' » '),
    labels: {
      parentSuite: ({ filePath }) => filePath[0],
      suite: ({ filePath }) => filePath.slice(1, 2).join('/'),
      subSuite: ({ filePath }) => filePath.slice(2).join('/'),
      epic: ({ value }) => value ?? 'Uncategorized',
      story: ({ value }) => value ?? 'Untitled story',
      feature: async ({ value }) => (await value) ?? 'Untitled feature',
      package: ({ filePath }) => filePath.slice(0, -1).join('.'),
      testClass: ({ filePath }) => filePath.join('.').replace(/\.test\.[jt]s$/, ''),
      testMethod: ({ testCase }) => testCase.fullName,
      owner: ({ value }) => value ?? 'Unknown',
    },
    links: {
      issue: 'https://youtrack.jetbrains.com/issue/{{name}}',
    },
  },
};

/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  // eslint-disable-next-line node/no-unpublished-require,import/no-extraneous-dependencies
  moduleFileExtensions: ['js', 'ts', 'coffee'],
  preset: 'ts-jest',
  reporters: ['default', ['jest-allure2-reporter', jestAllure2ReporterOptions]],
  rootDir: './src/programmatic/grouping',
  transform: {
    '^.+\\.coffee$': path.join(__dirname, 'coffee-transformer.js'),
  },
  testEnvironment: 'jest-allure2-reporter/environment-node',
  testMatch: ['<rootDir>/**/*.test.ts', '<rootDir>/**/*.test.coffee'],

  ...require(`./presets/${ALLURE_PRESET}`),
};
