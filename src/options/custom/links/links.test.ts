import type { LinksCustomizer } from 'jest-allure2-reporter';

import { links } from './links';

describe('links custom extractor', () => {
  it('should return undefined when customizer is null or undefined', () => {
    expect(links(null)).toBeUndefined();
    expect(links(void 0)).toBeUndefined();
  });

  it('should extract links from a keyed customizer', async () => {
    const customizer: LinksCustomizer<{}> = {
      undefined: undefined,
      null: null,
      issue: 'https://github.com/my-org/my-repo/issues/{{name}}',
      tms: ({ value }) =>
        value.map((link) => ({
          url: `https://tms.com/${link.name}`,
          name: link.name?.toUpperCase(),
          type: 'override-should-not-work',
        })),
      company: { url: 'https://example.com/company', name: 'Company' },
      extra: [
        { url: 'https://example.com/extra1', name: 'Extra1' },
        { url: 'https://example.com/extra2', name: 'Extra2' },
      ],
      createSync: () => ({ url: 'https://example.com/sync', name: 'Sync' }),
      createAsync: async () => ({ url: 'https://example.com/async', name: 'Async' }),
      append: async ({ value }) => [...value, { url: 'https://example.com/new', name: 'Append' }],
    };

    const extractor = links(customizer)!;
    const result = await extractor({
      value: [
        { type: 'issue', name: 'GITHUB-001', url: 'GITHUB-001' },
        { type: 'tms', name: 'Issue', url: '' },
        { type: 'append', name: 'Existing', url: 'https://example.com/existing' },
      ],
    });

    expect(result).toEqual([
      {
        type: 'issue',
        name: 'GITHUB-001',
        url: 'https://github.com/my-org/my-repo/issues/GITHUB-001',
      },
      { type: 'tms', name: 'ISSUE', url: 'https://tms.com/Issue' },
      {
        type: 'company',
        name: 'Company',
        url: 'https://example.com/company',
      },
      {
        type: 'extra',
        name: 'Extra1',
        url: 'https://example.com/extra1',
      },
      {
        type: 'extra',
        name: 'Extra2',
        url: 'https://example.com/extra2',
      },
      { url: 'https://example.com/sync', name: 'Sync', type: 'createSync' },
      { url: 'https://example.com/async', name: 'Async', type: 'createAsync' },
      { type: 'append', name: 'Existing', url: 'https://example.com/existing' },
      { type: 'append', name: 'Append', url: 'https://example.com/new' },
    ]);
  });

  it('should extract links from a keyed customizer with array values', async () => {
    const customizer: LinksCustomizer<{}> = [{ url: 'https://example.com/new', type: 'issue' }];

    const extractor = links(customizer)!;
    const result = await extractor({ value: [{ url: 'https://example.com/old', type: 'issue' }] });

    expect(result).toEqual([
      { url: 'https://example.com/old', type: 'issue' },
      { url: 'https://example.com/new', type: 'issue' },
    ]);
  });
});
