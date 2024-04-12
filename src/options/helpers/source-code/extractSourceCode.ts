import type {
  AllureTestItemMetadata,
  AllureNestedTestStepMetadata,
  ExtractSourceCodeHelperResult,
  KeyedHelperCustomizer,
} from 'jest-allure2-reporter';

import { log } from '../../../logger';
import { compactArray } from '../../../utils';
import type { ReporterFinalConfig } from '../../types';

export const extractSourceCode: KeyedHelperCustomizer<'extractSourceCode'> = ({
  reporterConfig,
}): any => {
  const config = reporterConfig as ReporterFinalConfig;

  async function extractRecursively(
    item: AllureTestItemMetadata,
  ): Promise<ExtractSourceCodeHelperResult[]> {
    const steps = item.steps || [];
    const before = steps.filter(isBefore);
    const after = steps.filter(isAfter);
    const data = [...before, item, ...after];
    const result = await Promise.all(data.map(extractSingle));
    return compactArray(result);
  }

  async function extractSingle(
    item: AllureTestItemMetadata,
  ): Promise<ExtractSourceCodeHelperResult | undefined> {
    let code: string | undefined;
    let language: string | undefined;

    const context = { ...item.sourceLocation, transformedCode: item.transformedCode };
    const plugins = config.sourceCode ? Object.values(config.sourceCode.plugins) : [];

    log.trace(context, 'Extracting source code');
    for (const p of plugins) {
      try {
        language ??= await p.detectLanguage?.(context);
        code ??= await p.extractSourceCode?.(context);
      } catch (error: unknown) {
        log.warn(
          error,
          `Plugin "${p.name}" failed to extract source code for ${context.fileName}:${context.lineNumber}:${context.columnNumber}`,
        );
      }
      if (language && code) {
        break;
      }
    }

    return code
      ? {
          code,
          language,
          fileName: context.fileName,
          lineNumber: context.lineNumber,
          columnNumber: context.columnNumber,
        }
      : undefined;
  }

  return (item: AllureTestItemMetadata, recursive: boolean) =>
    recursive ? extractRecursively(item) : extractSingle(item);
};

function isBefore(step: AllureNestedTestStepMetadata): boolean {
  return step.hookType === 'beforeAll' || step.hookType === 'beforeEach';
}

function isAfter(step: AllureNestedTestStepMetadata): boolean {
  return step.hookType === 'afterAll' || step.hookType === 'afterEach';
}