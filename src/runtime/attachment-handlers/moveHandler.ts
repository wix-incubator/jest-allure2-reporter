import type { FileAttachmentHandler } from '../types';
import { fastMove, getFileSize } from '../../utils';

import { placeAttachment } from './placeAttachment';

export const moveHandler: FileAttachmentHandler = async (context) => {
  const size = context.size ?? (await getFileSize(context.sourcePath));
  const destination = placeAttachment(context);
  await fastMove(context.sourcePath, destination);
  return { source: destination, size };
};
