const { describe, expect, test } = require('@jest/globals');

$Package('e2e.annotations')
describe('My service', () => {

  $TestMethod('Alternative title for the test')
  test('should log a message', () => {
    // Open "Packages" view to see this test grouped under "e2e.annotations"
  });
});
