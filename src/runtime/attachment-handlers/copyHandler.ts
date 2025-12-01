import path from 'node:path';
import fs from 'node:fs/promises';

import type { FileAttachmentHandler } from '../types';
import { getFileSize } from '../../utils';

import { placeAttachment } from './placeAttachment';

export const copyHandler: FileAttachmentHandler = async (context) => {
  const destination = placeAttachment(context);
  await fs.mkdir(path.dirname(destination), { recursive: true });
  await fs.copyFile(context.sourcePath, destination);
  const size = context.size ?? (await getFileSize(context.sourcePath));
  return { source: destination, size };
};
