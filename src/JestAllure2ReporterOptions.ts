/**
 * Options to use with jest-allure2-reporter package in Jest config
 *
 * @public
 * @example
 * {
 *   // ...
 *   reporters: [
 *     'default',
 *     [
 *     'jest-allure2-reporter',
 *     {
 *       resultsDir: 'allure-results',
 *       packageName: 'my-package',
 *       errorsAsFailedAssertions: true,
 *     },
 * }
 */
export type JestAllure2ReporterOptions = {
  /**
   * Path to the directory where the report will be generated.
   *
   * @default <rootDir>/allure-results
   */
  resultsDir: string;
  /**
   * Add an extra label to each test case with the package name.
   * Helpful when running tests from multiple packages in a monorepo.
   *
   * @default import('package.json').name
   */
  packageName: string;
  /**
   * Treat thrown errors as failed assertions.
   * By default, the reporter distinguishes between failed assertions and thrown errors.
   * The former are reported as FAILED tests, the latter as BROKEN tests.
   *
   * @default false
   */
  errorsAsFailedAssertions: boolean;
};
