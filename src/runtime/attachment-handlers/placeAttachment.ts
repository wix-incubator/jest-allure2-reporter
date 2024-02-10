import path from 'node:path';
import { randomUUID } from 'node:crypto';

import type {
  AttachmentContext,
  ContentAttachmentContext,
  FileAttachmentContext,
} from '../types';

export function placeAttachment(context: AttachmentContext): string {
  const { outDir, name, sourcePath } = context as FileAttachmentContext &
    ContentAttachmentContext;
  const fileName = name || sourcePath || '';
  return path.join(outDir, randomUUID() + path.extname(fileName));
}
