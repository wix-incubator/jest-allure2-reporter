describe('Test suite', () => {
  allure.tags('dsl', 'arithmetic');

  test('First test', () => {
    allure.tag('addition');
    expect(1 + 1).toBe(2);
  });

  test('Second test', () => {
    allure.tag('division');
    expect(3 / 2).toBe(1.5);
  });
});
