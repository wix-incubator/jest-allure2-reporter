import type {
  KeyedLabelCustomizer,
  Label,
  MaybeArray,
  MaybePromise,
  PropertyExtractor,
} from 'jest-allure2-reporter';

import { compactArray, compactObject, mapValues, thruMaybePromise } from '../../../utils';
import { compose3 } from '../../common';

import { keyedLabel } from './keyedLabel';

export function simplifyLabelsMap<Context>(
  customizer: Record<string, KeyedLabelCustomizer<Context>>,
): Record<string, PropertyExtractor<Context, Label[], MaybePromise<Label[]>>> {
  return compactObject(
    mapValues(
      customizer,
      (
        value: KeyedLabelCustomizer<Context>,
        key: string,
      ): PropertyExtractor<Context, Label[], MaybePromise<Label[]>> | undefined => {
        const keyedCustomizer = keyedLabel(value);
        return keyedCustomizer
          ? compose3<
              Context,
              Label[],
              string[],
              MaybePromise<MaybeArray<string>>,
              MaybePromise<Label[]>
            >(inflateLabels(key), keyedCustomizer, deflateLabels)
          : undefined;
      },
    ),
  );
}

function deflateLabels(context: { value: Label[] }): string[] {
  return context.value.map(getValue);
}

function getValue(label: Label): string {
  return label.value;
}

function inflateLabels<Context>(
  name: string,
): PropertyExtractor<Context, MaybePromise<MaybeArray<string>>, MaybePromise<Label[]>> {
  function repair(value: string | undefined): Label | undefined {
    return value == null ? undefined : { value, name };
  }

  function repairMaybeArray(value: MaybeArray<string>): Label[] {
    return compactArray(Array.isArray(value) ? value.map(repair) : [repair(value)]);
  }

  return ({ value }) => thruMaybePromise(value, repairMaybeArray);
}
