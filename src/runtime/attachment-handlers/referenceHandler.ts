import type { FileAttachmentHandler } from '../types';

export const referenceHandler: FileAttachmentHandler = ({ sourcePath }) =>
  sourcePath;
