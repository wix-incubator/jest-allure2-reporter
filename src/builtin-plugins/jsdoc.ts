/* eslint-disable @typescript-eslint/consistent-type-imports,import/no-extraneous-dependencies */
import type { Plugin, PluginConstructor } from 'jest-allure2-reporter';
import { state } from 'jest-metadata';
import type { Metadata } from 'jest-metadata';
import type { Label } from '@noomorph/allure-js-commons';

import { DOCBLOCK, DESCRIPTION, LABELS } from '../constants';

type ParseWithComments = typeof import('jest-docblock').parseWithComments;

function mergeJsDocument(
  parseWithComments: ParseWithComments,
  metadata: Metadata,
) {
  const jsdoc = metadata.get(DOCBLOCK, '');
  if (jsdoc) {
    const { comments, pragmas } = parseWithComments(jsdoc);
    if (comments) {
      metadata.unshift(DESCRIPTION, [comments]);
    }

    if (pragmas) {
      const labels = Object.entries<any>(pragmas).map(createLabel);
      metadata.unshift(LABELS, labels);
    }
  }
}

function createLabel(entry: [string, string]): Label {
  const [name, value] = entry;
  return { name, value };
}

export const jsdocPlugin: PluginConstructor = () => {
  const plugin: Plugin = {
    name: 'jest-allure2-reporter/plugins/jsdoc',
    async globalContext() {
      try {
        const { parseWithComments } = await import('jest-docblock');
        for (const testFileMetadata of state.testFiles) {
          for (const testEntryMetadata of testFileMetadata.allTestEntries()) {
            mergeJsDocument(parseWithComments, testEntryMetadata);
          }
        }
      } catch (error: any) {
        if (error?.code !== 'MODULE_NOT_FOUND') {
          throw error;
        }
      }
    },
  };

  return plugin;
};
