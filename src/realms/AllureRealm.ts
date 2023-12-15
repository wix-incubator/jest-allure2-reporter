import { state } from 'jest-metadata';

import { AllureRuntime } from '../runtime';
import { SHARED_CONFIG } from '../constants';
import { AttachmentsHandler } from '../runtime';
import type { SharedReporterConfig } from '../runtime';

export class AllureRealm {
  runtime = new AllureRuntime({
    metadataProvider: () => state.currentMetadata,
    nowProvider: () => Date.now(),
    attachmentsHandler: new AttachmentsHandler(() => {
      return state.get(SHARED_CONFIG) as SharedReporterConfig;
    }),
  });
}
