// labels/index.ts
import type { Label, LabelsCustomizer, PropertyExtractor } from 'jest-allure2-reporter';

import { appender, constant } from '../../common';

import { labelsMap } from './labelsMap';

export function labels<Context>(
  customizer: undefined | null | LabelsCustomizer<Context>,
): PropertyExtractor<Label[], never, Context> | undefined {
  if (customizer == null || typeof customizer === 'function') {
    return constant(customizer);
  }

  if (Array.isArray(customizer)) {
    return appender(customizer);
  }

  return labelsMap(customizer);
}
