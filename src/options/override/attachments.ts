import path from 'node:path';

import type { GlobalExtractorContext, TestCaseCustomizer } from 'jest-allure2-reporter';

import type { ReporterConfig } from '../types';

export const attachments: TestCaseCustomizer<GlobalExtractorContext>['attachments'] = async ({
  reporterConfig,
  value,
}) => {
  const config = reporterConfig as ReporterConfig;
  const attachments = (await value) ?? [];

  return attachments.map((attachment) => {
    const source = path.relative(config.resultsDir, attachment.source);
    if (source.startsWith('..')) {
      return attachment;
    }

    return {
      ...attachment,
      source,
    };
  });
};
