import type {
  Attachment,
  Category,
  ExecutorInfo,
  Label,
  Link,
  LinkType,
  Parameter,
  Status,
  StatusDetails,
  Stage,
} from '@noomorph/allure-js-commons';

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
  resultsDir: string;
  /**
   * Configures globally how test cases are reported: names, descriptions, labels, status, etc.
   */
  testCase: Partial<TestCaseCustomizer>;
  /**
   * Configures the environment information that will be reported.
   */
  environment: EnvironmentCustomizer;
  /**
   * Configures the executor information that will be reported.
   * By default, the executor information is inferred from `ci-info` package.
   * Local runs won't have any executor information unless you customize this.
   */
  executor: ExecutorCustomizer;
  /**
   * Configures the defect categories for the report.
   *
   * By default, the report will have the following categories:
   * `Product defects`, `Test defects` based on the test case status:
   * `failed` and `broken` respectively.
   */
  categories: CategoriesCustomizer;
};

/**
 * Global customizations for how test cases are reported
 */
interface TestCaseCustomizer extends TestStepCustomizer {
  /**
   * Test case ID extractor to fine-tune Allure's history feature.
   * @example ({ package, file, test }) => `${package.name}:${file.path}:${test.fullName}`
   * @example ({ test }) => `${test.identifier}:${test.title}`
   * @see https://wix-incubator.github.io/jest-allure2-reporter/docs/config/history/#test-case-id
   */
  id: TestCaseExtractor<string>;
  /**
   * Extractor for the full test case name.
   * @default ({ test }) => test.fullName
   */
  fullName: TestCaseExtractor<string>;
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
}

interface TestStepCustomizer {
  /**
   * Extractor for the default test or step name.
   * @default ({ test }) => test.title
   */
  name: TestStepExtractor<string>;
  /**
   * Extractor for the test case status.
   * @see https://wix-incubator.github.io/jest-allure2-reporter/docs/config/statuses/
   * @example ({ value }) => value === 'broken' ? 'failed' : value
   */
  status: TestStepExtractor<Status[keyof Status]>;
  /**
   * Extractor for the test case status details.
   */
  statusDetails: TestStepExtractor<StatusDetails>;
  /**
   * Extractor for the test case stage.
   */
  stage: TestStepExtractor<Stage[keyof Stage]>;
  /**
   * Extractor for the test case description in Markdown format.
   * @default ({ code }) => `\`\`\`js\n${code}\n\`\`\``
   */
  description: TestStepExtractor<string>;
  /**
   * Extractor for the test case description in HTML format.
   */
  descriptionHtml: TestStepExtractor<string>;
  /**
   * Customize step or test case attachments.
   */
  attachments: TestStepExtractor<Attachment[]>;
  /**
   * Customize step or test case parameters.
   */
  parameters: TestStepExtractor<Parameter[]>;
}

type EnvironmentCustomizer = GlobalExtractor<Record<string, string>>;

type ExecutorCustomizer = GlobalExtractor<ExecutorInfo>;

type CategoriesCustomizer = GlobalExtractor<Category[]>;

type LinksCustomizer =
  | TestCaseExtractor<Link[]>
  | Record<LinkType | string, LinkCustomizer>;

type LinkCustomizer = TestCaseExtractor<Link>;

type LabelsCustomizer =
  | TestCaseExtractor<Label[]>
  | Partial<{
      readonly allureId: TestCaseExtractor<string>;
      readonly package: TestCaseExtractor<string>;
      readonly testClass: TestCaseExtractor<string>;
      readonly testMethod: TestCaseExtractor<string>;
      readonly parentSuite: TestCaseExtractor<string>;
      readonly suite: TestCaseExtractor<string>;
      readonly subSuite: TestCaseExtractor<string>;
      readonly epic: TestCaseExtractor<string[]>;
      readonly feature: TestCaseExtractor<string[]>;
      readonly story: TestCaseExtractor<string[]>;
      readonly framework: TestCaseExtractor<string>;
      readonly language: TestCaseExtractor<string>;
      readonly layer: TestCaseExtractor<string>;
      readonly thread: TestCaseExtractor<string>;
      readonly host: TestCaseExtractor<string>;
      readonly severity: TestCaseExtractor<string>;
      readonly tag: TestCaseExtractor<string[]>;
      readonly owner: TestCaseExtractor<string>;
      readonly lead: TestCaseExtractor<string>;

      readonly [key: string]: TestCaseExtractor<any>;
    }>;

type GlobalExtractor<T> = (
  globalContext: Readonly<GlobalExtractorContext<T>>,
) => T | undefined;

type TestCaseExtractor<T> = (
  testCaseContext: Readonly<TestCaseExtractorContext<T>>,
) => T | undefined;

type TestStepExtractor<T> = (
  testStepContext: Readonly<TestStepExtractorContext<T>>,
) => T | undefined;

interface GlobalExtractorContext<T> {
  cwd: string;
  package: PackageHelper | undefined;
  value: T | undefined;
}

interface TestCaseExtractorContext<T> extends GlobalExtractorContext<T> {
  readonly file: FileContext;
  /**
   * When absent, it means an error was thrown before the test was defined.
   */
  readonly test: TestCaseContext | undefined;
  /**
   * Unhandled errors thrown outside test functions.
   */
  readonly errors: readonly Error[];
}

interface TestStepExtractorContext<T> extends TestCaseExtractorContext<T> {
  readonly step?: TestStepContext;
}

interface FileContext {
  readonly contents: string;
  readonly path: PathHelper;
  readonly pathPosix: PathHelper;
}

interface PathHelper {
  readonly directory: string;
  readonly name: string;
  readonly extension: string;

  toString(): string;
}

interface PackageHelper {
  readonly name: string;
  readonly version: string;

  readonly [key: string]: unknown;
}

interface TestCaseContext {
  readonly ancestorTitles: readonly string[];
  readonly duration?: number | null;
  readonly failureDetails: readonly unknown[];
  readonly failureMessages: readonly string[];
  readonly fullName: string;
  readonly invocations?: number;
  readonly location?: Readonly<{ column: number; line: number }> | null;
  readonly numPassingAsserts: number;
  readonly retryReasons?: readonly string[];
  readonly status: Jest$Status;
  readonly title: string;

  /**
   * Custom test case metadata.
   * Available only when `jest-circus` is used with `testEnvironment` using `jest-allure2-reporter/environment-*` packages.
   */
  readonly metadata?: TestCaseMetadata;
}

interface TestStepContext {
  readonly path: readonly string[];
  readonly metadata: TestStepMetadata;
}

type Jest$Status =
  | 'passed'
  | 'failed'
  | 'skipped'
  | 'pending'
  | 'todo'
  | 'disabled'
  | 'focused';

interface TestCaseMetadata extends TestStepMetadata {
  readonly name?: never;
  readonly identifier: string;
  readonly labels?: readonly Label[];
  readonly links?: readonly Link[];
}

interface TestStepMetadata {
  readonly name?: string;
  readonly code?: string;
  readonly description?: readonly string[];
  readonly descriptionHtml?: readonly string[];
  readonly steps?: readonly TestStepMetadata[];
  readonly attachments?: readonly Attachment[];
  readonly parameters?: readonly Parameter[];
  readonly start?: number;
  readonly stop?: number;
}