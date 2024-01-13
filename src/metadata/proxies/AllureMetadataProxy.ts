import type { Metadata } from 'jest-metadata';

import { PREFIX } from '../constants';

export class AllureMetadataProxy<T = unknown> {
  protected readonly $metadata: Metadata;

  constructor(metadata: Metadata) {
    this.$metadata = metadata;
  }

  get id(): string {
    return this.$metadata.id;
  }

  get<V>(path?: keyof T, fallbackValue?: V): V {
    const fullPath = this.$localPath(path);
    return this.$metadata.get(fullPath, fallbackValue);
  }

  set(path: keyof T, value: T[keyof T]): this {
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
    const allKeys = key ? [key as string, ...innerKeys] : innerKeys;
    return [PREFIX, ...allKeys];
  }
}
