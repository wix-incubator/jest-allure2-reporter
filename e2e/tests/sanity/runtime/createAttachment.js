const os = require('node:os');

const { describe, expect, test } = require('@jest/globals');

test('should wrap a function with automatic attachment of its result', async () => {
  const diagnostics = () => ({ available_memory: os.freemem() });
  const wrapped = allure.createAttachment(diagnostics, 'diagnostics-{{0}}.json');

  // Creates 'diagnostics-before.json' attachment
  expect(wrapped('before')).toEqual({ available_memory: expect.any(Number) });
  // Consume some memory
  expect(Array.from({ length: 100000 }, () => Math.random())).toHaveLength(100000);
  // Creates 'diagnostics-after.json' attachment; the returned value is not changed by the wrapper
  expect(wrapped('after')).toEqual({ available_memory: expect.any(Number) });
});
