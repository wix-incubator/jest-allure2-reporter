const { describe, expect, test } = require('@jest/globals');

allure.description('### File-level description');

describe('suite', () => {
  allure.description('### Suite-level description');

  test('should have a test-level description', () => {
    allure.description('### Test-level description');
  });
});
