const sleep = (ms) => new Promise(r => setTimeout(r, ms));

describe('BeforeAll simulation', () => {
  beforeAll(async() => {
    await sleep(50);

    throw new Error('Something went wrong in beforeAll');
  });

  test('Test #1', async () => {
    // some test
  });

  test('Test #2', async () => {
    // some test
  });
});
