import type {
  AllureTestStepMetadata,
  AllureTestStepResult,
  Attachment,
  Label,
  Link,
  Parameter,
  Primitive,
  Stage,
  Status,
  StatusDetails,
  TestCasePropertyExtractor,
  TestFilePropertyExtractor,
  TestRunPropertyExtractor,
  TestStepPropertyExtractor,
} from 'jest-allure2-reporter';

export interface TestCaseCompositeExtractor {
  hidden: TestCasePropertyExtractor<boolean>;
  historyId: TestCasePropertyExtractor<string>;
  displayName: TestCasePropertyExtractor<string>;
  fullName: TestCasePropertyExtractor<string>;
  start: TestCasePropertyExtractor<number>;
  stop: TestCasePropertyExtractor<number>;
  description: TestCasePropertyExtractor<string>;
  descriptionHtml: TestCasePropertyExtractor<string>;
  stage: TestCasePropertyExtractor<Stage>;
  status: TestCasePropertyExtractor<Status>;
  statusDetails: TestCasePropertyExtractor<StatusDetails>;
  labels: TestCasePropertyExtractor<Label[]>;
  links: TestCasePropertyExtractor<Link[]>;
  attachments: TestCasePropertyExtractor<Attachment[]>;
  parameters: TestCasePropertyExtractor<Parameter[]>;
}

export interface TestFileCompositeExtractor {
  hidden: TestFilePropertyExtractor<boolean>;
  historyId: TestFilePropertyExtractor<Primitive>;
  displayName: TestFilePropertyExtractor<string>;
  fullName: TestFilePropertyExtractor<string>;
  start: TestFilePropertyExtractor<number>;
  stop: TestFilePropertyExtractor<number>;
  description: TestFilePropertyExtractor<string>;
  descriptionHtml: TestFilePropertyExtractor<string>;
  stage: TestFilePropertyExtractor<Stage>;
  status: TestFilePropertyExtractor<Status>;
  statusDetails: TestFilePropertyExtractor<StatusDetails>;
  labels: TestFilePropertyExtractor<Label[]>;
  links: TestFilePropertyExtractor<Link[]>;
  attachments: TestFilePropertyExtractor<Attachment[]>;
  parameters: TestFilePropertyExtractor<Parameter[]>;
}

export interface TestRunCompositeExtractor {
  hidden: TestRunPropertyExtractor<boolean>;
  historyId: TestRunPropertyExtractor<Primitive>;
  displayName: TestRunPropertyExtractor<string>;
  fullName: TestRunPropertyExtractor<string>;
  start: TestRunPropertyExtractor<number>;
  stop: TestRunPropertyExtractor<number>;
  description: TestRunPropertyExtractor<string>;
  descriptionHtml: TestRunPropertyExtractor<string>;
  stage: TestRunPropertyExtractor<Stage>;
  status: TestRunPropertyExtractor<Status>;
  statusDetails: TestRunPropertyExtractor<StatusDetails>;
  labels: TestRunPropertyExtractor<Label[]>;
  links: TestRunPropertyExtractor<Link[]>;
  attachments: TestRunPropertyExtractor<Attachment[]>;
  parameters: TestRunPropertyExtractor<Parameter[]>;
}

export interface TestStepCompositeExtractor {
  hidden: TestStepPropertyExtractor<boolean>;
  hookType: TestStepPropertyExtractor<AllureTestStepMetadata['hookType']>;
  displayName: TestStepPropertyExtractor<string>;
  start: TestStepPropertyExtractor<number>;
  stop: TestStepPropertyExtractor<number>;
  stage: TestStepPropertyExtractor<Stage>;
  status: TestStepPropertyExtractor<Status>;
  statusDetails: TestStepPropertyExtractor<StatusDetails>;
  steps: TestStepPropertyExtractor<AllureTestStepResult[]>;
  attachments: TestStepPropertyExtractor<Attachment[]>;
  parameters: TestStepPropertyExtractor<Parameter[]>;
}
