import type { Category, ExecutorInfo } from 'jest-allure2-reporter';

import type { AllureReader } from './AllureReader';
import type { AllureWriter } from './AllureWriter';
import type { AllureResult, AllureContainer } from './types';
import { FileAllureReader } from './FileAllureReader';
import type { FileSystemAllureWriterConfig } from './FileAllureWriter';
import { FileAllureWriter } from './FileAllureWriter';

export interface AllureStoreConfig {
  reader: AllureReader;
  writer: AllureWriter;
}

export class AllureStore {
  readonly #reader: AllureReader;
  readonly #writer: AllureWriter;

  constructor(config: AllureStoreConfig) {
    this.#reader = config.reader;
    this.#writer = config.writer;
  }

  static async fromConfig(config: AllureStoreConfig): Promise<AllureStore> {
    await Promise.all([config.reader.init?.(), config.writer.init?.()]);
    return new AllureStore(config);
  }

  static async fromDirectory(config: FileSystemAllureWriterConfig): Promise<AllureStore> {
    const reader: AllureReader = new FileAllureReader(config.resultsDir);
    const writer: AllureWriter = new FileAllureWriter(config);
    return AllureStore.fromConfig({ reader, writer });
  }

  async init() {
    if (typeof this.#writer.init === 'function') {
      await this.#writer.init();
    }
  }

  async cleanup() {
    if (typeof this.#writer.cleanup === 'function') {
      await this.#writer.cleanup();
    }
  }

  // #region Reading methods
  async getAllResults(): Promise<AllureResult[]> {
    const [containerIds, resultIds] = await Promise.all([
      this.#reader.getContainerIds(),
      this.#reader.getResultIds(),
    ]);
    const containerMap = await this.#buildContainerMap(containerIds);

    const rawResults = await Promise.all(resultIds.map((id) => this.#reader.readResult(id)));
    const validResults = rawResults.filter((r): r is AllureResult => r != null);

    return validResults.map((result) => this.#mergeContainers(result, containerMap));
  }

  async getLatestResults(): Promise<AllureResult[]> {
    const all = await this.getAllResults();
    const map = new Map<string, AllureResult>();
    for (const result of all) {
      const existing = map.get(result.historyId);
      if (!existing || result.stop > existing.stop) {
        map.set(result.historyId, result);
      }
    }
    return [...map.values()];
  }

  async getCategories(): Promise<Category[] | null> {
    return this.#reader.readCategories();
  }

  async getEnvironment(): Promise<Record<string, string> | null> {
    return this.#reader.readEnvironmentInfo();
  }

  async getExecutor(): Promise<ExecutorInfo | null> {
    return this.#reader.readExecutorInfo();
  }

  async getContainer(id: string): Promise<AllureContainer | null> {
    return this.#reader.readContainer(id);
  }

  async getResult(id: string): Promise<AllureResult | null> {
    return this.#reader.readResult(id);
  }
  // #endregion

  // #region Writing methods
  async writeCategories(categories: Category[]): Promise<void> {
    return this.#writer.writeCategories(categories);
  }

  async writeEnvironmentInfo(info: Record<string, string>): Promise<void> {
    return this.#writer.writeEnvironmentInfo(info);
  }

  async writeExecutorInfo(info: ExecutorInfo): Promise<void> {
    return this.#writer.writeExecutorInfo(info);
  }

  async writeResult(result: AllureResult): Promise<void> {
    return this.#writer.writeResult(result);
  }

  async writeContainer(container: AllureContainer): Promise<void> {
    return this.#writer.writeContainer(container);
  }
  // #endregion

  // #region Private helper methods
  async #buildContainerMap(containerIds: string[]): Promise<Map<string, AllureContainer>> {
    const containerMap = new Map<string, AllureContainer>();
    // Read and store all containers
    await Promise.all(
      containerIds.map(async (cid) => {
        const container = await this.#reader.readContainer(cid);
        if (container) {
          containerMap.set(container.uuid, container);
        }
      }),
    );
    return containerMap;
  }

  #mergeContainers(result: AllureResult, containerMap: Map<string, AllureContainer>): AllureResult {
    // The aggregation logic similar to what we had before
    const ancestors = this.#findAncestorContainers(result.uuid, containerMap);
    const merged = { ...result, steps: this.#mergeSteps(result, ancestors) };
    return merged;
  }

  #findAncestorContainers(
    startId: string,
    containerMap: Map<string, AllureContainer>,
  ): AllureContainer[] {
    // logic similar to previously done in aggregator class
    const parentFor = new Map<string, string>();
    for (const container of containerMap.values()) {
      for (const child of container.children) {
        parentFor.set(child, container.uuid);
      }
    }

    const ancestors: AllureContainer[] = [];
    let currentId: string | undefined = startId;
    while (currentId) {
      const parentId = parentFor.get(currentId);
      if (!parentId) break;
      const parentContainer = containerMap.get(parentId);
      if (!parentContainer) break;
      ancestors.push(parentContainer);
      currentId = parentId;
    }
    return ancestors.reverse();
  }

  #mergeSteps(result: AllureResult, ancestors: AllureContainer[]) {
    const beforeSteps = ancestors.flatMap((a) => a.befores ?? []);
    const afterSteps = [...ancestors].reverse().flatMap((a) => a.afters ?? []);
    return [...beforeSteps, ...(result.steps ?? []), ...afterSteps];
  }
  // #endregion
}
