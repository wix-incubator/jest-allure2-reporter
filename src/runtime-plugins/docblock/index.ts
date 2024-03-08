import type { DocblockContext } from 'jest-allure2-reporter';
import { extract, parseWithComments } from 'jest-docblock';

import type { LineNavigator } from '../../runtime/utils';

import { extractJsdocAbove } from './extractJsdocAbove';

export type DocblockPluginContext = {
  navigator: LineNavigator;
  lineNumber: number;
  columnNumber: number | undefined;
};

export function parseJsdoc(context: DocblockPluginContext): DocblockContext {
  const { lineNumber, navigator } = context;
  const contents = extractJsdocAbove(navigator, lineNumber);
  const extracted = extract(contents);

  const { comments, pragmas } = parseWithComments(extracted);
  return { comments, pragmas };
}
