import type { PluginContext } from 'jest-allure2-reporter';

import * as plugins from '../../reporter-plugins';

export async function defaultPlugins(context: PluginContext) {
  return await Promise.all([
    plugins.fallback({}, context),
    plugins.github({}, context),
    plugins.manifest({}, context),
    plugins.remark({}, context),
    plugins.sourceCode({}, context),
    plugins.docblock({}, context),
  ]);
}
