module.exports = {
  ...require('@wix/jest-config-jest-allure2-reporter'),
  reporters: ['default', 'jest-allure2-reporter'],
  testEnvironment: 'jest-allure2-reporter/dist/environment-node',
};
