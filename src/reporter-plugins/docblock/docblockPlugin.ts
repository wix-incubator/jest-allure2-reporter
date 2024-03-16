// eslint-disable-next-line node/no-unpublished-import
import type { Plugin, PluginConstructor } from 'jest-allure2-reporter';
import { extract, parseWithComments } from 'jest-docblock';

import {
  extractTypescriptAST,
  extractTypeScriptCode,
  FileNavigatorCache,
  importTypeScript,
} from '../source-code';

import { extractJsdocAbove } from './extractJsdocAbove';

export const docblockPlugin: PluginConstructor = () => {
  const plugin: Plugin = {
    name: 'jest-allure2-reporter/plugins/docblock',

    async postProcessMetadata({ metadata }) {
      const { fileName, lineNumber, columnNumber } =
        metadata.sourceLocation || {};
      let extracted: string | undefined;
      const ts = await importTypeScript();
      if (
        ts &&
        fileName != null &&
        lineNumber != null &&
        columnNumber != null
      ) {
        const ast = await extractTypescriptAST(ts, fileName);
        const fullCode = await extractTypeScriptCode(
          ts,
          ast,
          [lineNumber, columnNumber],
          true,
        );
        if (fullCode) {
          extracted = extract(fullCode);
        }
      }

      if (!extracted && fileName) {
        const navigator = await FileNavigatorCache.instance.resolve(fileName);

        extracted =
          lineNumber == null
            ? extract(navigator.sourceCode)
            : extractJsdocAbove(navigator, lineNumber);
      }

      if (extracted) {
        const { comments, pragmas } = parseWithComments(extracted);
        metadata.docblock = { comments, pragmas };
      }
    },
  };

  return plugin;
};
