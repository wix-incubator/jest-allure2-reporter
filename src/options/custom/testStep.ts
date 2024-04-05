import type {
  AllureTestStepResult,
  PropertyExtractor,
  TestStepCustomizer,
  TestStepExtractorContext,
} from 'jest-allure2-reporter';

import * as extractors from '../common';
import type { TestStepCompositeExtractor, TestStepExtractor } from '../types';

import { parameters } from './parameters';

const fallback: PropertyExtractor<{}, unknown> = (context) => context.value;

export function testStep<Context>(
  customizer: TestStepCustomizer<Context>,
): TestStepExtractor<Context>;
export function testStep(customizer: null | undefined): undefined;
export function testStep<Context>(
  customizer: TestStepCustomizer<Context> | null | undefined,
): TestStepExtractor<Context> | undefined;
export function testStep<Context extends TestStepExtractorContext>(
  customizer: TestStepCustomizer<Context> | null | undefined,
): TestStepExtractor<Context> | undefined {
  if (customizer == null) {
    return;
  }

  return extractors.proxyObject<Context, AllureTestStepResult>({
    hookType: fallback,
    steps: fallback,
    ignored: extractors.constant(customizer.ignored) ?? fallback,
    displayName: extractors.constant(customizer.displayName) ?? fallback,
    start: extractors.constant(customizer.start) ?? fallback,
    stop: extractors.constant(customizer.stop) ?? fallback,
    stage: extractors.constant(customizer.stage) ?? fallback,
    status: extractors.constant(customizer.status) ?? fallback,
    statusDetails: extractors.merger(customizer.statusDetails) ?? fallback,
    attachments: extractors.appender(customizer.attachments) ?? fallback,
    parameters: parameters(customizer.parameters) ?? fallback,
  } as TestStepCompositeExtractor<Context>);
}
