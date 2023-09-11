import {AllureRuntime} from "./AllureRuntime";
import {state} from 'jest-metadata';
import {PREFIX} from "./constants";

describe('AllureRuntime', () => {
  it('should add attachments within the steps', async () => {
    const runtime = new AllureRuntime(() => state);
    runtime.attachment('attachment1', Buffer.from('first'), 'text/plain');
    await runtime.step('outer step', async () => {
      try {
        runtime.step('inner step 1', () => {
          runtime.attachment('attachment2', 'second', 'text/plain');

          const err = new Error('Sync error');
          err.stack = 'Test stack';
          throw err;
        });
      } catch {}
      runtime.step('inner step 2', () => {});
      runtime.attachment('attachment3', 'third', 'text/plain');
      await runtime.step('inner step 3', async () => {
        runtime.attachment('attachment4', 'fourth', 'text/plain');

        const err = new Error('Async error');
        err.stack = 'Test stack';
        throw err;
      }).catch(() => {});
    });
    runtime.attachment('attachment5', Buffer.from('fifth'), 'text/plain');
    expect(state.get(PREFIX)).toMatchSnapshot();
  });
});
