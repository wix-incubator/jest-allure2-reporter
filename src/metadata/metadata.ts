import type {
  Attachment,
  Label,
  Link,
  Parameter,
  Stage,
  Status,
  StatusDetails,
} from '@noomorph/allure-js-commons';

export interface AllureTestStepMetadata {
  steps?: AllureTestStepMetadata[];

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
   * Source code of the test case, glued from all hooks and test function itself.
   */
  code?: string[];
  /**
   * Only steps can have names.
   */
  name?: never;
  description?: string[];
  descriptionHtml?: string[];
  labels?: Label[];
  links?: Link[];
}
