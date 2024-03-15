import type { MaybeFunction } from './types';

export interface TaskQueueConfig {
  readonly logError: (error: unknown) => void;
}

export class TaskQueue {
  #idle: Promise<unknown> = Promise.resolve();
  #logError: (error: unknown) => void;

  constructor(config: TaskQueueConfig) {
    this.#logError = config.logError;
  }

  readonly flush = () => this.#idle;

  readonly enqueueTask = (task: MaybeFunction<Promise<unknown>>) => {
    this.#idle =
      typeof task === 'function'
        ? this.#idle.then(task)
        : this.#idle.then(() => task);

    this.#idle = this.#idle.catch(this.#logError);
    return this.#idle;
  };
}
