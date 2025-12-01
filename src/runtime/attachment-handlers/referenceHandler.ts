import path from 'node:path';

import type { FileAttachmentHandler } from '../types';
import { getFileSize } from '../../utils';

export const referenceHandler: FileAttachmentHandler = async (context) => {
  const source = path.resolve(context.sourcePath);
  const size = context.size ?? (await getFileSize(source));
  return { source, size };
};
