import type { LinksCustomizer } from 'jest-allure2-reporter';

import { links } from './links';

describe('links custom extractor', () => {
  it('should return a constant extractor when customizer is a function', () => {
    const customizer = () => [{ name: 'link1', url: 'https://example.com' }];
    const extractor = links(customizer)!;

    expect(extractor).toBeInstanceOf(Function);

    const context = { value: undefined as never };
    const result = extractor(context);

    expect(result).toEqual(customizer());
  });

  it('should return undefined when customizer is null or undefined', () => {
    expect(links(null)).toBeUndefined();
    expect(links(void 0)).toBeUndefined();
  });

  it('should extract links from a keyed customizer', async () => {
    const customizer: LinksCustomizer<{}> = {
      link1: 'https://example.com/1',
      link2: { url: 'https://example.com/2', type: 'issue' },
      link3: () => 'https://example.com/3',
      link4: async () => ({ url: 'https://example.com/4', type: 'tms' }),
      link5: async ({ value }) => (await value) ?? 'https://example.com/fallback',
    };

    const extractor = links(customizer)!;
    const context = { value: [{ name: 'link5', url: 'https://example.com/original' }] };
    const result = await extractor(context);

    expect(result).toEqual([
      { name: 'link1', url: 'https://example.com/1' },
      { name: 'link2', url: 'https://example.com/2', type: 'issue' },
      { name: 'link3', url: 'https://example.com/3' },
      { name: 'link4', url: 'https://example.com/4', type: 'tms' },
      { name: 'link5', url: 'https://example.com/original' },
    ]);
  });

  it('should extract links from a keyed customizer with array values', async () => {
    const customizer: LinksCustomizer<{}> = {
      link3: () => ['https://example.com/5', { url: 'https://example.com/6', type: 'issue' }],
    };

    const extractor = links(customizer)!;
    const context = { value: [] };
    const result = await extractor(context);

    expect(result).toEqual([
      { name: 'link3', url: 'https://example.com/5' },
      { name: 'link3', url: 'https://example.com/6', type: 'issue' },
    ]);
  });

  it('should extract links from a keyed customizer and merge with existing links', async () => {
    const customizer = {
      link1: 'https://example.com/1',
      link2: { url: 'https://example.com/2', type: 'issue' },
    };

    const extractor = links(customizer)!;
    const context = {
      value: [
        { name: 'link2', url: 'https://example.com/original2' },
        { name: 'link3', url: 'https://example.com/3' },
      ],
    };
    const result = await extractor(context);

    expect(result).toEqual([
      { name: 'link1', url: 'https://example.com/1' },
      { name: 'link2', url: 'https://example.com/2', type: 'issue' },
      { name: 'link3', url: 'https://example.com/3' },
    ]);
  });

  it('should handle null or undefined values in the customizer', async () => {
    const customizer = {
      link1: null,
      link2: undefined,
      link3: () => null,
      link4: async () => void 0,
    };

    const extractor = links(customizer)!;
    const context = { value: [] };
    const result = await extractor(context);

    expect(result).toEqual([]);
  });

  it('should append links when customizer is an array', async () => {
    const customizer: LinksCustomizer<{}> = [
      { name: 'link1', url: 'https://example.com/1' },
      () => ({ name: 'link2', url: 'https://example.com/2' }),
    ];

    const extractor = links(customizer)!;
    const context = { value: [{ name: 'link3', url: 'https://example.com/3' }] };
    const result = await extractor(context);

    expect(result).toEqual([
      { name: 'link3', url: 'https://example.com/3' },
      { name: 'link1', url: 'https://example.com/1' },
      { name: 'link2', url: 'https://example.com/2' },
    ]);
  });

  it('should format link URLs using util.format', async () => {
    const customizer: LinksCustomizer<{}> = {
      issue: 'https://example.com/issues/%s',
    };

    const extractor = links(customizer)!;
    const context = { value: [] };
    const result = await extractor(context);

    expect(result).toEqual([
      { name: 'issue', url: 'https://example.com/issues/issue' },
    ]);
  });
});
