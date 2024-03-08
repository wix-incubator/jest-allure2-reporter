/// <reference path="augs.d.ts" />

import path from 'node:path';

import type { Plugin, PluginConstructor } from 'jest-allure2-reporter';

export const detectPlugin: PluginConstructor = () => {
  const plugin: Plugin = {
    name: 'jest-allure2-reporter/plugins/detect',
    async globalContext(context) {
      context.detectLanguage = (filePath) => {
        switch (path.extname(filePath)) {
          case '.js':
          case '.jsx':
          case '.cjs':
          case '.mjs': {
            return 'javascript';
          }
          case '.ts':
          case '.tsx':
          case '.cts':
          case '.mts': {
            return 'typescript';
          }
          default: {
            return '';
          }
        }
      };
    },
  };

  return plugin;
};
