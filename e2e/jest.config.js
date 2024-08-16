// eslint-disable-next-line node/no-extraneous-require,@typescript-eslint/no-var-requires,import/no-extraneous-dependencies
const path = require('node:path');

const uuid = require('uuid');

/** @type {import('jest-allure2-reporter').ReporterOptions} */
const jestAllure2ReporterOptions = {
  extends: [
    require.resolve('./presets/code-snippets'),
    require.resolve('./presets/remark'),
  ],
  categories: [
    {
      name: 'Snapshot mismatches',
      matchedStatuses: ['failed'],
      messageRegex: /.*\btoMatch(?:[A-Za-z]+)?Snapshot\b.*/,
    },
    {
      name: 'Visual regressions',
      matchedStatuses: ['failed'],
      messageRegex: /.*\bscreenshot.*/,
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
      'version.jest': await $.manifest('jest', ['version']),
      'package.name': await $.manifest(m => m.name),
      'package.version': await $.manifest(['version']),
    });
  },
  sourceCode: {
    plugins: {
      coffee: require('./coffee-plugin'),
    },
  },
  testCase: {
    uuid: ({ filePath, testCase }) => uuid.v5(`${filePath.join('/')}:${testCase.fullName}`, '6ba7b810-9dad-11d1-80b4-00c04fd430c8'),
    historyId: ({ testCaseMetadata, filePath, testCase }) => {
      return testCaseMetadata.historyId ?? `${filePath.join('/')}:${testCase.fullName}`;
    },
    labels: {
      parentSuite: ({ value, filePath }) => value ?? filePath.join('/'),
      epic: 'Untitled epic',
      feature: 'Untitled feature',
      story: 'Untitled story',
    },
    links: {
      issue: 'https://issues.apache.org/jira/browse/{{name}}',
      tms: 'https://test.testrail.io/index.php?/cases/view/{{name}}',
    },
  },
  testRun: {
    ignored: false,
  },
  testFile: {
    ignored: false,
  },
  testStep: {
    ignored: ({ testStepMetadata }) => testStepMetadata.displayName?.includes('(Jest)'),
  },
};

/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  moduleFileExtensions: ['js', 'ts', 'coffee'],
  preset: 'ts-jest',
  reporters: ['default', ['jest-allure2-reporter', jestAllure2ReporterOptions]],
  transform: {
    '^.+\\.coffee$': path.join(__dirname, 'coffee-transformer.js'),
  },
  setupFilesAfterEnv: process.env.JEST_ENVIRONMENT ? ['<rootDir>/setup.js'] : [],
  testEnvironment: process.env.JEST_ENVIRONMENT ?? 'jest-allure2-reporter/environment-node',
  testMatch: ['<rootDir>/tests/**/*.js', '<rootDir>/tests/**/*.ts', '<rootDir>/tests/**/*.coffee'],
};
