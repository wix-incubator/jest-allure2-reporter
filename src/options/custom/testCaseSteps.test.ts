import { testCaseSteps } from './testCaseSteps';
import { createTestCaseContext } from './__utils__/contexts';

describe('testCaseSteps', () => {
  it('should extract nested steps', async () => {
    let counter = 0;
    const testStep = jest.fn().mockImplementation(() => ({
      displayName: `Step ${++counter}`,
    }));

    const testCase = testCaseSteps(testStep, 'testCaseMetadata');
    const context = createTestCaseContext();
    context.testCaseMetadata.steps = [{}, {}];

    const result = testCase(context);
    if (Array.isArray(result?.steps)) {
      expect(result?.steps).toHaveLength(2);
      expect(result?.steps?.[0]?.displayName).toBe('Step 1');
      expect(result?.steps?.[1]?.displayName).toBe('Step 2');
    } else {
      expect(result?.steps).toBeInstanceOf(Array);
    }

    expect(testStep).toHaveBeenCalledTimes(2);
  });
});
