const { describe, expect, test } = require('@jest/globals');

allure.package('e2e.runtime');

describe('My service', () => {
  test('should log a message', () => {
    allure.testMethod('Alternative title for the test')
    // Open "Packages" view to see this test grouped under "e2e.runtime"
  });
});
