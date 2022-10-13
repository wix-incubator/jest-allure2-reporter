const sleep = (ms) => new Promise(r => setTimeout(r, ms));

describe('Grand parent suite', () => {
  beforeAll(async () => {
    console.log('Grand parent suite: beforeAll');
    await sleep(1000);
  });

  describe('Parent suite', () => {
    describe('Child suite', () => {
      beforeAll(async () => {
        console.log('Child suite: beforeAll');
        await sleep(500);
      });

      test.todo('Test 1 (todo)');

      test('Test 2', async () => {
        console.log('Test 2: test_fn');
        await sleep(200);
      });

      test.skip('Test 3 (skip)', async () => {
        console.log('Test 3: test_fn');
      });
    });

    test('Test 4', async () => {
      console.log('Test 4: test_fn');
      await sleep(300);
    });

    afterAll(async () => {
      console.log('Parent suite: afterAll');
      throw new Error('Parent suite error');
    });
  });
});
