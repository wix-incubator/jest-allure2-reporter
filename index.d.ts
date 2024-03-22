/* eslint-disable @typescript-eslint/no-empty-interface */

import type {AggregatedResult, Config, TestCaseResult, TestResult} from '@jest/reporters';
import JestMetadataReporter from 'jest-metadata/reporter';

declare module 'jest-allure2-reporter' {
  // region Config

  export interface ReporterOptions extends ReporterOptionsAugmentation {
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
     * Inject Allure's global variables into the test environment.
     * Those who don't want to pollute the global scope can disable this option
     * and import the `jest-allure2-reporter/api` module in their test files.
     *
     * @default true
     */
    injectGlobals?: boolean;
    /**
     * Configures how external attachments are attached to the report.
     */
    attachments?: AttachmentsOptions;
    /**
     * Configures the defect categories for the report.
     *
     * By default, the report will have the following categories:
     * `Product defects`, `Test defects` based on the test case status:
     * `failed` and `broken` respectively.
     */
    categories?: Category[] | CategoriesCustomizer;
    /**
     * Configures the environment information that will be reported.
     */
    environment?: Record<string, string> | EnvironmentCustomizer;
    /**
     * Configures the executor information that will be reported.
     */
    executor?: ExecutorInfo | ExecutorCustomizer;
    /**
     * Customize extractor helpers object to use later in the customizers.
     */
    helpers?: Partial<ExtractorHelpersCustomizer>;
    /**
     * Customize how to report test runs (sessions) as pseudo-test cases.
     * This is normally used to report broken global setup and teardown hooks,
     * and to provide additional information about the test run.
     */
    testRun?: Partial<TestRunCustomizer>;
    /**
     * Customize how to report test files as pseudo-test cases.
     * This is normally used to report broken test files, so that you can be aware of them,
     * but advanced users may find other use cases.
     */
    testFile?: Partial<TestFileCustomizer>;
    /**
     * Customize how test cases are reported: names, descriptions, labels, status, etc.
     */
    testCase?: Partial<TestCaseCustomizer>;
    /**
     * Customize how individual test steps are reported.
     */
    testStep?: Partial<TestStepCustomizer>;
  }

  export interface ReporterConfig extends ReporterConfigAugmentation {
    overwrite: boolean;
    resultsDir: string;
    injectGlobals: boolean;
    attachments: Required<AttachmentsOptions>;
    categories: CategoriesCustomizer;
    environment: EnvironmentCustomizer;
    executor: ExecutorCustomizer;
    helpers: TestRunExtractor<ExtractorHelpers>;
    testRun: Required<TestRunCustomizer> & {
      labels: TestRunExtractor<Label[]>;
      links: TestRunExtractor<Link[]>;
    };
    testFile: Required<TestFileCustomizer> & {
      labels: TestFileExtractor<Label[]>;
      links: TestFileExtractor<Link[]>;
    };
    testCase: Required<TestCaseCustomizer> & {
      labels: TestCaseExtractor<Label[]>;
      links: TestCaseExtractor<Link[]>;
    };
    testStep: Required<TestStepCustomizer>;
  }

  export interface AttachmentsOptions {
    /**
     * Defines a subdirectory within the {@link ReporterOptions#resultsDir} where attachments will be stored.
     * Use absolute path if you want to store attachments outside the {@link ReporterOptions#resultsDir} directory.
     * @default 'attachments'
     */
    subDir?: string;
    /**
     * Specifies default strategy for attaching files to the report by their path.
     * - `copy` - copy the file to {@link AttachmentsOptions#subDir}
     * - `move` - move the file to {@link AttachmentsOptions#subDir}
     * - `ref` - use the file path as is
     * @default 'ref'
     * @see {@link AllureRuntime#createFileAttachment}
     */
    fileHandler?: BuiltinFileAttachmentHandler | string;
    /**
     * Specifies default strategy for attaching dynamic content to the report.
     * Uses simple file writing by default.
     * @default 'write'
     * @see {@link AllureRuntime#createContentAttachment}
     */
    contentHandler?: BuiltinContentAttachmentHandler | string;
  }

  /** @see {@link AttachmentsOptions#fileHandler} */
  export type BuiltinFileAttachmentHandler = 'copy' | 'move' | 'ref';

  /** @see {@link AttachmentsOptions#contentHandler} */
  export type BuiltinContentAttachmentHandler = 'write';

  // endregion

  // region Allure Test Data

  export interface AllureTestCaseResult {
    hidden: boolean;
    historyId: string;
    name: string;
    fullName: string;
    start: number;
    stop: number;
    description: string;
    descriptionHtml: string;
    stage: Stage;
    status: Status;
    statusDetails: StatusDetails;
    labels: Label[];
    links: Link[];
    attachments: Attachment[];
    parameters: Parameter[];
  }

  export interface AllureTestStepResult {
    name: string;
    start: number;
    stop: number;
    stage: Stage;
    status: Status;
    statusDetails: StatusDetails;
    steps: AllureTestStepResult[];
    attachments: Attachment[];
    parameters: Parameter[];
  }

  // endregion

  // region Customizers

  /**
   * Global customizations for how test cases are reported
   */
  export interface TestCaseCustomizer {
    /**
     * Extractor to omit test file cases from the report.
     */
    hidden: TestCaseExtractor<boolean>;
    /**
     * Extractor to augment the test case context and the $ helper object.
     */
    $: TestFileExtractor<ExtractorHelpers>;
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
     * Extractor for the test case start timestamp.
     */
    start: TestCaseExtractor<number>;
    /**
     * Extractor for the test case stop timestamp.
     */
    stop: TestCaseExtractor<number>;
    /**
     * Extractor for the test case description.
     * @example ({ testCaseMetadata }) => '```js\n' + testCaseMetadata.sourceCode + '\n```'
     */
    description: TestCaseExtractor<string>;
    /**
     * Extractor for the test case description in HTML format.
     * @example ({ testCaseMetadata }) => '<pre><code>' + testCaseMetadata.sourceCode + '</code></pre>'
     */
    descriptionHtml: TestCaseExtractor<string>;
    /**
     * Extractor for the test case stage.
     */
    stage: TestCaseExtractor<Stage>;
    /**
     * Extractor for the test case status.
     * @see https://wix-incubator.github.io/jest-allure2-reporter/docs/config/statuses/
     * @example ({ value }) => value === 'broken' ? 'failed' : value
     */
    status: TestCaseExtractor<Status>;
    /**
     * Extractor for the test case status details.
     */
    statusDetails: TestCaseExtractor<StatusDetails>;
    /**
     * Customize Allure labels for the test case.
     *
     * @example
     * {
     *   suite: ({ file }) => file.path,
     *   subSuite: ({ test }) => test.ancestorTitles[0],
     * }
     */
    labels:
      | TestCaseExtractor<Label[]>
      | Record<
          LabelName | string,
          string | string[] | TestCaseExtractor<string[], string | string[]>
        >;
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
    links:
      | TestCaseExtractor<Link[]>
      | Record<LinkType | string, TestCaseExtractor<Link>>;
    /**
     * Customize step or test case attachments.
     */
    attachments: TestCaseExtractor<Attachment[]>;
    /**
     * Customize step or test case parameters.
     */
    parameters: TestCaseExtractor<Parameter[]>;
  }

  /**
   * Global customizations for how test steps are reported, e.g.
   * beforeAll, beforeEach, afterEach, afterAll hooks and custom steps.
   */
  export interface TestStepCustomizer {
    /**
     * Extractor to omit test steps from the report.
     */
    hidden: TestStepExtractor<boolean>;
    /**
     * Extractor to augment the test step context and the $ helper object.
     */
    $: TestFileExtractor<ExtractorHelpers>;
    /**
     * Extractor for the step name.
     * @example ({ value }) => value.replace(/(before|after)(Each|All)/, (_, p1, p2) => p1 + ' ' + p2.toLowerCase())
     */
    name: TestStepExtractor<string>;
    /**
     * Extractor for the test step start timestamp.
     */
    start: TestStepExtractor<number>;
    /**
     * Extractor for the test step stop timestamp.
     */
    stop: TestStepExtractor<number>;
    /**
     * Extractor for the test step stage.
     * @see https://wix-incubator.github.io/jest-allure2-reporter/docs/config/statuses/
     * TODO: add example
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

  /**
   * Global customizations for how test files are reported (as pseudo-test cases).
   */
  export interface TestFileCustomizer {
    /**
     * Extractor to omit test file cases from the report.
     */
    hidden: TestFileExtractor<boolean>;
    /**
     * Extractor to augment the test file context and the $ helper object.
     */
    $: TestFileExtractor<ExtractorHelpers>;
    /**
     * Test file ID extractor to fine-tune Allure's history feature.
     * @default ({ filePath }) => filePath.join('/')
     * @example ({ package, filePath }) => `${package.name}:${filePath.join('/')}`
     * @see https://wix-incubator.github.io/jest-allure2-reporter/docs/config/history/#test-case-id
     */
    historyId: TestFileExtractor<string>;
    /**
     * Extractor for test file name
     * @default ({ filePath }) => filePath.at(-1)
     */
    name: TestFileExtractor<string>;
    /**
     * Extractor for the full test file name
     * @default ({ testFile }) => testFile.testFilePath
     */
    fullName: TestFileExtractor<string>;
    /**
     * Extractor for the test file start timestamp.
     */
    start: TestFileExtractor<number>;
    /**
     * Extractor for the test file stop timestamp.
     */
    stop: TestFileExtractor<number>;
    /**
     * Extractor for the test file description.
     */
    description: TestFileExtractor<string>;
    /**
     * Extractor for the test file description in HTML format.
     */
    descriptionHtml: TestFileExtractor<string>;
    /**
     * Extractor for the test file stage.
     */
    stage: TestFileExtractor<Stage>;
    /**
     * Extractor for the test file status.
     * @see https://wix-incubator.github.io/jest-allure2-reporter/docs/config/statuses/
     * @example ({ value }) => value === 'broken' ? 'failed' : value
     */
    status: TestFileExtractor<Status>;
    /**
     * Extractor for the test file status details.
     */
    statusDetails: TestFileExtractor<StatusDetails>;
    /**
     * Customize Allure labels for the test file.
     *
     * @example
     * {
     *   suite: ({ file }) => file.path,
     *   subSuite: ({ test }) => test.ancestorTitles[0],
     * }
     */
    labels:
      | TestFileExtractor<Label[]>
      | Record<
          LabelName | string,
          string | string[] | TestFileExtractor<string[], string | string[]>
        >;
    /**
     * Resolve issue links for the test file.
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
    links:
      | TestFileExtractor<Link[]>
      | Record<LinkType | string, TestFileExtractor<Link>>;
    /**
     * Customize test file attachments.
     */
    attachments: TestFileExtractor<Attachment[]>;
    /**
     * Customize test case parameters.
     */
    parameters: TestFileExtractor<Parameter[]>;
  }

  /**
   * Global customizations for how test runs (sessions) are reported (as pseudo-test cases).
   */
  export interface TestRunCustomizer {
    /**
     * Extractor to omit pseudo-test cases for test runs from the report.
     */
    hidden: TestRunExtractor<boolean>;
    /**
     * Extractor to augment the test run context and the $ helper object.
     */
    $: TestRunExtractor<ExtractorHelpers>;
    /**
     * Test run ID extractor to fine-tune Allure's history feature.
     * @default () => process.argv.slice(2).join(' ')
     */
    historyId: TestRunExtractor<string>;
    /**
     * Extractor for test run name
     * @default () => '(test run)'
     */
    name: TestRunExtractor<string>;
    /**
     * Extractor for the full test run name
     * @default () => process.argv.slice(2).join(' ')
     */
    fullName: TestRunExtractor<string>;
    /**
     * Extractor for the test run start timestamp.
     */
    start: TestRunExtractor<number>;
    /**
     * Extractor for the test run stop timestamp.
     */
    stop: TestRunExtractor<number>;
    /**
     * Extractor for the test run description.
     * Use this to provide additional information about the test run,
     * which is not covered by the default Allure reporter capabilities.
     */
    description: TestRunExtractor<string>;
    /**
     * Extractor for the test run description in HTML format.
     * @see {@link TestRunCustomizer#description}
     */
    descriptionHtml: TestRunExtractor<string>;
    /**
     * Extractor for the test run stage.
     * 'interrupted' is used for failures with `--bail` enabled.
     * Otherwise, 'finished' is used.
     */
    stage: TestRunExtractor<Stage>;
    /**
     * Extractor for the test run status.
     * Either 'passed' or 'failed'.
     */
    status: TestRunExtractor<Status>;
    /**
     * Extractor for the test file status details.
     */
    statusDetails: TestRunExtractor<StatusDetails>;
    /**
     * Customize Allure labels for the pseudo-test case representing the test run.
     */
    labels:
      | TestRunExtractor<Label[]>
      | Record<
      LabelName | string,
      string | string[] | TestRunExtractor<string[], string | string[]>
    >;
    /**
     * Customize Allure links for the pseudo-test case representing the test run.
     */
    links:
      | TestRunExtractor<Link[]>
      | Record<LinkType | string, TestRunExtractor<Link>>;
    /**
     * Customize test run attachments.
     */
    attachments: TestRunExtractor<Attachment[]>;
    /**
     * Customize test run parameters.
     */
    parameters: TestRunExtractor<Parameter[]>;
  }

  /**
   * Override or add more helper functions to the default extractor helpers.
   */
  export interface ExtractorHelpersCustomizer {
    [key: keyof ExtractorHelpers]: ExtractorHelperExtractor<ExtractorHelpers[keyof ExtractorHelpers]>;
  }

  export type EnvironmentCustomizer = TestRunExtractor<Record<string, string>>;

  export type ExecutorCustomizer = TestRunExtractor<ExecutorInfo>;

  export type CategoriesCustomizer = TestRunExtractor<Category[]>;

  export type Extractor<
    T = unknown,
    C extends ExtractorContext<T> = ExtractorContext<T>,
    R = T,
  > = (context: Readonly<C>) => R | undefined | Promise<R | undefined>;

  export type ExtractorHelperExtractor<K extends keyof ExtractorHelpers> = Extractor<
    ExtractorHelpers[K],
    ExtractorHelpers,
    ExtractorHelpers[K]
  >;

  export type TestRunExtractor<T, R = T> = Extractor<
    T,
    TestRunExtractorContext<T>,
    R
  >;

  export type TestFileExtractor<T, R = T> = Extractor<
    T,
    TestFileExtractorContext<T>,
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
    readonly value: T | undefined | Promise<T | undefined>;
  }

  export interface GlobalExtractorContext<T = any>
    extends ExtractorContext<T>,
      GlobalExtractorContextAugmentation {
    $: ExtractorHelpers;
    globalConfig: Config.GlobalConfig;
    config: ReporterConfig;
  }

  export interface TestRunExtractorContext<T = any>
    extends GlobalExtractorContext<T>,
      TestRunExtractorContextAugmentation {
    aggregatedResult: AggregatedResult;
  }

  export interface TestFileExtractorContext<T = any>
    extends GlobalExtractorContext<T>,
      TestFileExtractorContextAugmentation {
    filePath: string[];
    testFile: TestResult;
    testFileMetadata: AllureTestFileMetadata;
  }

  export interface TestCaseExtractorContext<T = any>
    extends TestFileExtractorContext<T>,
      TestCaseExtractorContextAugmentation {
    testCase: TestCaseResult;
    testCaseMetadata: AllureTestCaseMetadata;
  }

  export interface TestStepExtractorContext<T = any>
    extends TestCaseExtractorContext<T>,
      TestStepExtractorContextAugmentation {
    testStepMetadata: AllureTestStepMetadata;
  }

  export interface ExtractorHelpers extends ExtractorHelpersAugmentation {
    /**
      * Extracts the source code of the current test case, test step or a test file.
      * Pass `true` as the second argument to extract source code recursively from all steps.
      *
      * @example
      * ({ $, testFileMetadata }) => $.extractSourceCode(testFileMetadata)
      * @example
      * ({ $, testCaseMetadata }) => $.extractSourceCode(testCaseMetadata, true)
      */
    extractSourceCode: ExtractorSourceCodeHelper;
    /**
     * Extracts the executor information from the current environment.
     * Pass `true` as the argument to include local executor information.
     * By default, supports GitHub Actions and Buildkite.
     *
     * @example
     * ({ $ }) => $.getExecutorInfo()
     * @example
     * ({ $ }) => $.getExecutorInfo(true)
     */
    getExecutorInfo: ExtractorExecutorInfoHelper;
    /**
     * Extracts the manifest of the current project or a specific package.
     * Pass a callback to extract specific data from the manifest – this way you can omit async/await.
     *
     * @example
     * ({ $ }) => $.manifest(m => m.version)
     * @example
     * ({ $ }) => $.manifest('jest', jest => jest.version)
     * @example
     * ({ $ }) => (await $.manifest()).version
     * @example
     * ({ $ }) => (await $.manifest('jest')).version
     */
    manifest: ExtractorManifestHelper;
    markdown2html(markdown: string): Promise<string>;
    sourceCode2Markdown(sourceCode: Partial<ExtractorHelperSourceCode> | undefined): string;
    stripAnsi: StripAnsiHelper;
  }

  export interface ExtractorSourceCodeHelper {
    (metadata: AllureTestItemMetadata): Promise<ExtractorHelperSourceCode | undefined>;
    (metadata: AllureTestItemMetadata, recursive: true): Promise<ExtractorHelperSourceCode[]>;
  }

  export interface ExtractorExecutorInfoHelper {
    (): Promise<ExecutorInfo | undefined>;
    (includeLocal: true): Promise<ExecutorInfo>;
  }

  export interface ExtractorManifestHelper {
    (): Promise<Record<string, any> | undefined>;
    (packageName: string): Promise<Record<string, any> | undefined>;
    <T>(callback: ExtractorManifestHelperCallback<T>): Promise<T | undefined>;
    <T>(packageName: string, callback: ExtractorManifestHelperCallback<T>): Promise<T>;
  }

  export type ExtractorManifestHelperCallback<T> = (manifest: Record<string, any>) => T;

  export interface ExtractorHelperSourceCode {
    fileName: string;
    code: string;
    language: string;
  }

  export interface StripAnsiHelper {
    <R>(text: R): R;
  }

  // endregion

  // region Custom Metadata

  export interface AllureGlobalMetadata {
    config: Pick<ReporterConfig, 'resultsDir' | 'overwrite' | 'attachments' | 'injectGlobals'>;
  }

  export interface AllureTestItemMetadata {
    /**
     * File attachments to be added to the test case, test step or a test file.
     */
    attachments?: Attachment[];
    /**
     * Property path to the current step metadata object.
     * @see {steps}
     * @example ['steps', '0']
     */
    currentStep?: AllureTestStepPath;
    /**
     * Parsed docblock: comments and pragmas.
     */
    docblock?: AllureTestItemDocblock;
    /**
     * Title of the test case or test step.
     */
    displayName?: string;
    /**
     * Custom history ID to distinguish between tests and their retry attempts.
     */
    historyId?: string;
    /**
     * Key-value pairs to disambiguate test cases or to provide additional information.
     */
    parameters?: Parameter[];
    /**
     * Location (file, line, column) of the test case, test step or a hook.
     */
    sourceLocation?: AllureTestItemSourceLocation;
    /**
     * Indicates test item execution progress.
     */
    stage?: Stage;
    /**
     * Start timestamp in milliseconds.
     */
    start?: number;
    /**
     * Test result: failed, broken, passed, skipped or unknown.
     */
    status?: Status;
    /**
     * Extra information about the test result: message and stack trace.
     */
    statusDetails?: StatusDetails;
    /**
     * Recursive data structure to represent test steps for more granular reporting.
     */
    steps?: AllureNestedTestStepMetadata[];
    /**
     * Stop timestamp in milliseconds.
     */
    stop?: number;
    /**
     * Transformed code of the test case, test step or a hook.
     */
    transformedCode?: string;
  }

  export type AllureTestStepPath = string[];

  export type AllureNestedTestStepMetadata = Omit<AllureTestStepMetadata, 'currentStep'>;

  /** @inheritDoc */
  export interface AllureTestStepMetadata extends AllureTestItemMetadata {
    /**
     * Steps produced by Jest hooks will have this property set.
     * User-defined steps don't have this property.
     */
    hookType?: 'beforeAll' | 'beforeEach' | 'afterEach' | 'afterAll';
  }

  /** @inheritDoc */
  export interface AllureTestCaseMetadata extends AllureTestItemMetadata {
    /**
     * Markdown description of the test case or test file.
     */
    description?: string[];
    /**
     * Raw HTML description of the test case or test file.
     */
    descriptionHtml?: string[];
    fullName?: string;
    labels?: Label[];
    links?: Link[];
    workerId?: string;
  }

  /** @inheritDoc */
  export interface AllureTestFileMetadata extends AllureTestCaseMetadata {}

  export interface AllureTestItemSourceLocation {
    fileName?: string;
    lineNumber?: number;
    columnNumber?: number;
  }

  export interface AllureTestItemDocblock {
    comments?: string;
    pragmas?: Record<string, string | string[]>;
  }

  // endregion

  // region Extensibility

  export interface ReporterOptionsAugmentation {
    // Use to extend ReporterOptions
  }

  export interface ReporterConfigAugmentation {
    // Use to extend ReporterConfig
  }

  export interface ExtractorHelpersAugmentation {
    // Use to extend ExtractorHelpers
  }

  export interface GlobalExtractorContextAugmentation {
    // Use to extend GlobalExtractorContext
  }

  export interface TestRunExtractorContextAugmentation {
    // Use to extend TestRunExtractorContext
  }

  export interface TestFileExtractorContextAugmentation {
    // Use to extend TestFileExtractorContext
  }

  export interface TestCaseExtractorContextAugmentation {
    // Use to extend TestCaseExtractorContext
  }

  export interface TestStepExtractorContextAugmentation {
    // Use to extend TestStepExtractorContext
  }

  // endregion

  //region Allure Vendor types

  export interface Attachment {
    name: string;
    type: string;
    source: string;
  }

  export interface Category {
    name?: string;
    description?: string;
    descriptionHtml?: string;
    messageRegex?: string | RegExp;
    traceRegex?: string | RegExp;
    matchedStatuses?: Status[];
    flaky?: boolean;
  }

  export interface ExecutorInfo {
    name?: string;
    type?:
      | 'jenkins'
      | 'bamboo'
      | 'teamcity'
      | 'gitlab'
      | 'github'
      | 'circleci'
      | string;
    url?: string;
    buildOrder?: number;
    buildName?: string;
    buildUrl?: string;
    reportUrl?: string;
    reportName?: string;
  }

  export interface Label {
    name: LabelName | string;
    value: string;
  }

  export type LabelName =
    | 'epic'
    | 'feature'
    | 'owner'
    | 'package'
    | 'parentSuite'
    | 'severity'
    | 'story'
    | 'subSuite'
    | 'suite'
    | 'tag'
    | 'testClass'
    | 'testMethod'
    | 'thread';

  export interface Link {
    name?: string;
    url: string;
    type?: LinkType | string;
  }

  export type LinkType = 'issue' | 'tms';

  export interface Parameter {
    name: string;
    value: string;
    excluded?: boolean;
    mode?: 'hidden' | 'masked' | 'default';
  }

  export type Severity = 'blocker' | 'critical' | 'normal' | 'minor' | 'trivial';
  export type Stage = 'scheduled' | 'running' | 'finished' | 'pending' | 'interrupted';
  export type Status = 'failed' | 'broken' | 'passed' | 'skipped' | 'unknown';

  export interface StatusDetails {
    message?: string;
    trace?: string;
  }

  //endregion
}

export default class JestAllure2Reporter extends JestMetadataReporter {
  constructor(globalConfig: Config.GlobalConfig, options: ReporterOptions);
}
