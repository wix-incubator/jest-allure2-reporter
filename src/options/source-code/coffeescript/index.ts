import type { SourceCodePluginCustomizer } from 'jest-allure2-reporter';
import { extract, parseWithComments } from 'jest-docblock';

import { importCwd } from '../../../utils';

import { extractCoffeeBlock } from './extractCoffeeBlock';

export const coffee: SourceCodePluginCustomizer = async ({ $ }) => {
  const coffee = await importCwd('coffeescript').catch(() => null);

  function detectLanguage(fileName: string | undefined) {
    return fileName && /\.coffee$/.test(fileName) ? 'coffeescript' : undefined;
  }

  return {
    name: 'coffee',

    detectLanguage({ fileName }) {
      return detectLanguage(fileName);
    },

    extractDocblock({ fileName, lineNumber }) {
      if (coffee && fileName && detectLanguage(fileName)) {
        return $.getFileNavigator(fileName).then((navigator) => {
          if (!navigator) return;

          let docblock = '';
          if (lineNumber) {
            docblock = extractCoffeeBlock(coffee, navigator, lineNumber);
          } else {
            const sourceCode = coffee.compile(navigator.getContent(), { bare: true });
            docblock = extract(sourceCode);
          }

          docblock = docblock.trim();
          return docblock ? parseWithComments(docblock.trim()) : undefined;
        });
      }

      return;
    },
  };
};
