/** @type {import('@jest/types').Config} */
module.exports = {
  ...require('./jest.config'),

  testMatch: ['<rootDir>/__fixtures__/tests/**/*.test.{js,ts}'],
  reporters: [
    'default',
    ['.', { packageName: 'jest-allure2-reporter', resultsDir: '__fixtures__/allure-results' }]
  ],
};
