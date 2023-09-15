import type { TestCaseResult, TestResult } from '@jest/reporters';
import type {
  Attachment,
  Category,
  ExecutorInfo,
  Label,
  Link,
  LinkType,
  Parameter, Stage,
  Status,
  StatusDetails,
} from '@noomorph/allure-js-commons';
import type { Config } from '@jest/reporters';

import type {
  AllureTestCaseMetadata,
  AllureTestStepMetadata,
} from '../runtime';

/**
 * Configuration options for the `jest-allure2-reporter` package.
 * These options are used in your Jest config.
 *
 * @example
 * /** @type {import('@jest/types').Config.InitialOptions} *\/
 * module.exports = {
 *   // ...
 *   reporters: [
 *     'default',
 *     ['jest-allure2-reporter', {
 *       resultsDir: 'allure-results',
 *       testCase: {},
 *       environment: () => process.env,
 *       executor: ({ value }) => value ?? ({
 *         type: process.platform,
 *         name: require('os').hostname()
 *       }),
 *       categories: ({ value }) => [
 *         ...value,
 *         {
 *           name: 'Custom defect category',
 *           messageRegex: '.*Custom defect message.*',
 *         },
 *       ],
 *     }],
 *   ],
 * };
 */
export type ReporterOptions = {
  /**
   * Overwrite the results directory if it already exists.
   * @default true
   */
  overwrite?: boolean;
  /**
   * Specifies where to output test result files.
   * Please note that the results directory is not a ready-to-use Allure report.
   * You'll need to generate the report using the `allure` CLI.
   *
   * @default 'allure-results'
   */
  resultsDir?: string;
  /**
   * Configures globally how test cases are reported: names, descriptions, labels, status, etc.
   */
  testCase?: Partial<TestCaseCustomizer>;
  /**
   * Configures the environment information that will be reported.
   */
  environment?: EnvironmentCustomizer;
  /**
   * Configures the executor information that will be reported.
   * By default, the executor information is inferred from `ci-info` package.
   * Local runs won't have any executor information unless you customize this.
   */
  executor?: ExecutorCustomizer;
  /**
   * Configures the defect categories for the report.
   *
   * By default, the report will have the following categories:
   * `Product defects`, `Test defects` based on the test case status:
   * `failed` and `broken` respectively.
   */
  categories?: CategoriesCustomizer;
};

export type ReporterConfig = Required<ReporterOptions> & {
  testCase: ResolvedTestCaseCustomizer;
};

/**
 * Global customizations for how test cases are reported
 */
export interface TestCaseCustomizer {
  /**
   * Test case ID extractor to fine-tune Allure's history feature.
   * @example ({ package, file, test }) => `${package.name}:${file.path}:${test.fullName}`
   * @example ({ test }) => `${test.identifier}:${test.title}`
   * @see https://wix-incubator.github.io/jest-allure2-reporter/docs/config/history/#test-case-id
   */
  historyId: TestCaseExtractor<string>;
  /**
   * Extractor for the default test or step name.
   * @default ({ test }) => test.title
   */
  name: TestCaseExtractor<string>;
  /**
   * Extractor for the full test case name.
   * @default ({ test }) => test.fullName
   */
  fullName: TestCaseExtractor<string>;
  /**
   * Extractor for the test case description.
   * @example ({ testCaseMetadata }) => '```js\n' + testCaseMetadata.code + '\n```'
   */
  description: TestCaseExtractor<string>;
  /**
   * Extractor for the test case description in HTML format.
   * @example ({ testCaseMetadata }) => '<pre><code>' + testCaseMetadata.code + '</code></pre>'
   */
  descriptionHtml: TestCaseExtractor<string>;
  /**
   * Extractor for the test case status.
   * @see https://wix-incubator.github.io/jest-allure2-reporter/docs/config/statuses/
   * @example ({ value }) => value === 'broken' ? 'failed' : value
   */
  status: TestCaseExtractor<Status[keyof Status]>;
  /**
   * Extractor for the test case status details.
   */
  statusDetails: TestCaseExtractor<StatusDetails>;
  /**
   * Customize step details for the test case.
   */
  steps: Partial<TestStepCustomizer>;
  /**
   * Customize Allure labels for the test case.
   *
   * @example
   * {
   *   suite: ({ file }) => file.path,
   *   subSuite: ({ test }) => test.ancestorTitles[0],
   * }
   */
  labels: LabelsCustomizer;
  /**
   * Resolve issue links for the test case.
   *
   * @example
   * {
   *   issue: ({ value }) => ({
   *     type: 'issue',
   *     name: value.name ?? `Open ${value.url} in JIRA`,
   *     url: `https://jira.company.com/${value.url}`,
   *   }),
   * }
   */
  links: LinksCustomizer;
  /**
   * Customize step or test case attachments.
   */
  attachments: TestCaseExtractor<Attachment[]>;
  /**
   * Customize step or test case parameters.
   */
  parameters: TestCaseExtractor<Parameter[]>;
}

export type ResolvedTestCaseCustomizer = Required<TestCaseCustomizer> & {
  steps: Required<TestStepCustomizer>;
  labels: TestCaseExtractor<Label[]>;
  links: TestCaseExtractor<Link[]>;
};

export interface TestStepCustomizer {
  /**
   * Extractor for the step name.
   * @example ({ testStep }) => ['beforeEach', 'afterEach'].includes(testStep.name) ? testStep.name.replace('Each', ' each') : testStep.name
   */
  name: TestStepExtractor<string>;
  /**
   * Extractor for the test step stage.
   * @see https://wix-incubator.github.io/jest-allure2-reporter/docs/config/statuses/
   * @example ({ value }) => value === 'broken' ? 'failed' : value
   */
  stage: TestStepExtractor<Stage>;
  /**
   * Extractor for the test step status.
   * @see https://wix-incubator.github.io/jest-allure2-reporter/docs/config/statuses/
   * @example ({ value }) => value === 'broken' ? 'failed' : value
   */
  status: TestStepExtractor<Status>;
  /**
   * Extractor for the test step status details.
   */
  statusDetails: TestStepExtractor<StatusDetails>;
  /**
   * Customize step or test step attachments.
   */
  attachments: TestStepExtractor<Attachment[]>;
  /**
   * Customize step or test step parameters.
   */
  parameters: TestStepExtractor<Parameter[]>;
}

export type EnvironmentCustomizer = GlobalExtractor<Record<string, string>>;

export type ExecutorCustomizer = GlobalExtractor<ExecutorInfo>;

export type CategoriesCustomizer = GlobalExtractor<Category[]>;

export type LinksCustomizer =
  | TestCaseExtractor<Link[]>
  | Record<LinkType | string, TestCaseExtractor<Link>>;

export type LabelsCustomizer =
  | TestCaseExtractor<Label[]>
  | Partial<{
      readonly package: LabelExtractor; // N/A
      readonly testClass: LabelExtractor; // N/A
      readonly testMethod: LabelExtractor; // N/A
      readonly parentSuite: LabelExtractor; // N/A
      readonly suite: LabelExtractor; // N/A
      readonly subSuite: LabelExtractor; // N/A
      readonly epic: LabelExtractor; // uniq | AggregatedResultMetadata → ... → TestEntryMetadata → (invocations)
      readonly feature: LabelExtractor; // uniq | AggregatedResultMetadata → ... → TestEntryMetadata → (invocations)
      readonly story: LabelExtractor; // uniq | AggregatedResultMetadata → ... → TestEntryMetadata → (invocations)
      readonly thread: LabelExtractor; // N/A
      readonly severity: LabelExtractor;
      readonly tag: LabelExtractor;
      readonly owner: LabelExtractor;

      readonly [key: string]: LabelExtractor;
    }>;

export type LabelExtractor = TestCaseExtractor<string[], string | string[]>;

export type Extractor<T, C extends ExtractorContext<T>, R = T> = (
  context: Readonly<C>,
) => R | undefined;

export type GlobalExtractor<T, R = T> = Extractor<
  T,
  GlobalExtractorContext<T>,
  R
>;

export type TestCaseExtractor<T, R = T> = Extractor<
  T,
  TestCaseExtractorContext<T>,
  R
>;

export type TestStepExtractor<T, R = T> = Extractor<
  T,
  TestStepExtractorContext<T>,
  R
>;

export interface ExtractorContext<T> {
  value: T | undefined;
}

export interface GlobalExtractorContext<T> extends ExtractorContext<T> {
  globalConfig: Config.GlobalConfig;
  config: ReporterConfig;
}

export interface TestCaseExtractorContext<T> extends GlobalExtractorContext<T> {
  testFile: TestResult;
  testCase: TestCaseResult;
  testCaseMetadata: AllureTestCaseMetadata;
}

export interface TestStepExtractorContext<T>
  extends TestCaseExtractorContext<T> {
  testStep: AllureTestStepContext;
}

// TODO: improve typings (less never patches, please)
export type AllureTestStepContext = AllureTestStepMetadata & {
  $pointer: readonly string[];
  steps: never;
};
