import path from 'path';

import fs from 'fs-extra';
import glob from 'glob';

import JestAllure2Reporter from '.';

const rootDirectory = path.join(__dirname, '..');
const jsonDirectory = path.join(rootDirectory, '__fixtures__/results');
const allureDirectory = path.join(rootDirectory, '__fixtures__/allure-results');

const testCases = glob.sync('**/*.json', { cwd: jsonDirectory }).map((f) => [f]);

describe('JestAllure2Reporter', () => {
  let reporter!: JestAllure2Reporter;

  beforeAll(async () => {
    await fs.remove(allureDirectory);
    reporter = new JestAllure2Reporter({ rootDir: rootDirectory } as any, {
      resultsDir: allureDirectory,
    });
  });

  test.each(testCases)('should process: %s', async (fixtureName: string) => {
    const rawJson = await fs.readFile(path.join(jsonDirectory, fixtureName));
    const json = JSON.parse(rawJson as any);

    switch (fixtureName) {
      case '_run-start.json':
        await reporter.onRunStart(json, undefined as any);
        break;
      default:
        await reporter.onTestResult(undefined as any, json, undefined as any);
    }
  });
});
