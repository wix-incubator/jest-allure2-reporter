import path from 'node:path';
import fs from 'node:fs/promises';

import type { ContentAttachmentHandler } from 'jest-allure2-reporter';

import { placeAttachment } from './placeAttachment';

export const writeHandler: ContentAttachmentHandler = async (context) => {
  const destination = placeAttachment(context);
  await fs.mkdir(path.dirname(destination), { recursive: true });
  await fs.writeFile(destination, context.content);
  return destination;
};
