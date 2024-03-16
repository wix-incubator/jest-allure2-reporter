import fs from 'node:fs/promises';
import path from 'node:path';

import { LineNavigator } from './LineNavigator';

export class FileNavigatorCache {
  #cache = new Map<string, Promise<LineNavigator>>();

  async resolve(filePath: string): Promise<LineNavigator> {
    const absolutePath = path.resolve(filePath);
    if (!this.#cache.has(absolutePath)) {
      this.#cache.set(absolutePath, this.#createNavigator(absolutePath));
    }

    return this.#cache.get(absolutePath)!;
  }

  #createNavigator = async (filePath: string) => {
    const sourceCode = await fs.readFile(filePath, 'utf8').catch(() => '');
    return new LineNavigator(sourceCode);
  };

  clear() {
    this.#cache.clear();
  }

  static readonly instance = new FileNavigatorCache();
}
