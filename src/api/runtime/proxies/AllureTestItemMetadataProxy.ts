import type { Metadata } from 'jest-metadata';
import type { AllureTestItemMetadata } from 'jest-allure2-reporter';

import { CURRENT_STEP, PREFIX } from '../../../constants';

export class AllureTestItemMetadataProxy<T extends AllureTestItemMetadata> {
  protected readonly $metadata: Metadata;
  protected readonly $boundPath?: string[];

  constructor(metadata: Metadata, boundPath?: string[]) {
    this.$metadata = metadata;
    this.$boundPath = boundPath;
  }

  $bind(path?: string[]): AllureTestItemMetadataProxy<T> {
    return new AllureTestItemMetadataProxy(
      this.$metadata,
      path ?? this.$localPath(),
    );
  }

  get id(): string {
    return this.$metadata.id + ':' + this.$localPath().join('.');
  }

  get<V>(path?: keyof T, fallbackValue?: V): V {
    const fullPath = this.$localPath(path);
    return this.$metadata.get(fullPath, fallbackValue);
  }

  set(path: keyof T, value: unknown): this {
    const fullPath = this.$localPath(path);
    this.$metadata.set(fullPath, value);
    return this;
  }

  push(key: keyof T, values: unknown[]): this {
    const path = this.$localPath(key);
    this.$metadata.push(path, values);
    return this;
  }

  assign(values: Partial<T>): this {
    this.$metadata.assign(this.$localPath(), values);
    return this;
  }

  protected $localPath(key?: keyof T, ...innerKeys: string[]): string[] {
    const stepPath = this.$boundPath ?? this.$metadata.get(CURRENT_STEP, []);
    const allKeys = key ? [key as string, ...innerKeys] : innerKeys;
    return [PREFIX, ...stepPath, ...allKeys];
  }
}
