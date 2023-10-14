import { randomUUID } from 'node:crypto';
import path from 'node:path';
import fs from 'node:fs';
import os from 'node:os';

import { state } from 'jest-metadata';

import { AllureRuntime } from '../runtime';
import { OUT_DIR } from '../constants';

const fallbackAttachmentsFolder = path.join(os.tmpdir(), 'allure-attachments');

export class AllureRealm {
  runtime = new AllureRuntime({
    metadataProvider: () => state.currentMetadata,
    nowProvider: () => Date.now(),
    placeAttachment: (name) => {
      const attachmentsFolder = state.get(
        OUT_DIR,
        fallbackAttachmentsFolder,
      ) as string;
      const extension = path.extname(name);
      return path.join(attachmentsFolder, randomUUID() + extension);
    },
    writeAttachment: async (filePath, content) => {
      await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
      await fs.promises.writeFile(filePath, content);
    },
  });
}
