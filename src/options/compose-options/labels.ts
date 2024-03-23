/* eslint-disable unicorn/no-array-reduce */
import type {
  Extractor,
  ExtractorContext,
  TestFilePropertyCustomizer,
  TestCasePropertyCustomizer,
} from 'jest-allure2-reporter';
import type { Label } from 'jest-allure2-reporter';

import { flatMapAsync } from '../../utils/flatMapAsync';
import { asArray, constant } from '../../utils';
import { constantExtractor } from '../extractors';

type Customizer = TestFilePropertyCustomizer | TestCasePropertyCustomizer;

function isExtractor<T>(value: unknown): value is Extractor<T> {
  return typeof value === 'function';
}

export function labels<C extends Customizer>(
  labels: C['labels'],
): Extractor<Label[]> {
  if (isExtractor<Label[]>(labels)) {
    return labels;
  }

  const extractors = Object.keys(labels).reduce(
    (accumulator, key) => {
      const extractor = constantExtractor<string | string[]>(labels[key]);
      if (extractor) {
        accumulator[key] = extractor;
      }
      return accumulator;
    },
    {} as Record<string, Extractor<string[]>>,
  );

  const names = Object.keys(extractors);

  const combined: Extractor<Label[]> = async (context) => {
    const other: Label[] = [];
    const found = names.reduce(
      (found, key) => {
        found[key] = [];
        return found;
      },
      {} as Record<string, string[]>,
    );

    const baseValue = await context.value;
    if (baseValue) {
      for (const label of baseValue) {
        if (found[label.name]) {
          found[label.name].push(label.value);
        } else {
          other.push(label);
        }
      }
    }

    const result = [
      ...other,
      ...(await flatMapAsync(names, async (name) => {
        const extractor = extractors[name];
        const aContext: ExtractorContext<string[]> = {
          ...context,
          base: constant(asArray(found[name])),
        };
        const extracted = await extractor(aContext);
        const value = asArray(extracted);
        return value.length > 0
          ? value.map((value) => ({ name, value }) as Label)
          : [];
      })),
    ];

    return result;
  };

  return combined;
}
