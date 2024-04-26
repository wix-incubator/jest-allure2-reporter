describe('Test suite', () => {
  allure.severity('critical');

  test('Important test 1', () => {
    expect(1 + 1).toBe(2);
  });

  test('Important test 2', () => {
    expect(2 + 2).toBe(4);
  });

  test('Unimportant test', () => {
    allure.severity('trivial');

    expect(true).toBe(true);
  });
});
