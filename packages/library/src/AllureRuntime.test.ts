import { state } from 'jest-metadata';

import { AllureRuntime } from './AllureRuntime';
import { PREFIX } from './constants';

describe('AllureRuntime', () => {
  it('should add attachments within the steps', async () => {
    let now = 0;

    const runtime = new AllureRuntime({
      metadataProvider: () => state,
      nowProvider: () => now++,
    });

    runtime.attachment('attachment1', Buffer.from('first'), 'text/plain');
    await runtime.step('outer step', async () => {
      try {
        runtime.step('inner step 1', () => {
          runtime.attachment('attachment2', 'second', 'text/plain');

          const error = new Error('Sync error');
          error.stack = 'Test stack';
          throw error;
        });
      } catch {
        /* empty */
      }
      runtime.step('inner step 2', () => {
        /* empty */
      });
      runtime.attachment('attachment3', 'third', 'text/plain');
      await runtime
        .step('inner step 3', async () => {
          runtime.attachment('attachment4', 'fourth', 'text/plain');

          const error = new Error('Async error');
          error.stack = 'Test stack';
          throw error;
        })
        .catch(() => {
          /* empty */
        });
    });
    runtime.attachment('attachment5', Buffer.from('fifth'), 'text/plain');
    expect(state.get(PREFIX)).toMatchSnapshot();
  });
});
