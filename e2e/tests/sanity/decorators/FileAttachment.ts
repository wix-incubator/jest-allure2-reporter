import path from 'node:path';

import { FileAttachment } from 'jest-allure2-reporter/api';

describe('FileAttachment', () => {
  class SourceCodeAttacher {
    @FileAttachment('{{0}}', 'text/plain')
    static file(name: string) {
      return path.join(__dirname, name);
    }
  }

  /**
   * Verifies that the return value of the decorated method is not affected.
   * Besides, the file attachment should be added to the test case.
   */
  test('should attach the file itself via a decorator', () => {
    expect(SourceCodeAttacher.file('FileAttachment.ts')).toBe(__filename);
  });
});
