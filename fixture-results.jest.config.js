/** @type {import('@jest/types').Config} */
module.exports = {
  ...require('./jest.config'),

  testMatch: ['<rootDir>/__fixtures__/tests/**/*.test.{js,ts}'],
  reporters: ['<rootDir>/dist/scripts/dump-reporter.js'],
};
