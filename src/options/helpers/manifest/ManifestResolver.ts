/* eslint-disable @typescript-eslint/no-explicit-any */
import pkgUp from 'pkg-up';
import type {
  ExtractorManifestHelper,
  ExtractorManifestHelperCallback,
} from 'jest-allure2-reporter';

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

  public extract: ExtractorManifestHelper = <T>(
    packageNameOrCallback?: string | ExtractorManifestHelperCallback<T>,
    callback?: ExtractorManifestHelperCallback<T>,
  ) => {
    if (!packageNameOrCallback) {
      return this.manifestImpl<T>();
    } else if (this.isManifestExtractorCallback<T>(packageNameOrCallback)) {
      return this.manifestImpl<T>(undefined, packageNameOrCallback);
    } else if (callback) {
      return this.manifestImpl<T>(packageNameOrCallback, callback);
    } else {
      return this.manifestImpl<T>(packageNameOrCallback);
    }
  };

  private isManifestExtractorCallback<T>(
    value: unknown,
  ): value is ExtractorManifestHelperCallback<T> {
    return typeof value === 'function';
  }

  private async manifestImpl<T>(
    packageName?: string,
    callback?: ExtractorManifestHelperCallback<T>,
  ): Promise<any> {
    const manifestPath = await this.resolveManifestPath(packageName);
    if (!manifestPath) {
      // TODO: log warning
      return;
    }

    try {
      const manifest = await this.importFn(manifestPath);
      return callback ? callback(manifest as any) : manifest;
    } catch {
      // TODO: log error
      return;
    }
  }

  private async resolveManifestPath(packageName?: string) {
    return packageName
      ? require.resolve(packageName + '/package.json')
      : await pkgUp({ cwd: this.cwd });
  }
}
