import type {
  AllureTestItemMetadata,
  GlobalExtractorContext,
  SourceCodeExtractionContext,
} from 'jest-allure2-reporter';
import type { TestFileMetadata } from 'jest-metadata';

import { AllureMetadataProxy } from '../metadata';
import type { ReporterConfig } from '../options';

export async function postProcessMetadata(
  globalContext: GlobalExtractorContext,
  testFile: TestFileMetadata,
) {
  const config = globalContext.reporterConfig as ReporterConfig;
  if (!config.sourceCode.enabled) {
    return;
  }

  const allDescribeBlocks = [...testFile.allDescribeBlocks()];
  const allHooks = allDescribeBlocks.flatMap((describeBlock) => [
    ...describeBlock.hookDefinitions(),
  ]);

  const batch = [testFile, ...allDescribeBlocks, ...allHooks, ...testFile.allTestEntries()];

  await Promise.all(
    batch.map(async (metadata) => {
      const allureProxy = new AllureMetadataProxy<AllureTestItemMetadata>(metadata);
      const context: SourceCodeExtractionContext = {
        ...allureProxy.get('sourceLocation'),
        transformedCode: allureProxy.get('transformedCode'),
      };
      for (const p of config.sourceCode.plugins) {
        const docblock = await p.extractDocblock?.(context);
        if (docblock) {
          allureProxy.assign({ docblock });
          break;
        }
      }
    }),
  );
}
