const { describe, expect, test } = require('@jest/globals');

allure.epic('Arithmetic operations');
allure.feature('Addition');

describe('Test suite', () => {
  test('First test', () => {
    allure.story('Sane assumptions');

    expect(1 + 1).toBe(2);
  });

  test('Second test', () => {
    allure.story('Insane assumptions');

    expect(2 + 2).toBe(3);
  });
});
