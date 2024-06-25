import fs from 'node:fs/promises';
import path from 'node:path';

import type { KeyedHelperCustomizer } from 'jest-allure2-reporter';
import globby from 'globby';

import { FileNavigator, weakMemoize } from '../../../utils';
import type { ReporterConfig } from '../../types';

class FileNavigatorCache {
  readonly #sources: Map<string, string>;
  #cache = new Map<string, Promise<FileNavigator | undefined>>();

  constructor(sources: Map<string, string>) {
    this.#sources = sources;
  }

  resolve(filePath: string): Promise<FileNavigator | undefined> {
    const absolutePath = path.resolve(filePath);
    if (!this.#cache.has(absolutePath)) {
      this.#cache.set(absolutePath, this.#createNavigator(absolutePath));
    }

    return this.#cache.get(absolutePath)!;
  }

  #createNavigator = async (filePath: string) => {
    return this.#sources.has(filePath)
      ? this.#readFromSourceMap(filePath)
      : this.#readFromFile(filePath);
  };

  #readFromSourceMap = async (sourcePath: string) => {
    const sourceMapPath = this.#sources.get(sourcePath)!;
    const raw = await fs.readFile(sourceMapPath, 'utf8');
    const { sources, sourcesContent } = JSON.parse(raw) as SourceMap;
    const index = sources.indexOf(sourcePath);
    const sourceCode = sourcesContent[index];
    return new FileNavigator(sourceCode);
  };

  #readFromFile = async (sourcePath: string) => {
    const sourceCode = await fs.readFile(sourcePath, 'utf8').catch(() => void 0);
    return sourceCode == null ? undefined : new FileNavigator(sourceCode);
  };

  clear() {
    this.#cache.clear();
  }
}

// TODO: check if we can avoid calling each customizer twice (remove weakMemoize when possible)
const indexSourceMaps = weakMemoize(async (sourceMaps: string[], rootDirectory: string) => {
  const result = new Map<string, string>();
  const allSourceMaps = await globby(sourceMaps, { cwd: rootDirectory });
  const allSourceMapsResolved = allSourceMaps.map((file) => path.resolve(rootDirectory, file));
  const allSourceFiles = await Promise.all(allSourceMapsResolved.map(extractSourceFiles));

  for (const [sourceMap, sources] of allSourceFiles) {
    for (const source of sources) {
      result.set(path.resolve(rootDirectory, source), sourceMap);
    }
  }

  return result;
});

async function extractSourceFiles(sourceMapPath: string): Promise<[string, string[]]> {
  const raw = await fs.readFile(sourceMapPath, 'utf8');
  const { sources = [], sourcesContent = [] } = JSON.parse(raw) as Partial<SourceMap>;
  return [sourceMapPath, sources.slice(0, sourcesContent.length)];
}

interface SourceMap {
  sources: string[];
  sourcesContent: string[];
}

export const getFileNavigator: KeyedHelperCustomizer<'getFileNavigator'> = async ({
  globalConfig,
  reporterConfig,
}) => {
  const config = reporterConfig as ReporterConfig;
  const sourceMaps = await indexSourceMaps(config.sourceCode.sourceMaps, globalConfig.rootDir);
  const cache = new FileNavigatorCache(sourceMaps);
  return (maybeSegmentedFilePath) => {
    const filePath = Array.isArray(maybeSegmentedFilePath)
      ? maybeSegmentedFilePath.join(path.sep)
      : maybeSegmentedFilePath;

    return cache.resolve(filePath);
  };
};
