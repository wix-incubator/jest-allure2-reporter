describe('Test suite', () => {
  test('First test', () => {
    allure.fullName('Arithmetic > Addition > Valid assertion');
    expect(1 + 1).toBe(2);
  });

  test('Second test', () => {
    allure.fullName('Arithmetic > Addition > Invalid assertion');
    expect(2 + 2).toBe(3);
  });
});
