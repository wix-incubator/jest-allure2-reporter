import { state } from 'jest-metadata';
import type { AllureGlobalMetadata } from 'jest-allure2-reporter';

import type { SharedReporterConfig } from '../runtime';
import { AllureRuntime, AllureRuntimeContext } from '../runtime';
import { AllureMetadataProxy } from '../metadata';

export class AllureRealm {
  runtimeContext = new AllureRuntimeContext({
    getCurrentMetadata: () => state.currentMetadata,
    getFileMetadata: () => state.lastTestFile!,
    getGlobalMetadata: () => state,
    getNow: () => Date.now(),
    getReporterConfig() {
      const config = new AllureMetadataProxy<AllureGlobalMetadata>(state).get(
        'config',
      );
      if (!config) {
        throw new Error('Shared reporter config is not defined');
      }

      return config as SharedReporterConfig;
    },
  });

  runtime = new AllureRuntime(this.runtimeContext);
}
