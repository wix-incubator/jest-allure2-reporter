module.exports = {
  ...require('@wix/jest-config-jest-allure2-reporter'),
  reporters: [
    "jest-allure2-reporter"
  ],
  testEnvironment: "node"
};
