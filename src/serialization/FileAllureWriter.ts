import fs from 'node:fs/promises';
import path from 'node:path';

import { stringify } from 'properties';
import type { Category, ExecutorInfo } from 'jest-allure2-reporter';

import type { AllureResult, AllureContainer, AllureWriter } from './AllureWriter';

async function writeJson(
  path: string,
  data: unknown,
  stringifier?: (key: string, value: unknown) => unknown,
) {
  const json = JSON.stringify(data, stringifier);
  await fs.writeFile(path, json + '\n');
}

function regexpAwareStringifier(_key: string, value: unknown) {
  return value instanceof RegExp ? value.source : value;
}

export interface FileSystemAllureWriterConfig {
  overwrite: boolean;
  resultsDir: string;
}

export class FileAllureWriter implements AllureWriter {
  readonly #config: FileSystemAllureWriterConfig;

  constructor(config: FileSystemAllureWriterConfig) {
    this.#config = config;
  }

  async init() {
    const { resultsDir, overwrite } = this.#config;
    const directoryExists = await fs.access(resultsDir).then(
      () => true,
      () => false,
    );
    if (overwrite && directoryExists) {
      await fs.rm(resultsDir, { recursive: true });
    }

    await fs.mkdir(resultsDir, { recursive: true });
  }

  async writeCategories(categories: Category[]) {
    const path = this.#buildPath('categories.json');
    await writeJson(path, categories, regexpAwareStringifier);
  }

  async writeContainer(result: AllureContainer) {
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

  async writeResult(result: AllureResult) {
    const path = this.#buildPath(`${result.uuid}-result.json`);
    await writeJson(path, result);
  }

  #buildPath(name: string): string {
    return path.join(this.#config.resultsDir, name);
  }
}
