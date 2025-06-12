const { describe, expect, test } = require('@jest/globals');

test('should wrap a function with automatic step reporting', async () => {
  const factorial = allure.createStep('{{n}}!', ['n'], (n) => n === 0 ? 1 : n * factorial(n - 1));
  expect(factorial(3)).toBe(6);
});
