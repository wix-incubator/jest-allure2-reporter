import type {
  AllureTestCaseResult,
  AllureTestStepResult,
  Attachment,
  AttachmentsOptions,
  Category,
  ExecutorInfo,
  GlobalExtractorContext,
  Helpers,
  Label,
  Link,
  Parameter,
  PropertyExtractor,
  Stage,
  Status,
  StatusDetails,
  TestCaseExtractorContext,
  TestFileExtractorContext,
  TestRunExtractorContext,
  TestStepExtractorContext,
  Primitive,
} from 'jest-allure2-reporter';

export interface TestCaseCompositeExtractor<Context> {
  hidden: PropertyExtractor<boolean, never, Context>;
  historyId: PropertyExtractor<string, never, Context>;
  displayName: PropertyExtractor<string, never, Context>;
  fullName: PropertyExtractor<string, never, Context>;
  start: PropertyExtractor<number, never, Context>;
  stop: PropertyExtractor<number, never, Context>;
  description: PropertyExtractor<string, never, Context>;
  descriptionHtml: PropertyExtractor<string, never, Context>;
  stage: PropertyExtractor<Stage, never, Context>;
  status: PropertyExtractor<Status, never, Context>;
  statusDetails: PropertyExtractor<StatusDetails, never, Context>;
  labels: PropertyExtractor<Label[], never, Context>;
  links: PropertyExtractor<Link[], never, Context>;
  attachments: PropertyExtractor<Attachment[], never, Context>;
  parameters: PropertyExtractor<Parameter[], never, Context>;
}

export interface TestStepCompositeExtractor<Context> {
  hidden: PropertyExtractor<boolean, never, Context>;
  displayName: PropertyExtractor<string, never, Context>;
  start: PropertyExtractor<number, never, Context>;
  stop: PropertyExtractor<number, never, Context>;
  stage: PropertyExtractor<Stage, never, Context>;
  status: PropertyExtractor<Status, never, Context>;
  statusDetails: PropertyExtractor<StatusDetails, never, Context>;
  attachments: PropertyExtractor<Attachment[], never, Context>;
  parameters: PropertyExtractor<Parameter[], never, Context>;
}

export interface ReporterCompositeConfig {
  overwrite: boolean;
  resultsDir: string;
  injectGlobals: boolean;
  attachments: Required<AttachmentsOptions>;
  categories: CategoriesExtractor;
  environment: EnvironmentExtractor;
  executor: ExecutorExtractor;
  helpers: HelpersExtractor;
  testCase: TestCaseCompositeExtractor<TestCaseExtractorContext>;
  testFile: TestCaseCompositeExtractor<TestFileExtractorContext>;
  testRun: TestCaseCompositeExtractor<TestRunExtractorContext>;
  testStep: TestStepCompositeExtractor<TestStepExtractorContext>;
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
  never,
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
  AllureTestCaseResult,
  undefined,
  Context,
  never
>;

export type TestStepExtractor<Context> = PropertyExtractor<
  AllureTestStepResult,
  undefined,
  Context,
  never
>;

export { ReporterOptions } from 'jest-allure2-reporter';
