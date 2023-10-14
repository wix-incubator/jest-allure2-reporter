import { state } from 'jest-metadata';

import { PREFIX } from '../constants';

import { AllureRuntime } from './AllureRuntime';

describe('AllureRuntime', () => {
  it('should add attachments within the steps', async () => {
    let now = 0;

    const runtime = new AllureRuntime({
      metadataProvider: () => state,
      nowProvider: () => now++,
      placeAttachment: (_name, content) => {
        return `/attachments/${content.toString()}`;
      },
      writeAttachment: async () => {
        /* noop */
      },
    });

    await runtime.createAttachment(
      'attachment1',
      Buffer.from('first'),
      'text/plain',
    );
    await runtime.step('outer step', async () => {
      try {
        runtime.step('inner step 1', () => {
          runtime.createAttachment('attachment2', 'second', 'text/plain');

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
      await runtime.createAttachment('attachment3', 'third', 'text/plain');
      await runtime
        .step('inner step 3', async () => {
          await runtime.createAttachment('attachment4', 'fourth', 'text/plain');

          const error = new Error('Async error');
          error.stack = 'Test stack';
          throw error;
        })
        .catch(() => {
          /* empty */
        });
    });
    await runtime.createAttachment(
      'attachment5',
      Buffer.from('fifth'),
      'text/plain',
    );
    expect(state.get(PREFIX)).toMatchSnapshot();
  });
});
