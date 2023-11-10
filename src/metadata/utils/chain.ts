import type { Metadata } from 'jest-metadata';

import { PREFIX } from '../../constants';
import type {
  MetadataSquasherContext,
  MetadataSquasherMapping,
} from '../MetadataSquasher';

export function chain<T extends object, K extends keyof T>(
  sources: (keyof MetadataSquasherContext)[],
): MetadataSquasherMapping<T, K> {
  return (context: MetadataSquasherContext, key: K) => {
    const path = [PREFIX, key as string];
    const metadatas: Metadata[] = sources.flatMap((sourceName) => {
      const value: Metadata | Metadata[] | undefined = context[sourceName];
      if (!value) return [];
      return Array.isArray(value) ? value : [value];
    });

    return metadatas.flatMap((metadata) => metadata.get(path, [])) as T[K];
  };
}

export function chainLast<T extends object, K extends keyof T>(
  sources: (keyof MetadataSquasherContext)[],
): MetadataSquasherMapping<T, K> {
  const function_ = chain<T, K>(sources);

  return (context: MetadataSquasherContext, key: K) => {
    return (function_(context, key) as unknown as any[]).pop();
  };
}
