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

  testInfo: Partial<JestAllure2Reporter$TestInfoCustomizer>;

  /**
   * Getter function to extract environment information from the test environment.
   * By default, the environment information is extracted from the `process.env` object.
   * Use boolean `false` to disable environment information.
   *
   * @default true
   */
  environmentInfo: boolean | JestAllure2Reporter$EnvironmentInfoCustomizer;

  /**
   * Getter function to extract executor information from the test environment.
   * The executor is the build agent or any other system that initiates the test run.
   */
  executorInfo: JestAllure2Reporter$TestCaseExtractor<Allure$ExecutorInfo>;

  /**
   * Treat thrown errors as failed assertions.
   * By default, the reporter distinguishes between failed assertions and thrown errors.
   * The former are reported as FAILED tests, the latter as BROKEN tests.
   *
   * @default false
   */
  errorsAsFailedAssertions: boolean;
};

type JestAllure2Reporter$TestInfoCustomizer = {
  name: JestAllure2Reporter$StringCustomizer;
  fullName: JestAllure2Reporter$StringCustomizer;
  description: JestAllure2Reporter$StringCustomizer;
  descriptionHtml: JestAllure2Reporter$StringCustomizer;
  labels: Partial<JestAllure2Reporter$LabelsConfig>;
};

type JestAllure2Reporter$LabelCustomizer<T = string> =
  | JestAllure2Reporter$TestCaseExtractor<T>
  | T
  | undefined;

type JestAllure2Reporter$EnvironmentInfoCustomizer = (
  globalContext: Readonly<JestAllure2Reporter$GlobalContext>,
) => Allure$EnvironmentInfo | undefined;

type JestAllure2Reporter$GlobalContext = {
  cwd: string;
  env: NodeJS.ProcessEnv;
  packageName?: string;
};

type JestAllure2Reporter$StringCustomizer =
  | JestAllure2Reporter$TestCaseExtractor<string>
  | undefined;

type JestAllure2Reporter$TestCaseExtractor<T> = (
  testCaseContext: Readonly<JestAllure2Reporter$TestCaseContext>,
) => T | undefined;

type JestAllure2Reporter$LabelsConfig = {
  allureId: JestAllure2Reporter$LabelCustomizer;
  package: JestAllure2Reporter$LabelCustomizer;
  testClass: JestAllure2Reporter$LabelCustomizer;
  testMethod: JestAllure2Reporter$LabelCustomizer;
  parentSuite: JestAllure2Reporter$LabelCustomizer;
  suite: JestAllure2Reporter$LabelCustomizer;
  subSuite: JestAllure2Reporter$LabelCustomizer;
  epic: JestAllure2Reporter$LabelCustomizer;
  feature: JestAllure2Reporter$LabelCustomizer;
  story: JestAllure2Reporter$LabelCustomizer;
  framework: JestAllure2Reporter$LabelCustomizer;
  language: JestAllure2Reporter$LabelCustomizer;
  layer: JestAllure2Reporter$LabelCustomizer;
  thread: JestAllure2Reporter$LabelCustomizer;
  host: JestAllure2Reporter$LabelCustomizer;
  severity: JestAllure2Reporter$LabelCustomizer;
  tag: JestAllure2Reporter$LabelCustomizer<string | string[]>;
  owner: JestAllure2Reporter$LabelCustomizer;
  lead: JestAllure2Reporter$LabelCustomizer;
};

type JestAllure2Reporter$TestCaseContext = {
  cwd: string;
  env: NodeJS.ProcessEnv;
  packageName?: string;
  testIdentifier: string;
  testPath: string;
  fullName: string;
  title: string;
  ancestorTitles: string[];
  code?: {
    beforeAll?: string[];
    beforeEach?: string[];
    testFn?: string[];
    afterAll?: string[];
    afterEach?: string[];
  };
};

type Allure$EnvironmentInfo = Record<string, string>;

type Allure$ExecutorInfo = Partial<{
  name: string;
  type: string;
  url: string;
  buildOrder: number;
  buildName: string;
  buildUrl: string;
  reportUrl: string;
  reportName: string;
}>;
