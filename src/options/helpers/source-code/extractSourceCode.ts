import type {
  AllureTestItemMetadata,
  AllureNestedTestStepMetadata,
  ExtractSourceCodeHelperResult,
  KeyedHelperCustomizer,
} from 'jest-allure2-reporter';

import { log } from '../../../logger';
import { compactArray } from '../../../utils';

export const extractSourceCode: KeyedHelperCustomizer<'extractSourceCode'> = ({ config }): any => {
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
    const sourceLocation = item.sourceLocation;
    if (config.sourceCode?.enabled && sourceLocation) {
      for (const p of config.sourceCode.plugins) {
        try {
          code = await p.extractSourceCode?.(sourceLocation);
        } catch (error: unknown) {
          log.warn(
            error,
            `Failed to extract source code for ${sourceLocation.fileName}:${sourceLocation.lineNumber}:${sourceLocation.columnNumber}`,
          );
        }
        if (code) {
          break;
        }
      }
    }

    return code && sourceLocation
      ? {
          code,
          language: 'typescript',
          fileName: sourceLocation.fileName!,
          lineNumber: sourceLocation.lineNumber!,
          columnNumber: sourceLocation.columnNumber!,
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
