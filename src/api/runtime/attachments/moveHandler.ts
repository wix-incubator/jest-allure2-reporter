import path from 'node:path';
import fs from 'node:fs/promises';

import type { FileAttachmentHandler } from 'jest-allure2-reporter';

import { placeAttachment } from './placeAttachment';

export const moveHandler: FileAttachmentHandler = async (context) => {
  const destination = placeAttachment(context);
  await fs.mkdir(path.dirname(destination), { recursive: true });
  await fs.rename(context.sourcePath, destination);
  return destination;
};
