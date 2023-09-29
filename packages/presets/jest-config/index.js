/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  "modulePathIgnorePatterns": [
    "<rootDir>/dist/",
    "<rootDir>/node_modules/"
  ],
  "preset": "ts-jest",
  "testEnvironment": "node",
  "testMatch": ["<rootDir>/**/*.test.ts"],
  "reporters": ["default"],
  "verbose": true
};
