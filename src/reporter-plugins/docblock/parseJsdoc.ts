import type { AllureTestItemDocblock } from 'jest-allure2-reporter';
import { extract, parseWithComments } from 'jest-docblock';

import type { LineNavigator } from '../source-code';

import { extractJsdocAbove } from './extractJsdocAbove';

export function parseJsdoc(
  navigator: LineNavigator,
  lineNumber: number,
): AllureTestItemDocblock {
  const contents = extractJsdocAbove(navigator, lineNumber);
  const extracted = extract(contents);

  const { comments, pragmas } = parseWithComments(extracted);
  return { comments, pragmas };
}
