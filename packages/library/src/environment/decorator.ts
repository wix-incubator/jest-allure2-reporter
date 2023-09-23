import { randomUUID } from 'node:crypto';
import path from 'node:path';
import fs from 'node:fs';
import os from 'node:os';

import type { Circus } from '@jest/types';
import type {
  ForwardedCircusEvent,
  WithEmitter,
} from 'jest-metadata/environment-decorator';
import { state } from 'jest-metadata';
import { Stage, Status } from '@noomorph/allure-js-commons';

import type {
  AllureTestCaseMetadata,
  AllureTestStepMetadata,
} from '../metadata';
import { PREFIX } from '../constants';
import { AllureRuntime } from '../runtime';

export function WithAllure2<E extends WithEmitter>(
  JestEnvironmentClass: new (...arguments_: any[]) => E,
): new (...arguments_: any[]) => E {
  const compositeName = `Allure2(${JestEnvironmentClass.name})`;

  return {
    // @ts-expect-error TS2415: Class '[`${compositeName}`]' incorrectly extends base class 'E'.
    [`${compositeName}`]: class extends JestEnvironmentClass {
      // @ts-expect-error TS2564
      private readonly allure: AllureRuntime;

      constructor(...arguments_: any[]) {
        super(...arguments_);

        state.currentMetadata.set(
          ['allure2', 'workerId'],
          process.env.JEST_WORKER_ID,
        );

        const attachmentsFolder = os.tmpdir();
        this.global.allure = new AllureRuntime({
          metadataProvider: () => state.currentMetadata,
          nowProvider: () => Date.now(),
          writeAttachment(content) {
            const filePath = `allure2-${randomUUID()}`;
            const absolutePath = path.join(attachmentsFolder, filePath);
            fs.writeFileSync(absolutePath, content);
            return absolutePath;
          },
        });

        this.testEvents
          .on('add_hook', this.#addHook.bind(this))
          .on('add_test', this.#addTest.bind(this))
          .on('test_start', this.#executableStart.bind(this))
          .on('test_todo', this.#testSkip.bind(this))
          .on('test_skip', this.#testSkip.bind(this))
          .on('test_done', this.#testDone.bind(this))
          .on('hook_start', this.#executableStart.bind(this))
          .on('hook_failure', this.#executableFailure.bind(this))
          .on('hook_success', this.#executableSuccess.bind(this))
          .on('test_fn_start', this.#executableStart.bind(this))
          .on('test_fn_success', this.#executableSuccess.bind(this))
          .on('test_fn_failure', this.#executableFailure.bind(this));
      }

      #addHook({
        event,
      }: ForwardedCircusEvent<Circus.Event & { name: 'add_hook' }>) {
        const sourceCode = event.fn.toString();
        if (
          !sourceCode.includes(
            "during setup, this cannot be null (and it's fine to explode if it is)",
          )
        ) {
          const metadata = {
            code: [sourceCode],
          } as AllureTestStepMetadata;
          state.currentMetadata.assign(PREFIX, metadata);
        }
      }

      #addTest({
        event,
      }: ForwardedCircusEvent<Circus.Event & { name: 'add_test' }>) {
        const metadata: AllureTestCaseMetadata = {
          code: [event.fn.toString()],
        };

        state.currentMetadata.assign(PREFIX, metadata);
      }

      // eslint-disable-next-line no-empty-pattern
      #executableStart({}: ForwardedCircusEvent) {
        const metadata: AllureTestStepMetadata = {
          start: Date.now(),
          stage: Stage.RUNNING,
        };

        state.currentMetadata.assign(PREFIX, metadata);
      }

      #executableFailure({
        event,
      }: ForwardedCircusEvent<
        Circus.Event & { name: 'test_fn_failure' | 'hook_failure' }
      >) {
        const metadata: AllureTestStepMetadata = {
          stop: Date.now(),
          stage: Stage.INTERRUPTED,
          status: Status.FAILED,
          statusDetails: event.error
            ? {
                message: event.error.message,
                trace: event.error.stack,
              }
            : {},
        };

        state.currentMetadata.assign(PREFIX, metadata);
      }

      // eslint-disable-next-line no-empty-pattern
      #executableSuccess({}: ForwardedCircusEvent) {
        const metadata: AllureTestStepMetadata = {
          stop: Date.now(),
          stage: Stage.FINISHED,
          status: Status.PASSED,
          statusDetails: {},
        };

        state.currentMetadata.assign(PREFIX, metadata);
      }

      #testSkip() {
        const metadata: AllureTestCaseMetadata = {
          stop: Date.now(),
          stage: Stage.PENDING,
          status: Status.SKIPPED,
        };

        state.currentMetadata.assign(PREFIX, metadata);
      }

      #testDone({
        event,
      }: ForwardedCircusEvent<Circus.Event & { name: 'test_done' }>) {
        const metadata: AllureTestCaseMetadata = {
          stop: Date.now(),
          stage: event.test.failing ? Stage.INTERRUPTED : Stage.FINISHED,
          status: event.test.failing ? Status.FAILED : Status.PASSED,
        };

        state.currentMetadata.assign(PREFIX, metadata);
      }
    },
  }[compositeName] as unknown as new (...arguments_: any[]) => E;
}

/**
 * @inheritDoc
 */
export default WithAllure2;
