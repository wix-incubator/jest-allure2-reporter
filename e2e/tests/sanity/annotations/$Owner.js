const { describe, expect, test } = require('@jest/globals');

$Owner('John Doe');
describe('Suite maintained by John', () => {
  test('First test', () => {
    // John maintains this test
  });

  test('Second test', () => {
    // John maintains this test too
  });

  $Owner('Jane Doe')
  test('Third test', () => {
    // Unlike the other tests, Jane maintains this one
  });
});
