import { state } from 'jest-metadata';

import { AllureRuntime } from '../api/runtime';
// import { SHARED_CONFIG } from '../constants';
// import { AttachmentsHandler } from '../api/runtime';
// import type { SharedReporterConfig } from '../api/runtime';

export class AllureRealm {
  runtime = new AllureRuntime({
    metadataProvider: () => state.currentMetadata,
    nowProvider: () => Date.now(),
    // attachmentsHandler: new AttachmentsHandler(() => {
    //   return state.get(SHARED_CONFIG) as SharedReporterConfig;
    // }),
  });
}
