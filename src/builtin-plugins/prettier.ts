/// <reference path="augs.d.ts" />

import type { Plugin, PluginConstructor } from 'jest-allure2-reporter';
import type { Options } from 'prettier';

export const prettierPlugin: PluginConstructor = (
  overrides,
  { globalConfig },
) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const prettier = require('prettier');
  let prettierConfig: Options;

  const plugin: Plugin = {
    name: 'jest-allure2-reporter/plugins/prettier',
    async globalContext() {
      prettierConfig = {
        parser: 'acorn',
        ...(await prettier.resolveConfig(globalConfig.rootDir)),
        ...overrides,
      };
    },
    async testCaseContext(context) {
      const code = context.testCaseMetadata.sourceCode;
      if (code) {
        context.testCaseMetadata.sourceCode = await prettier.format(
          code.trim(),
          prettierConfig,
        );
      }
    },
    async testStepContext(context) {
      const code = context.testStepMetadata.sourceCode;
      if (code) {
        context.testStepMetadata.sourceCode = await prettier.format(
          code.trim(),
          prettierConfig,
        );
      }
    },
  };

  return plugin;
};
