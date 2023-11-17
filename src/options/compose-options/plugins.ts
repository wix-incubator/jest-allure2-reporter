import type {
  Plugin,
  PluginContext,
  PluginDeclaration,
} from 'jest-allure2-reporter';

import { resolvePlugins } from '../utils';

export async function composePlugins(
  context: PluginContext,
  basePlugins: Promise<Plugin[]>,
  customPlugins: PluginDeclaration[] | undefined,
): Promise<Plugin[]> {
  if (!customPlugins) {
    return basePlugins;
  }

  const [base, custom] = await Promise.all([
    basePlugins,
    resolvePlugins(context, customPlugins),
  ]);

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
