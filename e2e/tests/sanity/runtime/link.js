describe('Arithmetics', () => {
  allure.link('https://en.wikipedia.org/wiki/Arithmetic', '🔢 Arithmetic')

  test('1 + 1 = 2', () => {
    allure.link('https://en.wikipedia.org/wiki/Addition', '➕ Addition')
    expect(1 + 1).toBe(2);
  });

  test('3 / 2 = 1.5', () => {
    allure.link('https://en.wikipedia.org/wiki/Division_(mathematics)', '➗ Division')
    expect(3 / 2).toBe(1.5);
  });
});
