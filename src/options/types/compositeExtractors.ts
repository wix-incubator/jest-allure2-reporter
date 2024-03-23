import type {
  Attachment,
  Label,
  Link,
  Parameter,
  PropertyExtractor,
  Stage,
  Status,
  StatusDetails,
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
