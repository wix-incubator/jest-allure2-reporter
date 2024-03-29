import { parameters } from './parameters';

describe('parameters custom extractor', () => {
  it('should return a constant extractor when customizer is not an object', () => {
    const customizer = () => [{ name: 'param1', value: 'value1' }];
    const extractor = parameters(customizer)!;

    expect(extractor).toBeInstanceOf(Function);

    const context = { value: undefined as never };
    const result = extractor(context);

    expect(result).toEqual(customizer);
  });

  it('should return undefined when customizer is null or undefined', () => {
    expect(parameters(null)).toBeUndefined();
    expect(parameters(void 0)).toBeUndefined();
  });

  it('should extract parameters from a keyed customizer', async () => {
    const customizer = {
      param1: 'value1',
      param2: { value: 'value2', excluded: true },
      param3: () => 'value3',
      param4: async () => ({ value: 'value4', mode: 'hidden' }),
      param5: async ({ value }) => (await value) ?? 'fallback',
    };

    const extractor = parameters(customizer)!;
    const context = { value: [{ name: 'param5', value: 'original' }] };
    const result = await extractor(context);

    expect(result).toEqual([
      { name: 'param1', value: 'value1' },
      { name: 'param2', value: 'value2', excluded: true },
      { name: 'param3', value: 'value3' },
      { name: 'param4', value: 'value4', mode: 'hidden' },
      { name: 'param5', value: 'original' },
    ]);
  });

  it('should extract parameters from a keyed customizer with array values', async () => {
    const customizer = {
      param1: ['value1', 'value2'],
      param2: [{ value: 'value3' }, { value: 'value4', excluded: true }],
      param3: () => ['value5', { value: 'value6', mode: 'masked' }],
    };

    const extractor = parameters(customizer)!;
    const context = { value: [] };
    const result = await extractor(context);

    expect(result).toEqual([
      { name: 'param1', value: 'value1' },
      { name: 'param1', value: 'value2' },
      { name: 'param2', value: 'value3' },
      { name: 'param2', value: 'value4', excluded: true },
      { name: 'param3', value: 'value5' },
      { name: 'param3', value: 'value6', mode: 'masked' },
    ]);
  });

  it('should extract parameters from a keyed customizer and merge with existing parameters', async () => {
    const customizer = {
      param1: 'value1',
      param2: { value: 'value2', excluded: true },
    };

    const extractor = parameters(customizer)!;
    const context = {
      value: [
        { name: 'param2', value: 'original2' },
        { name: 'param3', value: 'value3' },
      ],
    };
    const result = await extractor(context);

    expect(result).toEqual([
      { name: 'param1', value: 'value1' },
      { name: 'param2', value: 'value2', excluded: true },
      { name: 'param3', value: 'value3' },
    ]);
  });

  it('should handle null or undefined values in the customizer', async () => {
    const customizer = {
      param1: null,
      param2: undefined,
      param3: () => null,
      param4: async () => void 0,
    };

    const extractor = parameters(customizer)!;
    const context = { value: [] };
    const result = await extractor(context);

    expect(result).toEqual([]);
  });
});
