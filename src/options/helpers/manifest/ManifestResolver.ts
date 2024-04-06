/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from 'lodash';
import pkgUp from 'pkg-up';
import type { ManifestHelper, ManifestHelperExtractor } from 'jest-allure2-reporter';

export type ImportModuleFunction = (
  path: string,
) => Record<string, any> | Promise<Record<string, any>>;

export class ManifestResolver {
  private readonly cwd: string;
  private readonly importFn: ImportModuleFunction;

  constructor(cwd: string, importFunction: ImportModuleFunction) {
    this.cwd = cwd;
    this.importFn = importFunction;
  }

  public extract: ManifestHelper = async <T>(
    packageName?: string,
    maybeCallback?: ManifestHelperExtractor<T>,
    defaultValue?: T,
  ): Promise<any> => {
    const manifestPath = await this.resolveManifestPath(packageName);
    if (!manifestPath) {
      // TODO: log warning
      return defaultValue;
    }

    try {
      const manifest = await this.importFn(manifestPath);

      if (typeof maybeCallback === 'function') {
        const callback = maybeCallback;
        return callback(manifest as any) ?? defaultValue;
      }

      if (typeof maybeCallback === 'string') {
        const propertyPath = maybeCallback.split('.');
        return _.get(manifest, propertyPath, defaultValue);
      }

      return manifest;
    } catch {
      // TODO: log error
      return;
    }
  };

  private async resolveManifestPath(packageName?: string) {
    return packageName
      ? require.resolve(packageName + '/package.json')
      : await pkgUp({ cwd: this.cwd });
  }
}
