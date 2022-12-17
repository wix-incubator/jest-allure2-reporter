jest.useFakeTimers();

import path from 'path';

import fs from 'fs-extra';
import _ from 'lodash';

import JestAllure2Reporter from './JestAllure2Reporter';

const rootDirectory = path.join(__dirname, '..');
const testReporterCallsPath = path.join(rootDirectory, '__fixtures__/test-reporter-calls.json');
const allureDirectory = path.join(rootDirectory, '__fixtures__/allure-results');

describe('JestAllure2Reporter', () => {
  let reporter!: JestAllure2Reporter;
  let allureResults!: Record<string, unknown>[];

  beforeAll(async () => {
    await fs.remove(allureDirectory);
    reporter = new JestAllure2Reporter({ rootDir: rootDirectory } as any, {
      resultsDir: allureDirectory,
    });
  });

  beforeAll(async () => {
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
  });

  beforeAll(async () => {
    const files = await fs.readdir(allureDirectory);
    allureResults = await Promise.all(
      files
        .filter((f) => f.endsWith('.json'))
        .map(async (file) => {
          const content = await fs.readFile(path.join(allureDirectory, file));
          return JSON.parse(content as any);
        }),
    );
  });

  test.each([
    [
      'statuses',
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
    ],
  ])('should generate correct results for: %s.test.js', (testName, expected) => {
    expect(filterBySuite(testName)).toEqual(expected);
  });

  function filterBySuite(name: string) {
    return allureResults.filter((result) => {
      const labels = _.get(result, 'labels', []) as object[];
      const suiteLabel = _.find(labels, { name: 'suite' }) as any;
      return suiteLabel?.value === `__fixtures__/tests/${name}.test.js`;
    });
  }
});
