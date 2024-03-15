/// <reference path="../augs.d.ts" />

import type {
  AllureTestItemSourceLocation,
  AllureNestedTestStepMetadata,
  CodeExtractorResult,
  Plugin,
  PluginConstructor,
} from 'jest-allure2-reporter';

import {
  ensureTypeScriptAST,
  extractTypeScriptCode,
  FileNavigatorCache,
  importTypeScript,
} from '../utils';

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

  const promiseCache = new WeakMap<
    AllureTestItemSourceLocation,
    Promise<CodeExtractorResult | undefined>
  >();
  const cache = new WeakMap<
    AllureTestItemSourceLocation,
    CodeExtractorResult
  >();
  const extractAndCache = async (
    sourceLocation: AllureTestItemSourceLocation | undefined,
  ) => {
    if (!sourceLocation?.fileName) {
      return;
    }

    await FileNavigatorCache.instance.resolve(sourceLocation.fileName);
    const language = detectSourceLanguage(sourceLocation.fileName);
    if ((language === 'typescript' || language === 'javascript') && ts) {
      const ast = await ensureTypeScriptAST(ts, sourceLocation.fileName);
      const location = [
        sourceLocation.lineNumber,
        sourceLocation.columnNumber,
      ] as const;
      const code = await extractTypeScriptCode(ts, ast, location);
      if (code) {
        cache.set(sourceLocation, {
          code,
          language,
          ast,
        });
      }
    }

    return cache.get(sourceLocation);
  };

  const plugin: Plugin = {
    name: 'jest-allure2-reporter/plugins/source-code',

    async helpers($) {
      const extractSourceCode = (metadata: {
        sourceLocation?: AllureTestItemSourceLocation;
      }) => {
        return metadata.sourceLocation
          ? cache.get(metadata.sourceLocation)
          : undefined;
      };

      $.extractSourceCode = extractSourceCode;

      $.extractSourceCodeAsync = async (metadata) => {
        if (!metadata.sourceLocation) {
          return;
        }

        if (!promiseCache.has(metadata.sourceLocation)) {
          promiseCache.set(
            metadata.sourceLocation,
            extractAndCache(metadata.sourceLocation),
          );
        }

        return promiseCache.get(metadata.sourceLocation);
      };

      $.extractSourceCodeWithSteps = (metadata) => {
        const test = extractSourceCode(metadata);
        const before =
          metadata.steps?.filter(isBeforeHook)?.map(extractSourceCode) ?? [];
        const after =
          metadata.steps?.filter(isAfterHook)?.map(extractSourceCode) ?? [];

        return [...before, test, ...after].filter(isDefined);
      };
    },

    async rawMetadata(context) {
      await context.$.extractSourceCodeAsync(context.metadata);
    },
  };

  return plugin;
};
