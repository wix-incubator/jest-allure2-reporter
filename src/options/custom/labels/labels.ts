import type {
  Label,
  LabelsCustomizer,
  MaybeNullish,
  MaybePromise,
  PropertyExtractor,
} from 'jest-allure2-reporter';

import { appender, constant } from '../../common';

import { labelsMap } from './labelsMap';

export function labels<Context>(
  customizer: MaybeNullish<LabelsCustomizer<Context>>,
): PropertyExtractor<Context, MaybePromise<Label[]>> | undefined {
  if (customizer == null || typeof customizer === 'function') {
    return constant(customizer);
  }

  if (Array.isArray(customizer)) {
    return appender(customizer);
  }

  return labelsMap(customizer);
}

/*

labels: undefined
labels: null
labels: (context) => [],
labels: {
  epic: undefined,
  feature: null,
  owner: 'Yaroslav',

},


*/
