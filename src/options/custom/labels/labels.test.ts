import type { LabelsCustomizer } from 'jest-allure2-reporter';

import { labels } from './labels';

describe('labels custom extractor', () => {
  it('should return a constant extractor when customizer is a function', () => {
    const customizer = () => [{ name: 'label1', value: 'value1' }];
    const extractor = labels(customizer)!;

    expect(extractor).toBeInstanceOf(Function);

    const context = { value: undefined as never };
    const result = extractor(context);

    expect(result).toEqual(customizer());
  });

  it('should return undefined when customizer is null or undefined', () => {
    expect(labels(null)).toBeUndefined();
    expect(labels(void 0)).toBeUndefined();
  });

  it('should extract labels from a keyed customizer', async () => {
    const customizer: LabelsCustomizer<{}> = {
      label1: 'value1',
      label2: () => 'value2',
      label3: async () => 'value3',
      label4: async ({ value }) => (await value) ?? 'fallback',
    };

    const extractor = labels(customizer)!;
    const context = { value: [{ name: 'label4', value: 'original' }] };
    const result = await extractor(context);

    expect(result).toEqual([
      { name: 'label1', value: 'value1' },
      { name: 'label2', value: 'value2' },
      { name: 'label3', value: 'value3' },
      { name: 'label4', value: 'original' },
    ]);
  });

  it('should extract labels from a keyed customizer with array values', async () => {
    const customizer: LabelsCustomizer<{}> = {
      label2: () => ['value4', 'value5'],
    };

    const extractor = labels(customizer)!;
    const context = { value: [] };
    const result = await extractor(context);

    expect(result).toEqual([
      { name: 'label2', value: 'value4' },
      { name: 'label2', value: 'value5' },
    ]);
  });

  it('should extract labels from a keyed customizer and merge with existing labels', async () => {
    const customizer = {
      label1: 'value1',
      label2: 'value2',
    };

    const extractor = labels(customizer)!;
    const context = {
      value: [
        { name: 'label2', value: 'original2' },
        { name: 'label3', value: 'value3' },
      ],
    };
    const result = await extractor(context);

    expect(result).toEqual([
      { name: 'label1', value: 'value1' },
      { name: 'label2', value: 'value2' },
      { name: 'label3', value: 'value3' },
    ]);
  });

  it('should handle null or undefined values in the customizer', async () => {
    const customizer = {
      label1: null,
      label2: undefined,
      label3: () => [],
      label4: async () => [],
    };

    const extractor = labels(customizer);
    const context = { value: [] };
    const result = await extractor(context);

    expect(result).toEqual([]);
  });

  it('should append labels when customizer is an array', async () => {
    const customizer: LabelsCustomizer<{}> = [
      { name: 'label1', value: 'value1' },
      { name: 'label2', value: 'value2' },
    ];

    const extractor = labels(customizer)!;
    const context = { value: [{ name: 'label3', value: 'value3' }] };
    const result = await extractor(context);

    expect(result).toEqual([
      { name: 'label3', value: 'value3' },
      { name: 'label1', value: 'value1' },
      { name: 'label2', value: 'value2' },
    ]);
  });
});
