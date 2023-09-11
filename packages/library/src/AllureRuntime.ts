import type {Metadata} from 'jest-metadata';
import {$POINTER, PREFIX} from "./constants";
import type {AllureTestStepMetadata} from "./options";
import {Status, Stage} from "@noomorph/allure-js-commons";
import type {StatusDetails} from "@noomorph/allure-js-commons";
import {isPromiseLike} from "./utils/isPromiseLike";

export class AllureRuntime {
  readonly #metadataProvider: () => Metadata;

  get #metadata(): Metadata {
    return this.#metadataProvider();
  }

  constructor(metadataProvider: () => Metadata) {
    this.#metadataProvider = metadataProvider;
  }

  attachment(name: string, content: Buffer | string, type: string) {
    this.#metadata.push(this.#localPath('attachments'), [{ name, content, type }]);
  }

  step(name: string, fn: () => Promise<unknown>): Promise<unknown>;
  step(name: string, fn: () => unknown): unknown;
  step(name: string, fn: () => unknown) {
    this.#startStep(name);
    const end = this.#stopStep;

    let result: unknown;
    try {
      result = fn();

      if (isPromiseLike(result)) {
        this.#updateStep(Stage.RUNNING);

        result.then(
          () => end(Status.PASSED),
          (error) => end(Status.FAILED, { message: error.message, trace: error.stack }),
        );
      } else {
        end(Status.PASSED);
      }

      return result;
    } catch (error: unknown) {
      end(Status.FAILED, { message: (error as Error).message, trace: (error as Error).stack });
      throw error;
    }
  }

  #startStep = (name: string) => {
    const count = this.#metadata.get(this.#localPath('steps', 'length'), 0);
    this.#metadata.push(this.#localPath('steps'), [{ name, stage: Stage.SCHEDULED }]);
    this.#metadata.push($POINTER, ['steps', `${count}`]);
  };

  #stopStep = (status: Status, statusDetails?: StatusDetails) => {
    this.#metadata.assign(this.#localPath(), {
      stage: Stage.FINISHED,
      status,
      statusDetails,
    });
    const $pointer = this.#metadata.get($POINTER, []) as string[];
    this.#metadata.set($POINTER, $pointer.slice(0, -2));
  };

  #updateStep = (stage: Stage) => {
    this.#metadata.set(this.#localPath('stage'), stage);
  };

  #localPath(key?: keyof AllureTestStepMetadata, ...innerKeys: string[]) {
    const stepPath = this.#metadata.get($POINTER, []) as string[];
    const allKeys = key ? [key, ...innerKeys] : innerKeys;
    return [PREFIX, ...stepPath, ...allKeys];
  }
}
