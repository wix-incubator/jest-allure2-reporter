/* eslint-disable unicorn/no-array-reduce */
import type { Label } from '@noomorph/allure-js-commons';

import type {
  LabelExtractor,
  LabelsCustomizer,
  TestCaseExtractor,
  TestCaseExtractorContext,
} from './ReporterOptions';
import { asExtractor } from './asExtractor';

export function aggregateLabelCustomizers(
  labels: LabelsCustomizer | undefined,
): TestCaseExtractor<Label[]> | undefined {
  if (!labels || typeof labels === 'function') {
    return labels;
  }

  const extractors = Object.keys(labels).reduce((accumulator, key) => {
    const extractor = asExtractor(labels[key]) as LabelExtractor;
    if (extractor) {
      accumulator[key] = extractor;
    }
    return accumulator;
  }, {} as Record<string, LabelExtractor>);

  const names = Object.keys(extractors);

  return (context: TestCaseExtractorContext<Label[]>) => {
    const other: Label[] = [];
    const found = names.reduce((found, key) => {
      found[key] = [];
      return found;
    }, {} as Record<string, string[]>);

    if (context.value) {
      for (const label of context.value) {
        (found[label.name] ?? other).push(label.value);
      }
    }

    return [
      ...other,
      ...names.flatMap((name) => {
        const extractor = extractors[name]!;
        const value = asArray(
          extractor({ ...context, value: asArray(found[name]) }),
        );
        return value ? value.map((value) => ({ name, value } as Label)) : [];
      }),
    ];
  };
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
