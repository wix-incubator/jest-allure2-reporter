import path from 'node:path';

import type { Attachment, GlobalExtractor } from 'jest-allure2-reporter';

export const attachments: GlobalExtractor<Attachment[]> = async ({
  config,
  value,
}) => {
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
