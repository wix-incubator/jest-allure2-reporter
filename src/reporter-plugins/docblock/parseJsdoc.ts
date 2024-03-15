import type { DocblockExtractorResult } from 'jest-allure2-reporter';
import { extract, parseWithComments } from 'jest-docblock';

import type { LineNavigator } from '../utils';

import { extractJsdocAbove } from './extractJsdocAbove';

export function parseJsdoc(
  navigator: LineNavigator,
  lineNumber: number,
): DocblockExtractorResult {
  const contents = extractJsdocAbove(navigator, lineNumber);
  const extracted = extract(contents);

  const { comments, pragmas } = parseWithComments(extracted);
  return { comments, pragmas };
}
