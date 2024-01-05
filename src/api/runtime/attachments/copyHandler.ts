import path from 'node:path';
import fs from 'node:fs/promises';

import type { FileAttachmentHandler } from 'jest-allure2-reporter';

import { placeAttachment } from './placeAttachment';

export const copyHandler: FileAttachmentHandler = async (context) => {
  const destination = placeAttachment(context);
  await fs.mkdir(path.dirname(destination), { recursive: true });
  await fs.copyFile(context.sourcePath, destination);
  return destination;
};
