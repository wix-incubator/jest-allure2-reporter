import type { PluginContext } from 'jest-allure2-reporter';

import * as plugins from '../../reporter-plugins';

export async function defaultPlugins(context: PluginContext) {
  return [
    plugins.fallback({}, context),
    plugins.detect({}, context),
    plugins.github({}, context),
    plugins.manifest({}, context),
    plugins.prettier({}, context),
    plugins.remark({}, context),
  ];
}
