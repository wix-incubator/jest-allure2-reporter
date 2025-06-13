const { describe, expect, test } = require('@jest/globals');

test('should not have this name in the report', () => {
  // Override the default test name from Jest
  allure.displayName('should have a custom display name');
});
