import type { TestCaseExtractorContext } from 'jest-allure2-reporter';

import type { TestCaseExtractor, TestStepExtractor } from '../types';
// import {novalue} from "../extractors";
// import {isNonNullish} from "../../utils";

export function testCaseSteps<
  Context extends Partial<TestCaseExtractorContext>,
>(
  _testStep: TestStepExtractor<Context>,
  _metadataKey?: 'testCaseMetadata' | 'testFileMetadata' | 'testRunMetadata',
): TestCaseExtractor<Context> {
  // const steps: AllureNestedTestStepMetadata[] | undefined = metadataKey
  //   ? context[metadataKey]?.steps
  //   : undefined;
  //
  // if (steps && steps.length > 0) {
  //   const allSteps = await Promise.all(
  //     steps.map(async (testStepMetadata) =>
  //       testStep({
  //         ...context,
  //         testStepMetadata,
  //         value: novalue(),
  //         result: {},
  //       } as PropertyExtractorContext<TestStepExtractorContext, never>),
  //     ),
  //   );
  //
  //   result.steps = allSteps.filter(isNonNullish);
  // }

  const extractor: TestCaseExtractor<Context> = async (context) => {
  };

  return extractor;
}
