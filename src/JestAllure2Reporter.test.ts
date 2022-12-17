jest.useFakeTimers();

import path from 'path';

import fs from 'fs-extra';
import _ from 'lodash';
import tempfile from 'tempfile';

import JestAllure2Reporter from './JestAllure2Reporter';
import type { JestAllure2ReporterOptions } from './JestAllure2ReporterOptions';

const rootDirectory = path.join(__dirname, '..');
const testReporterCallsPath = path.join(rootDirectory, '__fixtures__/test-reporter-calls.json');

describe('JestAllure2Reporter', () => {
  let allureResultsDirectory: string;

  describe('with default options', () => {
    beforeAll(() => simulateTestRun({}));

    afterAll(async () => {
      await fs.remove(allureResultsDirectory);
    });

    test('statuses', async () => {
      const results = await bySuite('statuses');

      expect(results).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: 'root broken test',
            status: 'broken',
            statusDetails: expect.objectContaining({
              message: 'Error: Simulated error',
            }),
          }),
          expect.objectContaining({
            name: 'root failed test',
            status: 'failed',
            statusDetails: expect.objectContaining({
              message: expect.any(String),
            }),
          }),
          expect.objectContaining({
            name: 'root skipped test',
            status: 'skipped',
          }),
          expect.objectContaining({
            name: 'root passed test (600ms)',
            status: 'passed',
          }),
        ]),
      );
    });
  });

  describe('with options.errorsAsFailedAssertions = true', () => {
    beforeAll(() =>
      simulateTestRun({
        errorsAsFailedAssertions: true,
      }),
    );

    afterAll(async () => {
      await fs.remove(allureResultsDirectory);
    });

    test('statuses', async () => {
      const results = await bySuite('statuses');
      expect(results).not.toEqual(
        expect.arrayContaining([expect.objectContaining({ status: 'broken' })]),
      );
      expect(results).toEqual(
        expect.arrayContaining([expect.objectContaining({ status: 'failed' })]),
      );
    });
  });

  async function bySuite(name: string) {
    const results = await readAllureResults();
    return results.filter((result) => {
      const labels = _.get(result, 'labels', []) as object[];
      const suiteLabel = _.find(labels, { name: 'suite' }) as any;
      return suiteLabel?.value === `__fixtures__/tests/${name}.test.js`;
    });
  }

  async function readAllureResults(): Promise<Record<string, unknown>[]> {
    const files = await fs.readdir(allureResultsDirectory);
    return await Promise.all(
      files
        .filter((f) => f.endsWith('.json'))
        .map(async (file) => {
          const content = await fs.readFile(path.join(allureResultsDirectory, file));
          return JSON.parse(content as any);
        }),
    );
  }

  async function simulateTestRun(options: Partial<JestAllure2ReporterOptions>) {
    options.resultsDir = allureResultsDirectory = tempfile('');
    const globalConfig = { rootDir: rootDirectory } as any;
    const reporter = new JestAllure2Reporter(globalConfig, options);

    const testReporterCalls = fs
      .readFileSync(testReporterCallsPath, 'utf8')
      .split('\n')
      .filter(Boolean)
      .map((x) => JSON.parse(x));

    for (const call of testReporterCalls) {
      jest.setSystemTime(call.time);
      if (call.method in reporter) {
        await (reporter as any)[call.method](...call.params);
      }
    }
  }
});
