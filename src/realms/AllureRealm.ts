import { randomUUID } from 'node:crypto';
import path from 'node:path';
import fs from 'node:fs';
import os from 'node:os';

import { state } from 'jest-metadata';

import { AllureRuntime } from '../runtime';

export class AllureRealm {
  attachmentsFolder = os.tmpdir();

  runtime = new AllureRuntime({
    metadataProvider: () => state.currentMetadata,
    nowProvider: () => Date.now(),
    writeAttachment: (content) => {
      const filePath = `allure2-${randomUUID()}`;
      const absolutePath = path.join(this.attachmentsFolder, filePath);
      fs.writeFileSync(absolutePath, content);
      return absolutePath;
    },
  });
}
