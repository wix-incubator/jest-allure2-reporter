jest.mock('../../../utils/importDefault', () => ({
  importDefault: (name: string) => Promise.resolve({ name }),
}));

import { resolvePlugin } from './resolvePlugin';

describe('resolvePlugin', () => {
  it('should resolve a plugin from a string', async () => {
    const [plugin] = await resolvePlugin('some-plugin');

    expect(plugin).toEqual({ name: 'some-plugin' });
  });

  it('should resolve a plugin with options from an array', async () => {
    const options = { someOption: 'value' };
    const [plugin, resolvedOptions] = await resolvePlugin(['some-plugin', options]);

    expect(plugin).toEqual({ name: 'some-plugin' });
    expect(resolvedOptions).toBe(options);
  });

  it('should resolve a plugin from a non-string value', async () => {
    const plugin = { someMethod: jest.fn() };
    const [resolvedPlugin] = await resolvePlugin(plugin);

    expect(resolvedPlugin).toBe(plugin);
  });
});
