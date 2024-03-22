/* eslint-disable @typescript-eslint/no-empty-interface */

import type {AggregatedResult, Config, TestCaseResult, TestResult} from '@jest/reporters';
import JestMetadataReporter from 'jest-metadata/reporter';

declare module 'jest-allure2-reporter' {
  // region Options

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
    categories?: TestRunPropertyCustomizer<Category[]>;
    /**
     * Configures the environment information that will be reported.
     */
    environment?: TestRunPropertyCustomizer<Record<string, Primitive>>;
    /**
     * Configures the executor information that will be reported.
     */
    executor?: TestRunPropertyCustomizer<ExecutorInfo, undefined>;
    /**
     * Customize extractor helpers object to use later in the customizers.
     */
    helpers?: HelpersCustomizer;
    /**
     * Customize how to report test runs (sessions) as pseudo-test cases.
     * This is normally used to report broken global setup and teardown hooks,
     * and to provide additional information about the test run.
     */
    testRun?: TestRunCustomizer;
    /**
     * Customize how to report test files as pseudo-test cases.
     * This is normally used to report broken test files, so that you can be aware of them,
     * but advanced users may find other use cases.
     */
    testFile?: TestFileCustomizer;
    /**
     * Customize how test cases are reported: names, descriptions, labels, status, etc.
     */
    testCase?: TestCaseCustomizer;
    /**
     * Customize how individual test steps are reported.
     */
    testStep?: TestStepCustomizer;
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

  // region Config

  export interface ReporterConfig extends ReporterConfigAugmentation {
    overwrite: boolean;
    resultsDir: string;
    injectGlobals: boolean;
    attachments: Required<AttachmentsOptions>;
    categories: CategoriesExtractor;
    environment: EnvironmentExtractor;
    executor: ExecutorExtractor;
    helpers: HelpersExtractor;
    testCase: TestCaseExtractor;
    testFile: TestFileExtractor;
    testRun: TestRunExtractor;
    testStep: TestStepExtractor;
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
    hidden?: TestCasePropertyCustomizer<boolean>;
    /**
     * Test case ID extractor to fine-tune Allure's history feature.
     * @example ({ package, file, test }) => `${package.name}:${file.path}:${test.fullName}`
     * @example ({ test }) => `${test.identifier}:${test.title}`
     * @see https://wix-incubator.github.io/jest-allure2-reporter/docs/config/history/#test-case-id
     */
    historyId?: TestCasePropertyCustomizer<Primitive>;
    /**
     * Extractor for the default test or step name.
     * @default ({ test }) => test.title
     */
    name?: TestCasePropertyCustomizer<string>;
    /**
     * Extractor for the full test case name.
     * @default ({ test }) => test.fullName
     */
    fullName?: TestCasePropertyCustomizer<string>;
    /**
     * Extractor for the test case start timestamp.
     */
    start?: TestCasePropertyCustomizer<number>;
    /**
     * Extractor for the test case stop timestamp.
     */
    stop?: TestCasePropertyCustomizer<number>;
    /**
     * Extractor for the test case description.
     * @example ({ testCaseMetadata }) => '```js\n' + testCaseMetadata.sourceCode + '\n```'
     */
    description?: TestCasePropertyCustomizer<string>;
    /**
     * Extractor for the test case description in HTML format.
     * @example ({ testCaseMetadata }) => '<pre><code>' + testCaseMetadata.sourceCode + '</code></pre>'
     */
    descriptionHtml?: TestCasePropertyCustomizer<string>;
    /**
     * Extractor for the test case stage.
     */
    stage?: TestCasePropertyCustomizer<Stage>;
    /**
     * Extractor for the test case status.
     * @see https://wix-incubator.github.io/jest-allure2-reporter/docs/config/statuses/
     * @example ({ value }) => value === 'broken' ? 'failed' : value
     */
    status?: TestCasePropertyCustomizer<Status>;
    /**
     * Extractor for the test case status details.
     */
    statusDetails?: TestCasePropertyCustomizer<StatusDetails>;
    /**
     * Customize Allure labels for the test case.
     *
     * @example
     * {
     *   suite: ({ file }) => file.path,
     *   subSuite: ({ test }) => test.ancestorTitles[0],
     * }
     */
    labels?: TestCaseLabelsCustomizer;
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
    links?: TestCaseLinksCustomizer;
    /**
     * Customize step or test case attachments.
     */
    attachments?: TestCaseAttachmentsCustomizer;
    /**
     * Customize step or test case parameters.
     */
    parameters?: TestCaseParametersCustomizer;
  }

  /**
   * Global customizations for how test steps are reported, e.g.
   * beforeAll, beforeEach, afterEach, afterAll hooks and custom steps.
   */
  export interface TestStepCustomizer {
    /**
     * Extractor to omit test steps from the report.
     */
    hidden?: TestStepPropertyCustomizer<boolean>;
    /**
     * Extractor for the step name.
     * @example ({ value }) => value.replace(/(before|after)(Each|All)/, (_, p1, p2) => p1 + ' ' + p2.toLowerCase())
     */
    name?: TestStepPropertyCustomizer<string>;
    /**
     * Extractor for the test step start timestamp.
     */
    start?: TestStepPropertyCustomizer<number>;
    /**
     * Extractor for the test step stop timestamp.
     */
    stop?: TestStepPropertyCustomizer<number>;
    /**
     * Extractor for the test step stage.
     * @see https://wix-incubator.github.io/jest-allure2-reporter/docs/config/statuses/
     * TODO: add example
     */
    stage?: TestStepPropertyCustomizer<Stage>;
    /**
     * Extractor for the test step status.
     * @see https://wix-incubator.github.io/jest-allure2-reporter/docs/config/statuses/
     * @example ({ value }) => value === 'broken' ? 'failed' : value
     */
    status?: TestStepPropertyCustomizer<Status>;
    /**
     * Extractor for the test step status details.
     */
    statusDetails?: TestStepPropertyCustomizer<StatusDetails>;
    /**
     * Customize step or test step attachments.
     */
    attachments?: TestStepAttachmentsCustomizer;
    /**
     * Customize step or test step parameters.
     */
    parameters?: TestStepParametersCustomizer;
  }

  /**
   * Global customizations for how test files are reported (as pseudo-test cases).
   */
  export interface TestFileCustomizer {
    /**
     * Extractor to omit test file cases from the report.
     */
    hidden?: TestFilePropertyCustomizer<boolean>;
    /**
     * Test file ID extractor to fine-tune Allure's history feature.
     * @default ({ filePath }) => filePath.join('/')
     * @example ({ package, filePath }) => `${package.name}:${filePath.join('/')}`
     * @see https://wix-incubator.github.io/jest-allure2-reporter/docs/config/history/#test-case-id
     */
    historyId?: TestFilePropertyCustomizer<string>;
    /**
     * Extractor for test file name
     * @default ({ filePath }) => filePath.at(-1)
     */
    name?: TestFilePropertyCustomizer<string>;
    /**
     * Extractor for the full test file name
     * @default ({ testFile }) => testFile.testFilePath
     */
    fullName?: TestFilePropertyCustomizer<string>;
    /**
     * Extractor for the test file start timestamp.
     */
    start?: TestFilePropertyCustomizer<number>;
    /**
     * Extractor for the test file stop timestamp.
     */
    stop?: TestFilePropertyCustomizer<number>;
    /**
     * Extractor for the test file description.
     */
    description?: TestFilePropertyCustomizer<string>;
    /**
     * Extractor for the test file description in HTML format.
     */
    descriptionHtml?: TestFilePropertyCustomizer<string>;
    /**
     * Extractor for the test file stage.
     */
    stage?: TestFilePropertyCustomizer<Stage>;
    /**
     * Extractor for the test file status.
     * @see https://wix-incubator.github.io/jest-allure2-reporter/docs/config/statuses/
     * @example ({ value }) => value === 'broken' ? 'failed' : value
     */
    status?: TestFilePropertyCustomizer<Status>;
    /**
     * Extractor for the test file status details.
     */
    statusDetails?: TestFilePropertyCustomizer<StatusDetails>;
    /**
     * Customize Allure labels for the test file.
     *
     * @example
     * {
     *   suite: ({ file }) => file.path,
     *   subSuite: ({ test }) => test.ancestorTitles[0],
     * }
     */
    labels?: TestFileLabelsCustomizer;
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
    links?: TestFileLinksCustomizer;
    /**
     * Customize test file attachments.
     */
    attachments?: TestFileAttachmentsCustomizer;
    /**
     * Customize test case parameters.
     */
    parameters?: TestFileParametersCustomizer;
  }

  /**
   * Global customizations for how test runs (sessions) are reported (as pseudo-test cases).
   */
  export interface TestRunCustomizer {
    /**
     * Extractor to omit pseudo-test cases for test runs from the report.
     */
    hidden?: TestRunPropertyCustomizer<boolean>;
    /**
     * Test run ID extractor to fine-tune Allure's history feature.
     * @default () => process.argv.slice(2).join(' ')
     */
    historyId?: TestRunPropertyCustomizer<string>;
    /**
     * Extractor for test run name
     * @default () => '(test run)'
     */
    name?: TestRunPropertyCustomizer<string>;
    /**
     * Extractor for the full test run name
     * @default () => process.argv.slice(2).join(' ')
     */
    fullName?: TestRunPropertyCustomizer<string>;
    /**
     * Extractor for the test run start timestamp.
     */
    start?: TestRunPropertyCustomizer<number>;
    /**
     * Extractor for the test run stop timestamp.
     */
    stop?: TestRunPropertyCustomizer<number>;
    /**
     * Extractor for the test run description.
     * Use this to provide additional information about the test run,
     * which is not covered by the default Allure reporter capabilities.
     */
    description?: TestRunPropertyCustomizer<string>;
    /**
     * Extractor for the test run description in HTML format.
     * @see {@link TestRunCustomizer#description}
     */
    descriptionHtml?: TestRunPropertyCustomizer<string>;
    /**
     * Extractor for the test run stage.
     * 'interrupted' is used for failures with `--bail` enabled.
     * Otherwise, 'finished' is used.
     */
    stage?: TestRunPropertyCustomizer<Stage>;
    /**
     * Extractor for the test run status.
     * Either 'passed' or 'failed'.
     */
    status?: TestRunPropertyCustomizer<Status>;
    /**
     * Extractor for the test file status details.
     */
    statusDetails?: TestRunPropertyCustomizer<StatusDetails>;
    /**
     * Customize Allure labels for the pseudo-test case representing the test run.
     */
    labels?: TestRunLabelsCustomizer;
    /**
     * Customize Allure links for the pseudo-test case representing the test run.
     */
    links?: TestRunLinksCustomizer;
    /**
     * Customize test run attachments.
     */
    attachments?: TestRunAttachmentsCustomizer;
    /**
     * Customize test run parameters.
     */
    parameters?: TestRunParametersCustomizer;
  }

  export type HelpersCustomizer = HelpersExtractor<Partial<Helpers>> | Partial<Helpers>;

  export type TestRunAttachmentsCustomizer = TestRunPropertyCustomizer<Attachment[]>;
  export type TestRunLabelsCustomizer =
    | TestRunPropertyCustomizer<Label[]>
    | Record<LabelName | string, TestRunPropertyCustomizer<string | string[]>>;
  export type TestRunLinksCustomizer =
    | TestRunPropertyCustomizer<Link[]>
    | Record<LinkType | string, TestRunPropertyCustomizer<Link>>;
  export type TestRunParametersCustomizer =
    | TestRunPropertyCustomizer<Parameter[]>
    | Record<string, Primitive | TestRunPropertyCustomizer<Omit<Parameter, 'name'>[]>>;

  export type TestFileAttachmentsCustomizer = TestFilePropertyCustomizer<Attachment[]>;
  export type TestFileLabelsCustomizer =
    | TestFilePropertyCustomizer<Label[]>
    | Record<LabelName | string, TestFilePropertyCustomizer<string | string[]>>;
  export type TestFileLinksCustomizer =
    | TestFilePropertyCustomizer<Link[]>
    | Record<LinkType | string, TestFilePropertyCustomizer<Link>>;
  export type TestFileParametersCustomizer =
    | TestFilePropertyCustomizer<Parameter[]>
    | Record<string, Primitive | TestFilePropertyCustomizer<Omit<Parameter, 'name'>[]>>;

  export type TestCaseAttachmentsCustomizer = TestCasePropertyCustomizer<Attachment[]>;
  export type TestCaseLabelsCustomizer =
    | TestCasePropertyCustomizer<Label[]>
    | Record<LabelName | string, TestCasePropertyCustomizer<string | string[]>>;
  export type TestCaseLinksCustomizer =
    | TestCasePropertyCustomizer<Link[]>
    | Record<LinkType | string, TestCasePropertyCustomizer<Link>>;
  export type TestCaseParametersCustomizer =
    | TestCasePropertyCustomizer<Parameter[]>
    | Record<string, Primitive | TestCasePropertyCustomizer<Omit<Parameter, 'name'>[]>>;

  export type TestStepAttachmentsCustomizer = TestStepPropertyCustomizer<Attachment[]>;
  export type TestStepParametersCustomizer =
    | TestStepPropertyCustomizer<Parameter[]>
    | Record<string, Primitive | TestStepPropertyCustomizer<Omit<Parameter, 'name'>[]>>;

  export type TestRunPropertyCustomizer<T, Ta = never> = T | Ta | TestRunPropertyExtractor<T, Ta>;

  export type TestFilePropertyCustomizer<T, Ta = never> = T | Ta | TestFilePropertyExtractor<T, Ta>;

  export type TestCasePropertyCustomizer<T, Ta = never> = T | Ta | TestCasePropertyExtractor<T, Ta>;

  export type TestStepPropertyCustomizer<T, Ta = never> = T | Ta | TestStepPropertyExtractor<T, Ta>;

  // endregion

  // region Extractors

  export type Extractor<
    T,
    Ta = never,
    C extends ExtractorContext<any> = ExtractorContext<T>,
  > = (context: Readonly<C>) => T | Ta | Promise<T | Ta>;

  export type GlobalExtractor<T, Ta = never> = Extractor<
    T,
    Ta,
    GlobalExtractorContext<T>
  >;

  export type TestRunPropertyExtractor<T, Ta = never> = Extractor<
    T,
    Ta,
    TestRunExtractorContext<T>
  >;

  export type TestFilePropertyExtractor<T, Ta = never> = Extractor<
    T,
    Ta,
    TestFileExtractorContext<T>
  >;

  export type TestCasePropertyExtractor<T, Ta = never> = Extractor<
    T,
    Ta,
    TestCaseExtractorContext<T>
  >;

  export type TestStepPropertyExtractor<T, Ta = never> = Extractor<
    T,
    Ta,
    TestStepExtractorContext<T>
  >;

  export type HelpersExtractor<Ta = never> = GlobalExtractor<Helpers, Ta>;

  export type EnvironmentExtractor = TestRunPropertyExtractor<Record<string, string>>;

  export type ExecutorExtractor = TestRunPropertyExtractor<ExecutorInfo>;

  export type CategoriesExtractor = TestRunPropertyExtractor<Category[]>;

  export type TestCaseExtractor = Extractor<
    AllureTestCaseResult,
    undefined,
    TestCaseExtractorContext<Partial<AllureTestCaseResult>>
  >;

  export type TestStepExtractor = Extractor<
    AllureTestStepResult,
    undefined,
    TestStepExtractorContext<Partial<AllureTestStepResult>>
  >;

  export type TestFileExtractor = Extractor<
    AllureTestCaseResult,
    undefined,
    TestFileExtractorContext<Partial<AllureTestCaseResult>>
  >;

  export type TestRunExtractor = Extractor<
    AllureTestCaseResult,
    undefined,
    TestRunExtractorContext<Partial<AllureTestCaseResult>>
  >;

  export interface ExtractorContext<T> {
    readonly value: T | Promise<T>;
  }

  export interface GlobalExtractorContext<T = any>
    extends ExtractorContext<T>,
      GlobalExtractorContextAugmentation {
    $: Helpers;
    globalConfig: Config.GlobalConfig;
    config: ReporterConfig;
  }

  export interface TestRunExtractorContext<T = any>
    extends GlobalExtractorContext<T>,
      TestRunExtractorContextAugmentation {
    aggregatedResult: AggregatedResult;
    result: Partial<AllureTestCaseResult>;
  }

  export interface TestFileExtractorContext<T = any>
    extends GlobalExtractorContext<T>,
      TestFileExtractorContextAugmentation {
    filePath: string[];
    result: Partial<AllureTestCaseResult>;
    testFile: TestResult;
    testFileMetadata: AllureTestFileMetadata;
  }

  export interface TestCaseExtractorContext<T = any>
    extends TestFileExtractorContext<T>,
      TestCaseExtractorContextAugmentation {
    result: Partial<AllureTestCaseResult>;
    testCase: TestCaseResult;
    testCaseMetadata: AllureTestCaseMetadata;
  }

  export interface TestStepExtractorContext<T = any>
    extends TestCaseExtractorContext<T>,
      TestStepExtractorContextAugmentation {
    result: Partial<AllureTestStepResult>;
    testStepMetadata: AllureTestStepMetadata;
  }

  export interface Helpers extends HelpersAugmentation {
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
    code: string;
    language: string;
    fileName: string;
    lineNumber: number;
    columnNumber: number;
  }

  export interface StripAnsiHelper {
    <R>(textOrObject: R): R;
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

  export interface HelpersAugmentation {
    // Use to extend Helpers
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

  // region Allure Test Data

  export interface AllureTestCaseResult {
    hidden: boolean;
    historyId: string;
    displayName: string;
    fullName: string;
    start: number;
    stop: number;
    description: string;
    descriptionHtml: string;
    stage: Stage;
    status: Status;
    statusDetails?: StatusDetails;
    steps?: AllureTestStepResult[];
    labels?: Label[];
    links?: Link[];
    attachments?: Attachment[];
    parameters?: Parameter[];
  }

  export interface AllureTestStepResult {
    hidden: boolean;
    hookType: AllureTestStepMetadata['hookType'];
    displayName: string;
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
    value: Primitive;
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

  export type Primitive = string | number | boolean | null | undefined;
}

export default class JestAllure2Reporter extends JestMetadataReporter {
  constructor(globalConfig: Config.GlobalConfig, options: ReporterOptions);
}
