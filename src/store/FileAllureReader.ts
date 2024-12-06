import fs from 'node:fs/promises';
import path from 'node:path';

import { parse } from 'properties';
import type { Category, ExecutorInfo } from 'jest-allure2-reporter';

import { log } from '../logger';

import type { AllureReader } from './AllureReader';
import type { AllureResult, AllureContainer } from './types';

export class FileAllureReader implements AllureReader {
  #scanIdsPromise?: Promise<void>;
  #containerIds?: string[];
  #resultIds?: string[];

  constructor(private readonly resultsDirectory: string) {}

  async getContainerIds(): Promise<string[]> {
    if (!this.#scanIdsPromise) {
      this.#scanIdsPromise = this.#scanIds();
    }

    return this.#scanIdsPromise.then(() => this.#containerIds || []);
  }

  async getResultIds(): Promise<string[]> {
    if (!this.#scanIdsPromise) {
      this.#scanIdsPromise = this.#scanIds();
    }

    return this.#scanIdsPromise.then(() => this.#resultIds || []);
  }

  async readResult(id: string): Promise<AllureResult | null> {
    const filePath = path.join(this.resultsDirectory, `${id}-result.json`);
    return this.#parseJSON<AllureResult>(filePath);
  }

  async readContainer(id: string): Promise<AllureContainer | null> {
    const filePath = path.join(this.resultsDirectory, `${id}-container.json`);
    return this.#parseJSON<AllureContainer>(filePath);
  }

  async readCategories(): Promise<Category[] | null> {
    const filePath = path.join(this.resultsDirectory, 'categories.json');
    return await this.#parseJSON<Category[]>(filePath);
  }

  async readEnvironmentInfo(): Promise<Record<string, string> | null> {
    const filePath = path.join(this.resultsDirectory, 'environment.properties');
    const content = await this.#readFileIfExists(filePath);
    if (!content) return {};

    return parse(content, { sections: false, comments: '#', separators: '=', unicode: true });
  }

  async readExecutorInfo(): Promise<ExecutorInfo | null> {
    const filePath = path.join(this.resultsDirectory, 'executor.json');
    return await this.#parseJSON<ExecutorInfo>(filePath);
  }

  /**
   * Helper method to read and parse JSON files.
   */
  async #parseJSON<T>(filePath: string): Promise<T | null> {
    try {
      const content = await this.#readFileIfExists(filePath);
      return content ? (JSON.parse(content) as T) : null;
    } catch (error: unknown) {
      log.warn(error, `Failed to read JSON file: ${filePath}`);
      return null;
    }
  }

  /**
   * Helper method to safely read a file, returning `null` if it doesn't exist.
   */
  async #readFileIfExists(filePath: string): Promise<string | null> {
    try {
      return await fs.readFile(filePath, 'utf8');
    } catch (error: unknown) {
      log.warn(error, `Failed to read file: ${filePath}`);
      return null;
    }
  }

  /**
   * Helper method to list the contents of the results directory and cache the IDs.
   */
  async #scanIds(): Promise<void> {
    const files = await fs.readdir(this.resultsDirectory).catch((error) => {
      log.warn(error, `Failed to list directory: ${this.resultsDirectory}`);
      return [];
    });

    this.#containerIds = files
      .filter((f) => f.endsWith('-container.json'))
      .map((f) => path.basename(f, '-container.json'));

    this.#resultIds = files
      .filter((f) => f.endsWith('-result.json'))
      .map((f) => path.basename(f, '-result.json'));
  }
}
