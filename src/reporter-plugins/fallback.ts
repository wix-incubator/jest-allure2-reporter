/// <reference path="augs.d.ts" />

import type { Plugin, PluginConstructor } from 'jest-allure2-reporter';

import { ThreadService } from '../reporter/ThreadService';

export const fallbackPlugin: PluginConstructor = () => {
  const threadService = new ThreadService();
  const plugin: Plugin = {
    name: 'jest-allure2-reporter/plugins/fallback',

    onTestFileStart({ test, testFileMetadata }) {
      const threadId = threadService.allocateThread(test.path);
      testFileMetadata.workerId = String(1 + threadId);
      testFileMetadata.start = Date.now();
    },

    onTestCaseResult({ testCaseMetadata }) {
      const stop = testCaseMetadata.stop ?? Number.NaN;
      if (Number.isNaN(stop)) {
        testCaseMetadata.stop = Date.now();
      }
    },

    onTestFileResult({ test, testFileMetadata }) {
      testFileMetadata.stop = Date.now();
      threadService.freeThread(test.path);
    },
  };

  return plugin;
};
