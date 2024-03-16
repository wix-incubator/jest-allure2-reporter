/// <reference path="../augs.d.ts" />

import type { ExtractorHelperSourceCode } from 'jest-allure2-reporter';
import type {
  AllureTestItemSourceLocation,
  AllureNestedTestStepMetadata,
  Plugin,
  PluginConstructor,
} from 'jest-allure2-reporter';

import { weakMemoize } from '../../utils';

import {
  extractTypescriptAST,
  extractTypeScriptCode,
  FileNavigatorCache,
  importTypeScript,
} from './utils';
import { detectSourceLanguage } from './detectSourceLanguage';

function isBeforeHook({ hookType }: AllureNestedTestStepMetadata) {
  return hookType === 'beforeAll' || hookType === 'beforeEach';
}

function isAfterHook({ hookType }: AllureNestedTestStepMetadata) {
  return hookType === 'afterAll' || hookType === 'afterEach';
}

function isDefined<T>(value: T | undefined): value is T {
  return value !== undefined;
}

export const sourceCodePlugin: PluginConstructor = async () => {
  const ts = await importTypeScript();

  async function doExtract(
    sourceLocation: AllureTestItemSourceLocation | undefined,
  ): Promise<ExtractorHelperSourceCode | undefined> {
    if (!sourceLocation?.fileName) {
      return;
    }

    await FileNavigatorCache.instance.resolve(sourceLocation.fileName);
    const language = detectSourceLanguage(sourceLocation.fileName);
    if ((language === 'typescript' || language === 'javascript') && ts) {
      const ast = await extractTypescriptAST(ts, sourceLocation.fileName);
      const location = [
        sourceLocation.lineNumber,
        sourceLocation.columnNumber,
      ] as const;
      const code = await extractTypeScriptCode(ts, ast, location);
      if (code) {
        return {
          code,
          language,
          fileName: sourceLocation.fileName,
        };
      }
    }

    return;
  }

  const plugin: Plugin = {
    name: 'jest-allure2-reporter/plugins/source-code',

    async helpers($) {
      const extractSourceCode = weakMemoize(async (metadata) => {
        return doExtract(metadata.sourceLocation);
      });

      const extractSourceCodeWithSteps = weakMemoize(async (metadata) => {
        const test = await doExtract(metadata);
        const before =
          metadata.steps?.filter(isBeforeHook)?.map(doExtract) ?? [];
        const after = metadata.steps?.filter(isAfterHook)?.map(doExtract) ?? [];

        return [...before, test, ...after].filter(isDefined);
      });

      Object.assign($, {
        extractSourceCode,
        extractSourceCodeWithSteps,
      });
    },

    async postProcessMetadata(context) {
      await context.$.extractSourceCode(context.metadata);
    },
  };

  return plugin;
};
