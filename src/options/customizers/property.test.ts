import type {
  Extractor,
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
): TestRunPropertyExtractor<T, R> | undefined;
export function propertyCustomizer<T, R = T>(
  value: TestFilePropertyCustomizer<T, R>,
): TestFilePropertyExtractor<T, R> | undefined;
export function propertyCustomizer<T, R = T>(
  value: TestCasePropertyCustomizer<T, R>,
): TestCasePropertyExtractor<T, R> | undefined;
export function propertyCustomizer<T, R = T>(
  value: TestStepPropertyCustomizer<T, R>,
): TestStepPropertyExtractor<T, R> | undefined;
export function propertyCustomizer<T, R = T>(
  value: T | Extractor<T, R>,
): Extractor<T, R> | undefined {
  if (value == null) {
    return;
  }

  return asExtractor(value);
}
