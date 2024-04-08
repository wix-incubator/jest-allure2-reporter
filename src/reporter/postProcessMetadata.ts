import type { AllureTestItemMetadata, Helpers } from 'jest-allure2-reporter';
import type { TestFileMetadata } from 'jest-metadata';

import { AllureMetadataProxy } from '../metadata';

export async function postProcessMetadata($: Helpers, testFile: TestFileMetadata) {
  const allDescribeBlocks = [...testFile.allDescribeBlocks()];
  const allHooks = allDescribeBlocks.flatMap((describeBlock) => [
    ...describeBlock.hookDefinitions(),
  ]);

  const batch = [testFile, ...allDescribeBlocks, ...allHooks, ...testFile.allTestEntries()];

  await Promise.all(
    batch.map(async (metadata) => {
      const allureProxy = new AllureMetadataProxy<AllureTestItemMetadata>(metadata);
      // Cache source code for each test item
      return $.extractSourceCode(allureProxy.get() ?? {});
    }),
  );
}
