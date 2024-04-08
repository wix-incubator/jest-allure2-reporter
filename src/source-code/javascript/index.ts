import type { SourceCodePluginCustomizer } from 'jest-allure2-reporter';
import { parseWithComments } from 'jest-docblock';

import { extractDocblockAbove } from './extractDocblockAbove';

export const javascript: SourceCodePluginCustomizer = ({ $ }) => {
  return {
    extractDocblock({ fileName, lineNumber }) {
      if (fileName && lineNumber) {
        return $.getFileNavigator(fileName).then((navigator) => {
          const docblock = extractDocblockAbove(navigator, lineNumber);
          return docblock ? parseWithComments(docblock) : undefined;
        });
      }

      return;
    },
  };
};
