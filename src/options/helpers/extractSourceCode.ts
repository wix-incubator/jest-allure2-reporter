import type {
  AllureTestItemMetadata,
  AllureNestedTestStepMetadata,
  ExtractSourceCodeHelperResult,
  KeyedHelperCustomizer,
  ExtractSourceCodeHelper,
} from 'jest-allure2-reporter';

import { log } from '../../logger';
import { compactArray, defaults, isEmpty } from '../../utils';
import type { ReporterConfig } from '../types';

export const extractSourceCode: KeyedHelperCustomizer<'extractSourceCode'> = ({
  reporterConfig,
}): ExtractSourceCodeHelper => {
  const config = reporterConfig as ReporterConfig;

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
    let result: ExtractSourceCodeHelperResult = {};

    const context = { ...item.sourceLocation, transformedCode: item.transformedCode };
    const plugins = config.sourceCode ? Object.values(config.sourceCode.plugins) : [];

    log.trace(context, 'Extracting source code');
    for (const p of plugins) {
      try {
        result = defaults(result, await p.extractSourceCode?.(context));
      } catch (error: unknown) {
        log.warn(
          error,
          `Plugin "${p.name}" failed to extract source code for ${context.fileName}:${context.lineNumber}:${context.columnNumber}`,
        );
      }
      if (result.code) {
        break;
      }
    }

    return isEmpty(result) ? undefined : result;
  }

  function extractSourceCodeHelper(item: AllureTestItemMetadata, recursive?: boolean): any {
    return recursive ? extractRecursively(item) : extractSingle(item);
  }

  return extractSourceCodeHelper;
};

function isBefore(step: AllureNestedTestStepMetadata): boolean {
  return step.hookType === 'beforeAll' || step.hookType === 'beforeEach';
}

function isAfter(step: AllureNestedTestStepMetadata): boolean {
  return step.hookType === 'afterAll' || step.hookType === 'afterEach';
}
