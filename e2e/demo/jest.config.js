/** @type {import('jest').Config} */
module.exports = {
  ...require('../jest.config'),
  rootDir: '.',
  setupFilesAfterEnv: ['<rootDir>/setup.ts'],
  testMatch: ['<rootDir>/**/*.test.ts'],
  transform: {},
};

/** @type {import('jest-allure2-reporter').ReporterOptions} */
const jestAllure2ReporterOptions = module.exports.reporters[1][1];
jestAllure2ReporterOptions.testRun.ignored = true;
jestAllure2ReporterOptions.testFile.ignored = true;
