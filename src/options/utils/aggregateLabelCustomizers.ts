/* eslint-disable unicorn/no-array-reduce */
import type {
  Extractor,
  ExtractorContext,
  TestFileCustomizer,
  TestCaseCustomizer,
} from 'jest-allure2-reporter';
import type { Label } from 'jest-allure2-reporter';

import { flatMapAsync } from '../../utils/flatMapAsync';

import { asExtractor } from './asExtractor';

type Customizer = TestFileCustomizer | TestCaseCustomizer;
export function aggregateLabelCustomizers<C extends Customizer>(
  labels: C['labels'] | undefined,
): Extractor<Label[]> | undefined {
  if (!labels || typeof labels === 'function') {
    return labels as Extractor<Label[]> | undefined;
  }

  const extractors = Object.keys(labels).reduce(
    (accumulator, key) => {
      const extractor = asExtractor(labels[key]) as Extractor<string[]>;
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

    if (context.value) {
      for (const label of context.value) {
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
          value: asArray(found[name]),
        };
        const extracted = await extractor(aContext);
        const value = asArray(extracted);
        return value ? value.map((value) => ({ name, value }) as Label) : [];
      })),
    ];

    return result;
  };

  return combined;
}

function asArray<T extends string>(
  value: T | T[] | undefined,
): T[] | undefined {
  if (Array.isArray(value)) {
    return value.length > 0 ? value : undefined;
  } else {
    return value ? [value] : [];
  }
}
