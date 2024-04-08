import type { SourceCodePluginCustomizer } from 'jest-allure2-reporter';
import { parseWithComments } from 'jest-docblock';

import { importDefault } from '../../utils';

import { extractCoffeeBlock } from './extractCoffeeBlock';

export const coffee: SourceCodePluginCustomizer = async ({ $ }) => {
  const coffee = await importDefault('coffeescript').catch(() => null);
  if (!coffee) return {};

  return {
    extractDocblock({ fileName, lineNumber }) {
      if (fileName && lineNumber && fileName.endsWith('.coffee')) {
        return $.getFileNavigator(fileName).then((navigator) => {
          const docblock = extractCoffeeBlock(coffee, navigator, lineNumber);
          return docblock ? parseWithComments(docblock) : undefined;
        });
      }

      return;
    },
  };
};
