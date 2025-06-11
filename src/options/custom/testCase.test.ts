import { describe, expect, jest, test } from '@jest/globals';
import type { AllureTestCaseResult } from 'jest-allure2-reporter';

import { testCase as testCaseCustomizer } from './testCase';
import { createTestCaseContext } from './__utils__/contexts';

describe('testCase', () => {
  test.each`
    property             | defaultValue   | extractedValue
    ${'ignored'}         | ${false}       | ${false}
    ${'displayName'}     | ${''}          | ${'Custom Test Case'}
    ${'fullName'}        | ${''}          | ${'Custom Full Name'}
    ${'historyId'}       | ${''}          | ${'custom-history-id'}
    ${'start'}           | ${Number.NaN}  | ${1_234_567_890}
    ${'stop'}            | ${Number.NaN}  | ${1_234_567_899}
    ${'stage'}           | ${'scheduled'} | ${'running'}
    ${'status'}          | ${'unknown'}   | ${'passed'}
    ${'statusDetails'}   | ${{}}          | ${{ message: 'Test case passed' }}
    ${'labels'}          | ${[]}          | ${[{ name: 'label1', value: 'value1' }, { name: 'label2', value: 'value2' }]}
    ${'links'}           | ${[]}          | ${[{ url: 'https://example.com', type: 'issue' }]}
    ${'attachments'}     | ${[]}          | ${[{ name: 'attachment1' }, { name: 'attachment2' }]}
    ${'parameters'}      | ${[]}          | ${[{ name: 'param1', value: 'value1' }, { name: 'param2', value: 'value2' }]}
    ${'description'}     | ${''}          | ${'Custom description'}
    ${'descriptionHtml'} | ${''}          | ${'<p>Custom description</p>'}
  `(
    'should extract $property with default value $defaultValue and extracted value $extractedValue',
    async (options) => {
      const { property: _property, defaultValue, extractedValue } = options;
      const property = _property as keyof AllureTestCaseResult;
      const extractor = jest.fn<any>().mockResolvedValue(extractedValue);
      const testCase = testCaseCustomizer({ [property]: extractor });
      const result = testCase(createTestCaseContext({ [property]: defaultValue }));

      await expect(result?.[property]).resolves.toEqual(extractedValue);

      expect(extractor).toHaveBeenCalledWith(
        expect.objectContaining({
          value: defaultValue,
          result: expect.any(Object),
        }),
      );
    },
  );
});
