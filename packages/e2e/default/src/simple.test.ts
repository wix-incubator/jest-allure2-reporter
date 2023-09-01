describe('Simple suite', () => {
  beforeAll(() => {
    console.log('beforeAll');
  });

  it('should pass', () => {
    expect(true).toBe(true);
  });

  it('should also pass', () => {
    expect(true).toBe(true);
  });

  afterEach(() => {
    console.log('afterEach');
  });
});
