import type { SourceCodePluginCustomizer } from 'jest-allure2-reporter';
import { extract, parseWithComments, strip } from 'jest-docblock';

import { autoIndent } from '../../../utils';

import { extractDocblockAbove } from './extractDocblockAbove';

export type JavaScriptSourceCodePluginOptions = {
  extractTransformedCode?: boolean;
};

export const javascript: SourceCodePluginCustomizer = ({ $, value = {} }) => {
  const options = value as JavaScriptSourceCodePluginOptions;

  function detectLanguage(fileName: string | undefined) {
    return fileName && /\.m?jsx?$/.test(fileName) ? 'javascript' : undefined;
  }

  return {
    name: 'javascript',

    detectLanguage({ fileName }) {
      return detectLanguage(fileName);
    },

    extractSourceCode: ({ fileName, lineNumber, transformedCode }) => {
      if (fileName && !lineNumber) {
        return $.getFileNavigator(fileName).then((navigator) =>
          navigator ? strip(navigator.getContent()).trimStart() : undefined,
        );
      }

      return options.extractTransformedCode && transformedCode
        ? autoIndent(transformedCode.trimStart())
        : undefined;
    },

    extractDocblock: ({ fileName, lineNumber }) => {
      if (fileName && detectLanguage(fileName)) {
        return $.getFileNavigator(fileName).then((navigator) => {
          if (!navigator) return;

          let docblock = lineNumber
            ? extractDocblockAbove(navigator, lineNumber)
            : extract(navigator.getContent());
          docblock = docblock.trim();

          return docblock ? parseWithComments(docblock) : undefined;
        });
      }

      return;
    },
  };
};
