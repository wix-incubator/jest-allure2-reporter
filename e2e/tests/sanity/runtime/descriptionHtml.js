allure.descriptionHtml('<h3>File-level description</h3>');

describe('suite', () => {
  allure.descriptionHtml('<h3>Suite-level description</h3>');

  test('should have a test-level description', () => {
    allure.descriptionHtml('<h3>Test-level description</h3>');
  });
});
