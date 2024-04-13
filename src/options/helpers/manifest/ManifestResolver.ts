/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from 'lodash';
import pkgUp from 'pkg-up';
import type { ManifestHelper, ManifestHelperExtractor } from 'jest-allure2-reporter';

import { log } from '../../../logger';

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

  public extract: ManifestHelper = async (
    maybePackageName: unknown,
    maybeExtractor?: unknown,
    maybeDefaultValue?: unknown,
  ): Promise<any> => {
    let packageName: string | undefined;
    let extractor: ManifestHelperExtractor<unknown> | string[] | string | undefined;
    let defaultValue: unknown;

    if (typeof maybePackageName === 'function' || Array.isArray(maybePackageName)) {
      packageName = undefined;
      extractor = maybePackageName as ManifestHelperExtractor<unknown> | string[];
      defaultValue = maybeExtractor;
    } else {
      packageName = maybePackageName as string;
      extractor = maybeExtractor as typeof extractor;
      defaultValue = maybeDefaultValue;
    }

    const what = packageName ? `"${packageName}"` : 'the current project';
    const manifestPath = await this.resolveManifestPath(packageName);
    if (!manifestPath) {
      log.warn(`Cannot find package.json for ${what}`);
      return defaultValue;
    }

    try {
      const manifest = await this.importFn(manifestPath);

      if (typeof extractor === 'function') {
        return extractor(manifest as any) ?? defaultValue;
      }

      if (typeof extractor === 'string' || Array.isArray(extractor)) {
        return _.get(manifest, extractor, defaultValue);
      }

      return manifest;
    } catch (error: unknown) {
      log.error(error, `Failed to extract package.json for ${what}`);
      return;
    }
  };

  private async resolveManifestPath(packageName?: string) {
    return packageName
      ? require.resolve(packageName + '/package.json')
      : await pkgUp({ cwd: this.cwd });
  }
}
