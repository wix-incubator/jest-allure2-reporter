import path from 'path';

import fs from 'fs-extra';

import JestAllure2Reporter from '.';

const rootDirectory = path.join(__dirname, '..');
const testReporterCallsPath = path.join(rootDirectory, '__fixtures__/test-reporter-calls.json');
const allureDirectory = path.join(rootDirectory, '__fixtures__/allure-results');

describe('JestAllure2Reporter', () => {
  let reporter!: JestAllure2Reporter;

  beforeAll(async () => {
    await fs.remove(allureDirectory);
    reporter = new JestAllure2Reporter({ rootDir: rootDirectory } as any, {
      resultsDir: allureDirectory,
    });
  });

  test('should process test reporter calls', async () => {
    const testReporterCalls = fs
      .readFileSync(testReporterCallsPath, 'utf8')
      .split('\n')
      .filter(Boolean)
      .map((x) => JSON.parse(x));

    for (const call of testReporterCalls) {
      if (call.method in reporter) {
        await (reporter as any)[call.method](...call.params);
      }
    }
  });
});
