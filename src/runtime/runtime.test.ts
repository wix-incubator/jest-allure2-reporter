import path from 'node:path';

import { state } from 'jest-metadata';

import { AllureMetadataProxy } from '../metadata';

import { AllureRuntimeImplementation } from './AllureRuntimeImplementation';
import type { SharedReporterConfig } from './types';
import { AllureRuntimeContext } from './AllureRuntimeContext';

describe('AllureRuntime', () => {
  it('should add attachments within the steps', async () => {
    let now = 0;

    const context = new AllureRuntimeContext({
      contentAttachmentHandlers: {
        write: (context) => path.join(context.outDir, context.content.toString()),
      },
      getCurrentMetadata: () => state.currentMetadata,
      getFileMetadata: () => state.lastTestFile!,
      getGlobalMetadata: () => state,
      getNow: () => now++,
      getReporterConfig(): SharedReporterConfig {
        return {
          overwrite: true,
          resultsDir: '/tmp',
          injectGlobals: false,
          attachments: {
            subDir: '../attachments',
            contentHandler: 'write',
            fileHandler: 'ref',
          },
          markdown: {
            enabled: false,
            keepSource: false,
            remarkPlugins: [],
            rehypePlugins: [],
          },
          sourceCode: {
            enabled: false,
            plugins: [],
          },
        };
      },
    });

    const runtime = new AllureRuntimeImplementation(context);
    const resultingPath = await runtime.attachment(
      'attachment1',
      Buffer.from('first'),
      'text/plain',
    );

    expect(resultingPath).toBe('/attachments/first');

    const innerStep3 = runtime.createStep('inner step 3 ({{0}})', async (message: string) => {
      runtime.attachment('attachment4', message, 'text/plain');

      const error = new Error('Async error');
      error.stack = 'Test stack';
      throw error;
    });

    await runtime.step('outer step', async () => {
      try {
        runtime.step('inner step 1', () => {
          runtime.attachment('attachment2', 'second', 'text/plain');
          const error = new Error('Sync error');
          error.stack = 'Test stack';
          // Simulating Jest assertion error
          Object.assign(error, { matcherResult: undefined });
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
    await runtime.flush();
    expect(new AllureMetadataProxy(state).get()).toMatchSnapshot();
  });
});
