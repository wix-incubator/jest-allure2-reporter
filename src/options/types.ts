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
  TestStepExtractorContext,
  Primitive,
  PromisedProperties,
  MarkdownProcessorOptions,
  SourceCodeProcessorConfig,
  MaybePromise,
} from 'jest-allure2-reporter';

export type CompositeExtractor<Context, Shape> = {
  readonly [K in keyof Shape]-?: PropertyExtractor<Context, MaybePromise<Shape[K]>>;
};

export interface ReporterConfig {
  overwrite: boolean;
  resultsDir: string;
  injectGlobals: boolean;
  attachments: Required<AttachmentsOptions>;
  markdown?: Required<MarkdownProcessorOptions>;
  sourceCode?: SourceCodeProcessorConfig;
  categories: CategoriesExtractor;
  environment: EnvironmentExtractor;
  executor: ExecutorExtractor;
  helpers: HelpersExtractor;
  testCase: TestCaseExtractor<TestCaseExtractorContext>;
  testFile: TestCaseExtractor<TestFileExtractorContext>;
  testRun: TestCaseExtractor<TestRunExtractorContext>;
  testStep: TestStepExtractor<TestStepExtractorContext>;
}

export type ExecutorExtractor = PropertyExtractor<
  GlobalExtractorContext,
  MaybePromise<ExecutorInfo>
>;

export type HelpersExtractor = PropertyExtractor<
  GlobalExtractorContext,
  PromisedProperties<Helpers>
>;

export type CategoriesExtractor = PropertyExtractor<
  GlobalExtractorContext,
  MaybePromise<Category[]>
>;

export type EnvironmentExtractor = PropertyExtractor<
  GlobalExtractorContext,
  MaybePromise<Record<string, Primitive>>
>;

export type TestCaseExtractor<Context> = PropertyExtractor<
  Context,
  PromisedProperties<AllureTestCaseResult>
>;

export type TestStepExtractor<Context> = PropertyExtractor<
  Context,
  PromisedProperties<AllureTestStepResult>
>;

export type TestCaseCompositeExtractor<Context> = CompositeExtractor<Context, AllureTestCaseResult>;

export type TestStepCompositeExtractor<Context> = CompositeExtractor<Context, AllureTestStepResult>;
