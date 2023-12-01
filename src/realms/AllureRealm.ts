import { state } from 'jest-metadata';
import type { SharedReporterConfig } from 'jest-allure2-reporter';

import { AllureRuntime } from '../runtime';
import { SHARED_CONFIG } from '../constants';
import { AttachmentsHandler } from '../runtime/AttachmentsHandler';

export class AllureRealm {
  runtime = new AllureRuntime({
    metadataProvider: () => state.currentMetadata,
    nowProvider: () => Date.now(),
    attachmentsHandler: new AttachmentsHandler(() => {
      return state.get(SHARED_CONFIG) as SharedReporterConfig;
    }),
  });
}
