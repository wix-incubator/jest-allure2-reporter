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
} from 'jest-allure2-reporter';

export type MaybePromise<T> = T | Promise<T>;

export type CompositeExtractor<T, Context> = {
  readonly [K in keyof T]: PropertyExtractor<T[K], never, Context>;
};

export interface ReporterCompositeConfig {
  overwrite: boolean;
  resultsDir: string;
  injectGlobals: boolean;
  attachments: Required<AttachmentsOptions>;
  categories: CategoriesExtractor;
  environment: EnvironmentExtractor;
  executor: ExecutorExtractor;
  helpers: HelpersExtractor;
  testCase: CompositeExtractor<AllureTestCaseResult, TestCaseExtractorContext>;
  testFile: CompositeExtractor<AllureTestCaseResult, TestFileExtractorContext>;
  testRun: CompositeExtractor<AllureTestCaseResult, TestRunExtractorContext>;
  testStep: CompositeExtractor<AllureTestStepResult, TestStepExtractorContext>;
}

export interface ReporterConfig {
  overwrite: boolean;
  resultsDir: string;
  injectGlobals: boolean;
  attachments: Required<AttachmentsOptions>;
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
  ExecutorInfo,
  undefined,
  GlobalExtractorContext
>;

export type HelpersExtractor = PropertyExtractor<
  Helpers,
  undefined,
  GlobalExtractorContext
>;

export type CategoriesExtractor = PropertyExtractor<
  Category[],
  undefined,
  GlobalExtractorContext,
  never
>;

export type EnvironmentExtractor = PropertyExtractor<
  Record<string, Primitive>,
  undefined,
  GlobalExtractorContext,
  never
>;

export type TestCaseExtractor<Context> = PropertyExtractor<
  PromisedProperties<AllureTestCaseResult>,
  undefined,
  Context,
  PromisedProperties<AllureTestCaseResult>
>;

export type TestStepExtractor<Context> = PropertyExtractor<
  PromisedProperties<AllureTestStepResult>,
  undefined,
  Context,
  PromisedProperties<AllureTestStepResult>
>;

export { ReporterOptions } from 'jest-allure2-reporter';
