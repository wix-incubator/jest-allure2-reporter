import { describe, expect, it } from '@jest/globals';

import { isLibraryPath } from './isLibraryPath';

describe('isLibraryPath', () => {
  it('should return true for a node_modules path (POSIX)', () => {
    expect(isLibraryPath('/home/x/node_modules/foo/bar')).toBe(true);
  });

  it('should return true for a node_modules path (Windows)', () => {
    expect(isLibraryPath('D:\\Project\\node_modules\\foo\\bar')).toBe(true);
  });

  it('should return false for a non-node_modules path', () => {
    expect(isLibraryPath('foo/bar')).toBe(false);
  });

  it('should return false for an empty path', () => {
    expect(isLibraryPath('')).toBe(false);
  });

  it('should return false for a null path', () => {
    expect(isLibraryPath(null as any)).toBe(false);
  });
});
