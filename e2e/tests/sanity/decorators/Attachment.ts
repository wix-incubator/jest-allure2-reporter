const { describe, expect, test } = require('@jest/globals');
import { Attachment } from 'jest-allure2-reporter/api';

describe('Attachment', () => {
  class HtmlGenerator {
    @Attachment('Say: {{0}}', 'text/html')
    static say(message: string) {
      return `<h1>${message}</h1>`;
    }
  }

  /**
   * Verifies that the return value of the decorated method is not affected.
   * Besides, the HTML attachment should be added to the test case.
   */
  test('should attach HTML via a decorator', () => {
    expect(HtmlGenerator.say('Hello, world!')).toBe('<h1>Hello, world!</h1>');
  });
});
