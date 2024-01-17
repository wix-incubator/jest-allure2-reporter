/* eslint-disable @typescript-eslint/consistent-type-imports,import/no-extraneous-dependencies */
import fs from 'node:fs/promises';

import type { Plugin, PluginConstructor } from 'jest-allure2-reporter';
import { state } from 'jest-metadata';
import type { Metadata } from 'jest-metadata';
import type { Label } from 'jest-allure2-reporter';

import { CODE, DESCRIPTION, LABELS } from '../metadata/constants';
import { splitDocblock } from '../utils';

type ParseWithComments = typeof import('jest-docblock').parseWithComments;

function mergeDocumentBlocks(
  parseWithComments: ParseWithComments,
  metadata: Metadata,
  codeDefault = '',
) {
  const rawCode = metadata.get(CODE, codeDefault);
  const [jsdoc, code] = splitDocblock(rawCode);
  if (jsdoc) {
    metadata.set(CODE, code);

    const { comments, pragmas } = parseWithComments(jsdoc);
    if (comments) {
      metadata.unshift(DESCRIPTION, [comments]);
    }

    if (pragmas) {
      const labels = Object.entries<any>(pragmas).flatMap(createLabel);
      metadata.unshift(LABELS, labels);
    }
  }
}

function createLabel(entry: [string, string | string[]]): Label | Label[] {
  const [name, value] = entry;
  return Array.isArray(value)
    ? value.map((v) => ({ name, value: v }))
    : { name, value };
}

export const docblockPlugin: PluginConstructor = () => {
  const plugin: Plugin = {
    name: 'jest-allure2-reporter/plugins/docblock',
    async testFileContext({ testFile: { testFilePath } }) {
      try {
        const { parseWithComments } = await import('jest-docblock');
        const testFileMetadata = state.getTestFileMetadata(testFilePath);
        const fileContents = await fs.readFile(testFilePath, 'utf8');

        mergeDocumentBlocks(parseWithComments, testFileMetadata, fileContents);
        for (const testEntryMetadata of testFileMetadata.allTestEntries()) {
          mergeDocumentBlocks(parseWithComments, testEntryMetadata);
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
