const { describe, expect, test } = require('@jest/globals');

$Description('### Suite-level description')
describe('Test suite', () => {
  $Description('Demonstrates a **passing** test case')
  test('First test', () => {
    expect(1 + 1).toBe(2);
  });

  $Description('Demonstrates a **failing** test case')
  test('Second test', () => {
    expect(2 + 2).toBe(3);
  });
});
