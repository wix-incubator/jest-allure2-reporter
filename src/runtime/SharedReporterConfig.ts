import type { ReporterConfig } from 'jest-allure2-reporter';

export type SharedReporterConfig = Pick<
  ReporterConfig,
  'resultsDir' | 'overwrite' | 'attachments' | 'injectGlobals'
>;
