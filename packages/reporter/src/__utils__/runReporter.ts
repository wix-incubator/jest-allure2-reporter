import path from 'node:path';

import fs from 'fs-extra';
import glob from 'glob';
import _ from 'lodash';
import tempfile from 'tempfile';

import { JestAllure2Reporter } from '../JestAllure2Reporter';
import type { JestAllure2ReporterOptions } from '../JestAllure2ReporterOptions';

const rootDirectory = path.join(__dirname, '../..');

export async function runReporter(
  overrides: Partial<JestAllure2ReporterOptions>,
) {
  const options = {
    ...overrides,
    resultsDir: tempfile(''),
  };

  try {
    jest.useFakeTimers();

    const globalConfig = { rootDir: rootDirectory } as any;
    const reporter = new JestAllure2Reporter(globalConfig, options);

    const testReporterCalls = await readTestReporterCalls();
    for (const call of testReporterCalls) {
      jest.setSystemTime(call.time);
      if (call.method in reporter) {
        await (reporter as any)[call.method](...call.params);
      }
    }

    const allureResults = await readAllureResults(options.resultsDir);
    return new QueryResults(allureResults);
  } finally {
    jest.useRealTimers();
    await fs.remove(options.resultsDir);
  }
}

async function readTestReporterCalls() {
  const jestVersion = process.env.JEST_VERSION;
  const testReporterCallsPath = jestVersion
    ? path.join(
        rootDirectory,
        '__fixtures__/recordings',
        `${jestVersion}.jsonl`,
      )
    : glob
        .sync(path.join(rootDirectory, '__fixtures__/recordings/*.jsonl'))
        .reverse()[0];

  return fs
    .readFileSync(testReporterCallsPath, 'utf8')
    .split('\n')
    .filter(Boolean)
    .map((x) => JSON.parse(x));
}

async function readAllureResults(
  allureResultsDirectory: string,
): Promise<Record<string, unknown>[]> {
  const files = await fs.readdir(allureResultsDirectory);
  return await Promise.all(
    files.map(async (file) => {
      const content = await fs.readFile(
        path.join(allureResultsDirectory, file),
        'utf8',
      );

      return file.endsWith('.json')
        ? JSON.parse(content as any)
        : { filename: file, lines: content.split('\n').filter(Boolean) };
    }),
  );
}

export class QueryResults {
  constructor(public readonly value: any[]) {}

  bySuite(name: RegExp) {
    const subset = this.value.filter((result) => {
      const labels = _.get(result, 'labels', []) as object[];
      const suiteLabel = _.find(labels, { name: 'suite' }) as any;
      return suiteLabel?.value?.match(name);
    });

    return new QueryResults(subset);
  }

  byName(name: RegExp) {
    const subset = this.value.filter((r) => r.name?.match(name));
    return new QueryResults(subset);
  }

  byFileName(name: RegExp) {
    const subset = this.value.filter((r) => r.filename?.match(name));
    return new QueryResults(subset);
  }

  byStatus(value: string) {
    const subset = _.filter(this.value, { status: value });
    return new QueryResults(subset);
  }

  labels(name: string) {
    const subset = _(this.value).flatMap('labels').filter({ name }).value();
    return new QueryResults(subset);
  }

  sortBy(property: string) {
    return new QueryResults(_.sortBy(this.value, property));
  }
}
