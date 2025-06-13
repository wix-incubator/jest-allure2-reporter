const { describe, expect, test } = require('@jest/globals');

$Tag('dsl', 'arithmetic');
describe('Test suite', () => {
  $Tag('addition')
  test('First test', () => {
    expect(1 + 1).toBe(2);
  });

  $Tag('division')
  test('Second test', () => {
    expect(3 / 2).toBe(1.5);
  });
});
