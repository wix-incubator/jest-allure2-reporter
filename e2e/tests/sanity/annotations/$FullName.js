describe('Test suite', () => {
  $FullName('Arithmetic > Addition > Valid assertion')
  test('First test', () => {
    expect(1 + 1).toBe(2);
  });

  $FullName('Arithmetic > Addition > Invalid assertion')
  test('Second test', () => {
    expect(2 + 2).toBe(3);
  });
});
