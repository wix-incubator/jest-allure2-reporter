/** @type {import('@jest/types').Config} */
module.exports = {
  ...require('./jest.config'),

  testMatch: ['<rootDir>/__fixtures__/tests/**/*.test.{js,ts}'],
  reporters: [
    'default',
    ['.', {
      getEnvironmentInfo: () => require('lodash').pick(process.env, ['SHELL', 'NODE']),
      resultsDir: '__fixtures__/allure-results'
    }]
  ],
};
