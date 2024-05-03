import type {
  AllureTestItemMetadata,
  GlobalExtractorContext,
  SourceCodeExtractionContext,
} from 'jest-allure2-reporter';
import type { TestFileMetadata } from 'jest-metadata';

import { AllureMetadataProxy } from '../metadata';
import type { ReporterConfig } from '../options';
import { log } from '../logger';

export async function postProcessMetadata(
  globalContext: GlobalExtractorContext,
  testFile: TestFileMetadata,
) {
  const config = globalContext.reporterConfig as ReporterConfig;
  if (!config.sourceCode.enabled) {
    return;
  }

  const allDescribeBlocks = [...testFile.allDescribeBlocks()];
  const allHookDefinitions = allDescribeBlocks.flatMap((describeBlock) => [
    ...describeBlock.hookDefinitions(),
  ]);

  const batch = [
    testFile,
    ...allDescribeBlocks,
    ...allHookDefinitions,
    ...testFile.allTestEntries(),
    ...testFile.allTestInvocations(),
    ...testFile.allInvocations(),
  ];

  await Promise.all(
    batch.map(async (metadata) => {
      const allureProxy = new AllureMetadataProxy<AllureTestItemMetadata>(metadata);
      const context: SourceCodeExtractionContext = {
        ...allureProxy.get('sourceLocation'),
        transformedCode: allureProxy.get('transformedCode'),
      };
      for (const p of config.sourceCode.plugins) {
        try {
          const docblock = await p.extractDocblock?.(context);
          if (docblock) {
            allureProxy.assign({ docblock });
            break;
          }
        } catch (error: unknown) {
          log.warn(
            error,
            `Plugin "${p.name}" failed to extract docblock for ${context.fileName}:${context.lineNumber}:${context.columnNumber}`,
          );
        }
      }
    }),
  );
}
