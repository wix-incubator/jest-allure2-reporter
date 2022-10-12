/** @type {import('@jest/types').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/test/**/*.test.{js,ts}'],
  globals: {
    'ts-jest': {
      tsconfig: '__tests__/tsconfig.json'
    }
  }
};
