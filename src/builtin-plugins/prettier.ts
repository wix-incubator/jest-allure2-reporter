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

  function formatCode(
    code: string | string[] | undefined,
  ): undefined | Promise<string[]> {
    if (!code) {
      return;
    }

    return Array.isArray(code)
      ? Promise.all(
          code.map((fragment) => {
            const trimmed = fragment.trim();
            return prettier
              .format(trimmed, prettierConfig)
              .catch((error: unknown) => {
                throw error;
              });
          }),
        )
      : formatCode([code]);
  }

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
      context.testCaseMetadata.code = await formatCode(
        context.testCaseMetadata.code,
      );
    },
  };

  return plugin;
};
