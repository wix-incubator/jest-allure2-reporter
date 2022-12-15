export type JestAllure2ReporterOptions = {
  /**
   * @default <rootDir>/allure-results
   */
  resultsDir: string;
  /**
   * @default import('package.json').name
   */
  packageName: string;
};
