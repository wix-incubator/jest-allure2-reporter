const { describe, expect, test } = require('@jest/globals');

describe('Test suite', () => {
  $DisplayName('Custom "beforeEach" hook')
  beforeEach(() => {
    // Hooks can be renamed too
  });

  $DisplayName('1 + 1 = 2')
  test('First test', () => {
    expect(1 + 1).toBe(2);
  });

  $DisplayName('2 + 2 = 3')
  test('Second test', () => {
    expect(2 + 2).toBe(3);
  });
});
