import path from 'node:path';
import fs from 'node:fs/promises';

import type { FileAttachmentHandler } from '../types';

import { placeAttachment } from './placeAttachment';

export const moveHandler: FileAttachmentHandler = async (context) => {
  const destination = placeAttachment(context);
  await fs.mkdir(path.dirname(destination), { recursive: true });
  await fs.rename(context.sourcePath, destination);
  return destination;
};
