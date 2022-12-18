import path from 'path';

import attempt from 'lodash/attempt';
import isError from 'lodash/isError';
import pkgUp from 'pkg-up';

type Config = {
  rootDir: string;
  packageName?: string;
};

export class ProjectService {
  public readonly packageName: string | undefined;

  public readonly rootDir: string;

  constructor({ packageName, rootDir }: Config) {
    this.rootDir = rootDir;

    if (packageName === undefined) {
      const closestJson = pkgUp.sync({ cwd: rootDir });
      const packageJson = closestJson ? attempt(() => require(closestJson)) : undefined;
      if (isError(packageJson)) {
        console.warn(`jest-allure2-reporter: Failed to load package.json from: ${closestJson}`);
      } else {
        this.packageName = packageJson?.name;
      }
    } else {
      this.packageName = packageName;
    }
  }

  public relative(testPath: string) {
    return path.relative(this.rootDir, testPath);
  }
}
