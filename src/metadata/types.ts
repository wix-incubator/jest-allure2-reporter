import type {
  Attachment,
  Label,
  Link,
  Parameter,
  Stage,
  Status,
  StatusDetails,
} from 'jest-allure2-reporter';

export interface InternalTestStepMetadata {
  steps?: InternalTestStepMetadata[];
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

export interface InternalTestCaseMetadata extends InternalTestStepMetadata {
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
