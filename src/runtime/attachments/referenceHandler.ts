import type { FileAttachmentHandler } from 'jest-allure2-reporter';

export const referenceHandler: FileAttachmentHandler = ({ sourcePath }) =>
  sourcePath;
