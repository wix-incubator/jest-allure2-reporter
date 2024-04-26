describe('Regression tests', () => {
  $Issue('XMLRPC-15')
  test('Proving the fix', () => {
    expect(1 + 1).toBe(2);
  });

  $Issue('XMLRPC-16')
  test.failing('Demonstrating an existing bug', () => {
    expect(2 + 2).toBe(3);
  });
});
