/**
 * @owner John Doe
 */

const { describe, expect, test } = require('@jest/globals');

describe('Suite maintained by John', () => {
  test('First test', () => {
    // John maintains this test
  });

  test('Second test', () => {
    // John maintains this test too
  });

  /**
   * @owner Jane Doe
   */
  test('Third test', () => {
    // Unlike the other tests, Jane maintains this one
  });
});
