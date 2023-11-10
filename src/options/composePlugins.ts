import type { Plugin } from 'jest-allure2-reporter';

export async function composePlugins(
  basePromise: Promise<Plugin[]>,
  customPromise: Promise<Plugin[]>,
): Promise<Plugin[]> {
  const [base, custom] = await Promise.all([basePromise, customPromise]);

  const result: Plugin[] = [];
  const indices: Record<string, number> = {};

  // eslint-disable-next-line unicorn/prefer-spread
  for (const plugin of base.concat(custom)) {
    const index = indices[plugin.name];
    if (index === undefined) {
      indices[plugin.name] = result.push(plugin) - 1;
    } else {
      const previous = result[index];
      const extended = plugin?.extend?.(previous) ?? plugin;
      result[index] = extended;
    }
  }

  return result;
}
