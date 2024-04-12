import fs from 'node:fs/promises';
import path from 'node:path';

import type { KeyedHelperCustomizer } from 'jest-allure2-reporter';

import { FileNavigator } from '../../../utils';

class FileNavigatorCache {
  #cache = new Map<string, Promise<FileNavigator | undefined>>();

  resolve(filePath: string): Promise<FileNavigator | undefined> {
    const absolutePath = path.resolve(filePath);
    if (!this.#cache.has(absolutePath)) {
      this.#cache.set(absolutePath, this.#createNavigator(absolutePath));
    }

    return this.#cache.get(absolutePath)!;
  }

  #createNavigator = async (filePath: string) => {
    const sourceCode = await fs.readFile(filePath, 'utf8').catch(() => void 0);
    return sourceCode == null ? undefined : new FileNavigator(sourceCode);
  };

  clear() {
    this.#cache.clear();
  }

  static readonly instance = new FileNavigatorCache();
}

export const getFileNavigator: KeyedHelperCustomizer<'getFileNavigator'> = () => {
  const cache = new FileNavigatorCache();
  return (filePath) => cache.resolve(filePath);
};
