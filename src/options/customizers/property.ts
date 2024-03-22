import type {
  TestCasePropertyCustomizer,
  TestFilePropertyCustomizer,
  TestRunPropertyCustomizer,
  TestStepPropertyCustomizer,
  TestCasePropertyExtractor,
  TestFilePropertyExtractor,
  TestRunPropertyExtractor,
  TestStepPropertyExtractor,
} from 'jest-allure2-reporter';

import { asExtractor } from '../extractors';

export function propertyCustomizer<T, R = T>(
  value: TestRunPropertyCustomizer<T, R>,
): TestRunPropertyExtractor<T, R>;
export function propertyCustomizer<T, R = T>(
  value: TestFilePropertyCustomizer<T, R>,
): TestFilePropertyExtractor<T, R>;
export function propertyCustomizer<T, R = T>(
  value: TestCasePropertyCustomizer<T, R>,
): TestCasePropertyExtractor<T, R>;
export function propertyCustomizer<T, R = T>(
  value: TestStepPropertyCustomizer<T, R>,
): TestStepPropertyExtractor<T, R>;
export function propertyCustomizer<T, R = T>(
  value:
    | TestRunPropertyCustomizer<T, R>
    | TestFilePropertyCustomizer<T, R>
    | TestCasePropertyCustomizer<T, R>
    | TestStepPropertyCustomizer<T, R>
    | T
    | R
    | undefined,
):
  | TestCasePropertyExtractor<T, R>
  | TestFilePropertyExtractor<T, R>
  | TestRunPropertyExtractor<T, R>
  | TestStepPropertyExtractor<T, R>
  | undefined {
  if (value == null) {
    return;
  }

  return asExtractor(value as any);
}
