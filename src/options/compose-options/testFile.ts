import type {
  ResolvedTestFileCustomizer,
  TestFileCustomizer,
} from 'jest-allure2-reporter';

import { composeExtractors } from '../utils';

import { composeTestCaseCustomizers } from './testCase';

export function composeTestFileCustomizers(
  base: ResolvedTestFileCustomizer,
  custom: Partial<TestFileCustomizer> | undefined,
): ResolvedTestFileCustomizer {
  if (!custom) {
    return base;
  }

  return {
    ...(composeTestCaseCustomizers(base, custom) as any),
    ignored: composeExtractors(custom.ignored, base.ignored),
  };
}
