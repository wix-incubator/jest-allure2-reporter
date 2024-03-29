// import { testCaseSteps } from './testCaseSteps';
// import type {TestStepExtractor} from "../types";

describe('testCaseSteps', () => {
  // it('should extract nested steps', async () => {
  //   let counter = 0;
  //   const testStep = jest.fn().mockImplementation(() => ({
  //     displayName: `Step ${++counter}`,
  //   }));
  //
  //   const testCase = testCaseSteps(defaultTestCaseExtractor, testStep);
  //
  //   const context = createContext();
  //   context.testCaseMetadata.steps = [{}, {}];
  //
  //   const result = await testCase(context);
  //
  //   expect(testStep).toHaveBeenCalledTimes(2);
  //   expect(result?.steps).toHaveLength(2);
  //   expect(result?.steps?.[0]?.displayName).toBe('Step 1');
  //   expect(result?.steps?.[1]?.displayName).toBe('Step 2');
  // });
});

// function createTestStepExtractor(): TestStepExtractor<TestStepExtractorContext> {
//   let counter = 0;
//   return jest.fn().mockImplementation(() => ({
//     displayName: `Step ${++counter}`,
//   }));
// }
