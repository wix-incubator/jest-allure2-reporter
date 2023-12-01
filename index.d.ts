/* eslint-disable @typescript-eslint/no-empty-interface */

import type { Config, TestCaseResult, TestResult } from '@jest/reporters';
import type {
  Attachment,
  Category,
  ExecutorInfo,
  Label,
  LabelName,
  Link,
  LinkType,
  Parameter,
  ParameterOptions,
  Severity,
  Stage,
  Status,
  StatusDetails,
} from '@noomorph/allure-js-commons';

import type { Function_, MaybePromise } from './utils/types';
import type { JestAllure2Reporter } from './src';

declare module 'jest-allure2-reporter' {
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
    /**
     * Plugins to extend the reporter functionality.
     * Via plugins, you can extend the context used by customizers.
     */
    plugins?: PluginDeclaration[];
  };

  export type ReporterConfig = {
    overwrite: boolean;
    resultsDir: string;
    attachments: Required<AttachmentsOptions>;
    categories: CategoriesCustomizer;
    environment: EnvironmentCustomizer;
    executor: ExecutorCustomizer;
    testFile: ResolvedTestFileCustomizer;
    testCase: ResolvedTestCaseCustomizer;
    testStep: ResolvedTestStepCustomizer;
    plugins: Promise<Plugin[]>;
  };

  export type SharedReporterConfig = Pick<
    ReporterConfig,
    'resultsDir' | 'overwrite' | 'attachments'
  >;

  export type _LabelName =
    | 'package'
    | 'testClass'
    | 'testMethod'
    | 'parentSuite'
    | 'suite'
    | 'subSuite'
    | 'epic'
    | 'feature'
    | 'story'
    | 'thread'
    | 'severity'
    | 'tag'
    | 'owner';

  export type AttachmentsOptions = {
    /**
     * Defines a subdirectory within the {@link ReporterOptions#resultsDir} where attachments will be stored.
     * @default 'attachments'
     */
    subDir?: string;
    /**
     * Specifies strategy for attaching files to the report by their path.
     * - `copy` - copy the file to {@link AttachmentsOptions#subDir}
     * - `move` - move the file to {@link AttachmentsOptions#subDir}
     * - `ref` - use the file path as is
     * @default 'ref'
     * @see {@link AllureRuntime#createFileAttachment}
     */
    fileHandler?: BuiltinFileHandler;
  };

  /** @see {@link AttachmentsOptions#fileHandler} */
  export type BuiltinFileHandler = 'copy' | 'move' | 'ref';

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
     * Extractor for the test case start timestamp.
     */
    start: TestCaseExtractor<number>;
    /**
     * Extractor for the test case stop timestamp.
     */
    stop: TestCaseExtractor<number>;
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
          _LabelName | string,
          TestCaseExtractor<string[], string | string[]>
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
   * Global customizations for how test files are reported (as pseudo-test cases).
   */
  export interface TestFileCustomizer {
    /**
     * Extractor to omit test cases from the report.
     */
    ignored: TestFileExtractor<boolean>;
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
          _LabelName | string,
          TestFileExtractor<string[], string | string[]>
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
   * Global customizations for how test cases are reported
   * @inheritDoc
   */
  export type TestCaseCustomizer = GenericTestCaseCustomizer<TestCaseExtractor>;

  export type ResolvedTestFileCustomizer = Required<TestFileCustomizer> & {
    labels: TestFileExtractor<Label[]>;
    links: TestFileExtractor<Link[]>;
  };

  export type ResolvedTestCaseCustomizer = Required<TestCaseCustomizer> & {
    labels: TestCaseExtractor<Label[]>;
    links: TestCaseExtractor<Link[]>;
  };

  export type ResolvedTestStepCustomizer = Required<TestStepCustomizer>;

  export interface TestStepCustomizer {
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

  export type EnvironmentCustomizer = GlobalExtractor<Record<string, string>>;

  export type ExecutorCustomizer = GlobalExtractor<ExecutorInfo>;

  export type CategoriesCustomizer = GlobalExtractor<Category[]>;

  export type Extractor<
    T = unknown,
    C extends ExtractorContext<T> = ExtractorContext<T>,
    R = T,
  > = (context: Readonly<C>) => R | undefined;

  export type GlobalExtractor<T, R = T> = Extractor<
    T,
    GlobalExtractorContext<T>,
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
    value: T | undefined;
  }

  export interface GlobalExtractorContext<T = unknown>
    extends ExtractorContext<T>,
      GlobalExtractorContextAugmentation {
    globalConfig: Config.GlobalConfig;
    config: ReporterConfig;
  }

  export interface TestFileExtractorContext<T = unknown>
    extends GlobalExtractorContext<T>,
      TestFileExtractorContextAugmentation {
    filePath: string[];
    testFile: TestResult;
    testFileMetadata: AllureTestCaseMetadata;
  }

  export interface TestCaseExtractorContext<T = unknown>
    extends TestFileExtractorContext<T>,
      TestCaseExtractorContextAugmentation {
    testCase: TestCaseResult;
    testCaseMetadata: AllureTestCaseMetadata;
  }

  export interface TestStepExtractorContext<T = unknown>
    extends TestCaseExtractorContext<T>,
      TestStepExtractorContextAugmentation {
    testStepMetadata: AllureTestStepMetadata;
  }

  export interface AllureTestStepMetadata {
    steps?: AllureTestStepMetadata[];
    hidden?: boolean;
    /**
     * Source code of the test case, test step or a hook.
     */
    code?: string[];

    name?: string;
    status?: Status;
    statusDetails?: StatusDetails;
    stage?: Stage;
    attachments?: Attachment[];
    parameters?: Parameter[];
    start?: number;
    stop?: number;
  }

  export interface AllureTestCaseMetadata extends AllureTestStepMetadata {
    /**
     * Pointer to the child step that is currently being added or executed.
     * @example ['steps', '0', 'steps', '0']
     * @internal
     */
    currentStep?: string[];
    /**
     * Jest worker ID.
     * @internal Used to generate unique thread names.
     * @see {import('@noomorph/allure-js-commons').LabelName.THREAD}
     */
    workerId?: string;
    /**
     * Only steps can have names.
     */
    name?: never;
    description?: string[];
    descriptionHtml?: string[];
    labels?: Label[];
    links?: Link[];
  }

  export interface AllureTestFileMetadata extends AllureTestCaseMetadata {
    currentStep?: never;
  }

  export interface GlobalExtractorContextAugmentation {
    detectLanguage?(filePath: string, contents: string): string | undefined;
    processMarkdown?(markdown: string): MaybePromise<string>;

    // This should be extended by plugins
  }

  export interface TestFileExtractorContextAugmentation {
    // This should be extended by plugins
  }

  export interface TestCaseExtractorContextAugmentation {
    // This should be extended by plugins
  }

  export interface TestStepExtractorContextAugmentation {
    // This should be extended by plugins
  }

  export type PluginDeclaration =
    | PluginReference
    | [PluginReference, Record<string, unknown>];

  export type PluginReference = string | PluginConstructor;

  export type PluginConstructor = (
    options: Record<string, unknown>,
    context: PluginContext,
  ) => Plugin;

  export type PluginContext = Readonly<{
    globalConfig: Config.GlobalConfig;
  }>;

  export interface Plugin {
    /** Also used to deduplicate plugins if they are declared multiple times. */
    readonly name: string;

    /** Optional method for deduplicating plugins. Return the instance which you want to keep. */
    extend?(previous: Plugin): Plugin;

    /** Method to extend global context. */
    globalContext?(context: GlobalExtractorContext): void | Promise<void>;

    /** Method to affect test file metadata before it is created. */
    beforeTestFileContext?(
      context: Omit<TestFileExtractorContext, 'testFileMetadata'>,
    ): void | Promise<void>;

    /** Method to extend test file context. */
    testFileContext?(context: TestFileExtractorContext): void | Promise<void>;

    /** Method to extend test entry context. */
    testCaseContext?(context: TestCaseExtractorContext): void | Promise<void>;

    /** Method to extend test step context. */
    testStepContext?(context: TestStepExtractorContext): void | Promise<void>;
  }

  export type PluginHookName =
    | 'globalContext'
    | 'beforeTestFileContext'
    | 'testFileContext'
    | 'testCaseContext'
    | 'testStepContext';

  export interface IAllureRuntime {
    flush(): Promise<void>;

    description(value: string): void;

    descriptionHtml(value: string): void;

    status(status: Status, statusDetails?: StatusDetails): void;

    statusDetails(statusDetails: StatusDetails): void;

    label(name: LabelName | string, value: string): void;

    link(name: string, url: string, type?: string): void;

    parameter(name: string, value: unknown, options?: ParameterOptions): void;

    parameters(parameters: Record<string, unknown>): void;

    attachment<T extends AttachmentContent>(
      name: string,
      content: MaybePromise<T>,
      mimeType?: string,
    ): typeof content;

    createAttachment<T extends AttachmentContent>(
      function_: Function_<MaybePromise<T>>,
      name: string,
    ): typeof function_;
    createAttachment<T extends AttachmentContent>(
      function_: Function_<MaybePromise<T>>,
      options: AttachmentOptions,
    ): typeof function_;

    fileAttachment(filePath: string, name?: string): string;
    fileAttachment(filePath: string, options?: AttachmentOptions): string;
    fileAttachment(
      filePathPromise: Promise<string>,
      name?: string,
    ): Promise<string>;
    fileAttachment(
      filePathPromise: Promise<string>,
      options?: AttachmentOptions,
    ): Promise<string>;

    createFileAttachment(
      function_: Function_<MaybePromise<string>>,
    ): typeof function_;
    createFileAttachment(
      function_: Function_<MaybePromise<string>>,
      name: string,
    ): typeof function_;
    createFileAttachment(
      function_: Function_<MaybePromise<string>>,
      options: AttachmentOptions,
    ): typeof function_;

    createStep<F extends Function>(name: string, function_: F): F;
    createStep<F extends Function>(
      name: string,
      arguments_: ParameterOrString[],
      function_: F,
    ): F;

    step<T>(name: string, function_: () => T): T;
  }

  export type ParameterOrString = string | Omit<Parameter, 'value'>;

  export type AttachmentContent = Buffer | string;

  export type AttachmentOptions = {
    name?: string;
    mimeType?: string;
  };

  // Reporter
  export const reporter: JestAllure2Reporter;
  export default reporter;

  // Runtime
  export const allure: IAllureRuntime;

  // Pseudo-annotations
  export const $Description: (description: string) => void;
  export const $DescriptionHtml: (descriptionHtml: string) => void;
  export const $Epic: (epic: string) => void;
  export const $Feature: (feature: string) => void;
  export const $Issue: (issue: string) => void;
  export const $Link:
    | ((link: Link) => void)
    | ((url: string, name?: string) => void);
  export const $Owner: (owner: string) => void;
  export const $Severity: (severity: Severity[keyof Severity]) => void;
  export const $Story: (story: string) => void;
  export const $Tag: (...tagNames: string[]) => void;
  export const $TmsLink: (tmsLink: string) => void;

  // Decorators
  export function Attachment(name: string, mimeType?: string): MethodDecorator;
  export function FileAttachment(
    name: string,
    mimeType?: string,
  ): MethodDecorator;
  export function Step(
    name: string,
    arguments_?: ParameterOrString[],
  ): MethodDecorator;

  // Common types
  export {
    Category,
    Link,
    LinkType,
    Parameter,
    ParameterOptions,
    ExecutorInfo,
    Severity,
    Status,
    Stage,
  } from '@noomorph/allure-js-commons';
}
