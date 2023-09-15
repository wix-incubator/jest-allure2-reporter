const PRESET = process.env.ALLURE_PRESET ?? 'default';

/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  // eslint-disable-next-line node/no-unpublished-require,import/no-extraneous-dependencies
  ...require('@wix/jest-config-jest-allure2-reporter'),

  testEnvironment: 'jest-allure2-reporter/dist/environment/node',
  reporters: [
    'default',
    [
      'jest-allure2-reporter',
      /** @type {Partial<import('jest-allure2-reporter').ReporterOptions>} */ {
        resultsDir: `allure-results/${PRESET}`,
      },
    ],
  ],
};
