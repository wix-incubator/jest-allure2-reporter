export type AllureTestMetadata = {
  beforeHooks: AllureCodeMetadata[];
  testFn: AllureCodeMetadata;
  afterHooks: AllureCodeMetadata[];

  startedAt: number;
  duration: number;
  errors: unknown[];
  attachments: AllureAttachmentMetadata[];
};

export type AllureSuiteMetadata = {
  beforeHooks: AllureCodeMetadata[];
  afterHooks: AllureCodeMetadata[];

  startedAt: number;
  duration: number;
  errors: unknown[];
  attachments: AllureAttachmentMetadata[];
};

export type AllureCodeMetadata = {
  code: string;
};

export type AllureAttachmentMetadata = {
  filePath: string;
  fileName?: string;
  mimeType?: string;
};
