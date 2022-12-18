const sleep = (ms) => new Promise(r => setTimeout(r, ms));

generateSimpleSuite('root');

describe('Suite', () => {
  generateSimpleSuite('inner');
});

function generateSimpleSuite(name) {
  test.skip(`${name} skipped test`, async () => {
    // empty test
  });

  test(`${name} broken test`, async () => {
    throw new Error('Simulated error');
  });

  test(`${name} failed test`, async () => {
    expect(2 + 2).toBe(5);
  });

  test(`${name} passed test (600ms)`, async () => {
    await sleep(600);
  });
}
