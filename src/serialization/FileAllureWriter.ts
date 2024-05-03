import fs from 'node:fs/promises';
import path from 'node:path';

import { stringify } from 'properties';
import type { Category, ExecutorInfo } from 'jest-allure2-reporter';

import type { AllureTestResult, AllureTestResultContainer, AllureWriter } from './AllureWriter';

async function writeJson(path: string, data: unknown) {
  await fs.writeFile(path, JSON.stringify(data) + '\n');
}

export interface FileSystemAllureWriterConfig {
  resultsDir: string;
}

export class FileAllureWriter implements AllureWriter {
  readonly #config: FileSystemAllureWriterConfig;

  constructor(config: FileSystemAllureWriterConfig) {
    this.#config = config;
  }

  async init() {
    await fs.mkdir(this.#config.resultsDir, {
      recursive: true,
    });
  }

  async writeCategories(categories: Category[]) {
    const path = this.#buildPath('categories.json');
    await writeJson(path, categories);
  }

  async writeContainer(result: AllureTestResultContainer) {
    const path = this.#buildPath(`${result.uuid}-container.json`);
    await writeJson(path, result);
  }

  async writeEnvironmentInfo(info: Record<string, unknown>) {
    const text = stringify(info, { unicode: true });
    const path = this.#buildPath('environment.properties');

    await fs.writeFile(path, text + '\n');
  }

  async writeExecutorInfo(info: ExecutorInfo) {
    const path = this.#buildPath('executor.json');
    await writeJson(path, info);
  }

  async writeResult(result: AllureTestResult) {
    const path = this.#buildPath(`${result.uuid}-result.json`);
    await writeJson(path, result);
  }

  #buildPath(name: string): string {
    return path.join(this.#config.resultsDir, name);
  }
}
