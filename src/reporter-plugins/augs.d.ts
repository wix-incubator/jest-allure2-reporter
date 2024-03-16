declare module 'jest-allure2-reporter' {
  import type { ExecutorInfo } from '@noomorph/allure-js-commons';

  import type { ManifestHelper } from './manifest';

  interface ExtractorHelpersAugmentation {
    /**
     * The contents of the `package.json` file if it exists.
     */
    manifest: ManifestHelper;

    /**
     * Information about the current executor
     */
    getExecutorInfo(): Promise<ExecutorInfo | undefined>;
    getExecutorInfo(includeLocal: true): Promise<ExecutorInfo>;
  }
}
