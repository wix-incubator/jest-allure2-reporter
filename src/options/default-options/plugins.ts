import type { PluginContext } from 'jest-allure2-reporter';

import * as plugins from '../../builtin-plugins';

export async function defaultPlugins(context: PluginContext) {
  return [
    plugins.detect({}, context),
    plugins.docblock({}, context),
    plugins.manifest({}, context),
    plugins.prettier({}, context),
    plugins.remark({}, context),
  ];
}
