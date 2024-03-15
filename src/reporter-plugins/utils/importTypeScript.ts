/* eslint-disable import/no-extraneous-dependencies,node/no-unpublished-import */
import type TypeScript from 'typescript';

export async function importTypeScript(): Promise<typeof TypeScript | null> {
  const ts = await import('typescript').catch(() => null);
  if (ts) {
    return ts.default;
  }

  return ts;
}
