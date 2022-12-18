// eslint-disable-next-line node/no-unpublished-import
import type { Test } from '@jest/reporters';

import type { ReporterEmitter } from '../../ReporterEmitter';

const FREE_SLOT = undefined;

export class ThreadService {
  private readonly _activeThreads: (string | undefined)[] = [];
  private readonly _threadMap = new Map<string, number>();

  constructor(private readonly _emitter: ReporterEmitter) {
    this._emitter.on('testFileStart', (event) => this.allocateThread(event.test));
    this._emitter.on('testFileResult', (event) => this.freeThread(event.test));
  }

  allocateThread(test: Test): void {
    const freeIndex = this._activeThreads.indexOf(FREE_SLOT);
    if (freeIndex === -1) {
      this._activeThreads.push(test.path);
    } else {
      this._activeThreads[freeIndex] = test.path;
    }

    const index = this._activeThreads.indexOf(test.path);
    this._threadMap.set(test.path, index);
  }

  freeThread(test: Test): void {
    const testFileIndex = this._activeThreads.indexOf(test.path);
    if (testFileIndex !== -1) {
      this._activeThreads[testFileIndex] = FREE_SLOT;
    }
  }

  getThreadId(test: Test): number {
    return this._threadMap.get(test.path) ?? 0;
  }
}
