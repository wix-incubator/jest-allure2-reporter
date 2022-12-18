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
   * Whether the reporter should delete the results directory before running tests.
   *
   * @default true
   */
  overwriteResultsDir: boolean;

  /**
   * Add an extra label to each test case with the package name.
   * Helpful when running tests from multiple packages in a monorepo.
   *
   * @default import('package.json').name
   */
  packageName: string;
  /**
   * Getter function to extract environment information from the test environment.
   * By default, the environment information is extracted from the `process.env` object.
   * Use boolean `false` to disable environment information.
   *
   * @default true
   */
  getEnvironmentInfo: boolean | (() => Promise<Record<string, string>>);
  /**
   * Treat thrown errors as failed assertions.
   * By default, the reporter distinguishes between failed assertions and thrown errors.
   * The former are reported as FAILED tests, the latter as BROKEN tests.
   *
   * @default false
   */
  errorsAsFailedAssertions: boolean;
};
