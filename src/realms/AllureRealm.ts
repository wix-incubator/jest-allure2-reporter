import { state } from 'jest-metadata';

import type { SharedReporterConfig } from '../api/runtime';
import { AllureRuntime } from '../api/runtime';
import { SHARED_CONFIG } from '../constants';

export class AllureRealm {
  runtime = new AllureRuntime({
    getMetadata: () => state.currentMetadata,
    getNow: () => Date.now(),
    getReporterConfig() {
      const config = state.get(SHARED_CONFIG);
      if (!config) {
        throw new Error('Shared reporter config is not defined');
      }

      return config as SharedReporterConfig;
    },
  });
}
