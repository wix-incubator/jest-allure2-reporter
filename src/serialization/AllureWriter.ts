import type {
  Attachment,
  Category,
  ExecutorInfo,
  Label,
  Link,
  Stage,
  Status,
  StatusDetails,
} from 'jest-allure2-reporter';

export interface AllureWriter {
  init?(): Promise<void>;
  cleanup?(): Promise<void>;

  writeCategories(categories: Category[]): Promise<void>;

  writeEnvironmentInfo(info: Record<string, string>): Promise<void>;

  writeExecutorInfo(info: ExecutorInfo): Promise<void>;

  writeContainer(result: AllureContainer): Promise<void>;

  writeResult(result: AllureResult): Promise<void>;
}

export interface AllureContainer {
  uuid: string;
  name?: string;
  children: string[];
  befores?: AllureStep[];
  afters?: AllureStep[];
}

export interface AllureResult {
  uuid: string;
  historyId: string;
  name: string;
  fullName: string;
  start: number;
  stop: number;
  description?: string;
  descriptionHtml?: string;
  stage: Stage;
  status: Status;
  statusDetails?: StatusDetails;
  steps?: AllureStep[];
  labels?: Label[];
  links?: Link[];
  attachments?: Attachment[];
  parameters?: AllureParameter[];
}

export interface AllureStep {
  name: string;
  start: number;
  stop: number;
  stage: Stage;
  status: Status;
  statusDetails?: StatusDetails;
  steps?: AllureStep[];
  attachments?: Attachment[];
  parameters?: AllureParameter[];
}

export interface AllureParameter {
  name: string;
  value: string;
  excluded?: boolean;
  mode?: 'hidden' | 'masked' | 'default';
}
