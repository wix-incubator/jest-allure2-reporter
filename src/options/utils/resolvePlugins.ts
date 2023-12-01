import type {
  Plugin,
  PluginConstructor,
  PluginReference,
  PluginDeclaration,
  PluginContext,
} from 'jest-allure2-reporter';

export function resolvePlugins(
  context: PluginContext,
  plugins: PluginDeclaration[] | undefined,
): Promise<Plugin[]> {
  if (!plugins) {
    return Promise.resolve([]);
  }

  const promises = plugins.map((plugin) => {
    return Array.isArray(plugin)
      ? resolvePlugin(context, plugin[0], plugin[1])
      : resolvePlugin(context, plugin, {});
  });

  return Promise.all(promises);
}

async function resolvePlugin(
  context: PluginContext,
  reference: PluginReference,
  options: Record<string, unknown>,
): Promise<Plugin> {
  let createPlugin: PluginConstructor;

  if (typeof reference === 'string') {
    const rootDirectory = context.globalConfig.rootDir;
    const resolved = require.resolve(reference, { paths: [rootDirectory] });
    createPlugin = await import(resolved);
  } else {
    createPlugin = reference;
  }

  return createPlugin(options, context);
}
