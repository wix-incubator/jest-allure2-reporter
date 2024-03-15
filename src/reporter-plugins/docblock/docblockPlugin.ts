// eslint-disable-next-line node/no-unpublished-import
import type TypeScript from 'typescript';
import type { Plugin, PluginConstructor } from 'jest-allure2-reporter';
import { extract, parseWithComments } from 'jest-docblock';

import {
  extractTypeScriptCode,
  FileNavigatorCache,
  importTypeScript,
} from '../utils';

import { extractJsdocAbove } from './extractJsdocAbove';

export const docblockPlugin: PluginConstructor = () => {
  const plugin: Plugin = {
    name: 'jest-allure2-reporter/plugins/docblock',

    async rawMetadata({ $, metadata }) {
      const { fileName, lineNumber, columnNumber } =
        metadata.sourceLocation || {};
      const code = await $.extractSourceCodeAsync(metadata);
      let extracted: string | undefined;
      const ts = await importTypeScript();
      if (ts && code?.ast && lineNumber != null && columnNumber != null) {
        const fullCode = await extractTypeScriptCode(
          ts,
          code.ast as TypeScript.SourceFile,
          [lineNumber, columnNumber],
          true,
        );
        if (fullCode) {
          extracted = extract(fullCode);
        }
      }

      if (!extracted && fileName && lineNumber != null) {
        const navigator = await FileNavigatorCache.instance.resolve(fileName);
        extracted = extractJsdocAbove(navigator, lineNumber);
      }

      if (extracted) {
        const { comments, pragmas } = parseWithComments(extracted);
        metadata.docblock = { comments, pragmas };
      }
    },
  };

  return plugin;
};
