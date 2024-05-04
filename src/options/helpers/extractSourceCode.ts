import type {
  AllureTestItemMetadata,
  ExtractSourceCodeHelperResult,
  KeyedHelperCustomizer,
} from 'jest-allure2-reporter';

import { log } from '../../logger';
import { defaults, isEmpty } from '../../utils';
import type { ReporterConfig } from '../types';

export const extractSourceCode: KeyedHelperCustomizer<'extractSourceCode'> = ({
  reporterConfig,
}) => {
  const config = reporterConfig as ReporterConfig;

  return async function extractSourceCodeHelper(
    item: AllureTestItemMetadata,
    includeComments = false,
  ): Promise<ExtractSourceCodeHelperResult | undefined> {
    let result: ExtractSourceCodeHelperResult = {};

    const context = item.sourceLocation;
    const plugins = config.sourceCode ? Object.values(config.sourceCode.plugins) : [];

    if (isEmpty(context)) {
      return undefined;
    }

    for (const p of plugins) {
      try {
        result = defaults(result, await p.extractSourceCode?.(context, includeComments));
      } catch (error: unknown) {
        log.warn(
          error,
          `Plugin "${p.name}" failed to extract source code for ${context.fileName}:${context.lineNumber}:${context.columnNumber}`,
        );
      }
      if (result?.code) {
        break;
      }
    }

    return isEmpty(result) ? undefined : result;
  };
};
