/* eslint-disable unicorn/no-array-reduce */
import type { Label } from '@noomorph/allure-js-commons';

import type {
  LabelsCustomizer,
  TestCaseExtractor,
  TestCaseExtractorContext,
} from './ReporterOptions';

export function aggregateLabelCustomizers(
  labels: LabelsCustomizer | undefined,
): TestCaseExtractor<Label[]> | undefined {
  if (!labels || typeof labels === 'function') {
    return labels;
  }

  const names = Object.keys(labels).filter(
    (key) => typeof labels[key] === 'function',
  );

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
        const extractor = labels[name];
        const value = asArray(extractor!({ ...context, value: found[name] }));
        return value.map((value) => ({ name, value } as Label));
      }),
    ];
  };
}

function asArray<T extends string>(value: T | T[] | undefined): T[] {
  if (Array.isArray(value)) {
    return value;
  }

  return value ? [value] : [];
}
