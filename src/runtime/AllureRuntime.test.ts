import { state } from 'jest-metadata';

import { PREFIX } from '../constants';

import { AllureRuntime } from './AllureRuntime';
import type { IAttachmentsHandler } from './AttachmentsHandler';

describe('AllureRuntime', () => {
  it('should add attachments within the steps', async () => {
    let now = 0;

    const attachmentsHandler: IAttachmentsHandler = {
      placeAttachment: (_name, content) => {
        return `/attachments/${content}`;
      },
      secureAttachment(filePath) {
        return { destinationPath: filePath };
      },
      writeAttachment: async () => {
        /* noop */
      },
    };

    const runtime = new AllureRuntime({
      metadataProvider: () => state,
      nowProvider: () => now++,
      attachmentsHandler,
    });

    runtime.attachment('attachment1', Buffer.from('first'), 'text/plain');

    const innerStep3 = runtime.createStep(
      'inner step 3',
      async (message: string) => {
        runtime.attachment('attachment4', message, 'text/plain');

        const error = new Error('Async error');
        error.stack = 'Test stack';
        throw error;
      },
    );

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
      await innerStep3('fourth').catch(() => {
        /* empty */
      });
    });
    runtime.attachment('attachment5', Buffer.from('fifth'), 'text/plain');
    expect(state.get(PREFIX)).toMatchSnapshot();
  });
});
