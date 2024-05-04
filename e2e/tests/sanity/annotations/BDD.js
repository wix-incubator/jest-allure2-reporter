$Epic('Arithmetic operations')
$Feature('Addition')
describe('Test suite', () => {
  $Story('Sane assumptions')
  test('First test', () => {
    expect(1 + 1).toBe(2);
  });

  $Story('Insane assumptions')
  test('Second test', () => {
    expect(2 + 2).toBe(3);
  });
});
