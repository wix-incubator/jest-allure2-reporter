import type {
  AllureTestCaseResult,
  AllureTestStepResult,
  AttachmentsOptions,
  Category,
  ExecutorInfo,
  GlobalExtractorContext,
  Helpers,
  PropertyExtractor,
  TestCaseExtractorContext,
  TestFileExtractorContext,
  TestRunExtractorContext,
  Primitive,
  PromisedProperties,
  MarkdownProcessorOptions,
  MaybePromise,
  TestStepExtractorContext,
  SourceCodePluginCustomizer,
  SourceCodePlugin,
} from 'jest-allure2-reporter';

export type CompositeExtractor<Context, Shape> = {
  readonly [K in keyof Shape]-?: PropertyExtractor<Context, MaybePromise<Shape[K]>>;
};

export interface ReporterConfig {
  overwrite: boolean;
  resultsDir: string;
  injectGlobals: boolean;
  attachments: Required<AttachmentsOptions>;
  markdown: Required<MarkdownProcessorOptions>;
  sourceCode: SourceCodeProcessorConfig;
  categories: CategoriesExtractor;
  environment: EnvironmentExtractor;
  executor: ExecutorExtractor;
  helpers: HelpersExtractor;
  testCase: TestCaseExtractor<TestCaseExtractorContext>;
  testFile: TestCaseExtractor<TestFileExtractorContext>;
  testRun: TestCaseExtractor<TestRunExtractorContext>;
  testStep: TestStepExtractor<TestStepExtractorContext>;
}

export interface ReporterFinalConfig extends ReporterConfig {
  overwrite: boolean;
  resultsDir: string;
  injectGlobals: boolean;
  attachments: Required<AttachmentsOptions>;
  markdown: Required<MarkdownProcessorOptions>;
  sourceCode: SourceCodeProcessorConfig;
  categories: CategoriesExtractor<void>;
  environment: EnvironmentExtractor<void>;
  executor: ExecutorExtractor<void>;
  helpers: HelpersExtractor<void>;
  testCase: TestCaseExtractor<TestCaseExtractorContext, void>;
  testFile: TestCaseExtractor<TestFileExtractorContext, void>;
  testRun: TestCaseExtractor<TestRunExtractorContext, void>;
  testStep: TestStepExtractor<TestStepExtractorContext, void>;
  testCaseSteps: TestStepsExtractor<TestCaseExtractorContext, void>;
  testFileSteps: TestStepsExtractor<TestFileExtractorContext, void>;
  testRunSteps: TestStepsExtractor<TestRunExtractorContext, void>;
}

export interface SourceCodeProcessorConfig {
  enabled: boolean;
  factories: Record<string, SourceCodePluginCustomizer>;
  options: Record<string, unknown>;
  plugins: SourceCodePlugin[];
}

export type ExecutorExtractor<T = never> = PropertyExtractor<
  GlobalExtractorContext,
  MaybePromise<ExecutorInfo> | T,
  MaybePromise<ExecutorInfo>
>;

export type HelpersExtractor<T = never> = PropertyExtractor<
  GlobalExtractorContext,
  PromisedProperties<Helpers> | T,
  PromisedProperties<Helpers>
>;

export type CategoriesExtractor<T = never> = PropertyExtractor<
  GlobalExtractorContext,
  MaybePromise<Category[]> | T,
  MaybePromise<Category[]>
>;

export type EnvironmentExtractor<T = never> = PropertyExtractor<
  GlobalExtractorContext,
  MaybePromise<Record<string, Primitive>> | T,
  MaybePromise<Record<string, Primitive>>
>;

export type TestCaseExtractor<Context, T = never> = PropertyExtractor<
  Context,
  PromisedProperties<AllureTestCaseResult> | T,
  PromisedProperties<AllureTestCaseResult>
>;

export type TestStepExtractor<Context, T = never> = PropertyExtractor<
  Context,
  PromisedProperties<AllureTestStepResult> | T,
  PromisedProperties<AllureTestStepResult>
>;

export type TestStepsExtractor<Context, T = never> = PropertyExtractor<
  Context,
  PromisedProperties<AllureTestStepResult>[] | T,
  PromisedProperties<AllureTestStepResult>[]
>;

export type TestCaseCompositeExtractor<Context> = CompositeExtractor<Context, AllureTestCaseResult>;

export type TestStepCompositeExtractor<Context> = CompositeExtractor<Context, AllureTestStepResult>;
