import type {
  Label,
  LabelsCustomizer,
  MaybeNullish,
  MaybePromise,
  PropertyExtractor,
} from 'jest-allure2-reporter';

import * as extractors from '../../common';

import { labelsMap } from './labelsMap';

export function labels<Context>(
  customizer: LabelsCustomizer<Context>,
): PropertyExtractor<Context, MaybePromise<Label[]>>;
export function labels<Context>(
  customizer: MaybeNullish<LabelsCustomizer<Context>>,
): PropertyExtractor<Context, MaybePromise<Label[]>> | undefined;
export function labels<Context>(
  customizer: MaybeNullish<LabelsCustomizer<Context>>,
): PropertyExtractor<Context, MaybePromise<Label[]>> | undefined {
  if (customizer == null) {
    return;
  }

  if (typeof customizer === 'function') {
    return customizer;
  }

  if (Array.isArray(customizer)) {
    return extractors.appender(customizer);
  }

  return labelsMap(customizer);
}
