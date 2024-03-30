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

export { MaybePromise } from '../utils';

export type CompositeExtractor<T, Context> = {
  readonly [K in keyof T]: PropertyExtractor<T[K], never, Context>;
};

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

export type ExecutorExtractor = PropertyExtractor<ExecutorInfo, undefined, GlobalExtractorContext>;

export type HelpersExtractor = PropertyExtractor<Helpers, never, GlobalExtractorContext>;

export type CategoriesExtractor = PropertyExtractor<
  Category[],
  never,
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
  never,
  Context,
  PromisedProperties<AllureTestCaseResult>
>;

export type TestStepExtractor<Context> = PropertyExtractor<
  PromisedProperties<AllureTestStepResult>,
  never,
  Context,
  PromisedProperties<AllureTestStepResult>
>;

export type TestCaseCompositeExtractor<Context> = CompositeExtractor<
  Partial<PromisedProperties<AllureTestCaseResult>>,
  Context
>;

export type TestStepCompositeExtractor<Context> = CompositeExtractor<
  Partial<PromisedProperties<AllureTestStepResult>>,
  Context
>;

export { ReporterOptions } from 'jest-allure2-reporter';
