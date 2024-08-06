jest.mock('../logger');

import path from 'node:path';

import { log } from '../logger';

import { FileNavigatorCache } from './FileNavigatorCache';

const __FIXTURES__ = path.join(__dirname, '__fixtures__');

describe('FileNavigatorCache', () => {
  test('should handle non-existent sourcemap', async () => {
    const cache = new FileNavigatorCache();
    await cache.scanSourcemap(path.join(__FIXTURES__, 'non-existent'));
    await expect(cache.resolve(path.join(__FIXTURES__, 'test.ts'))).resolves.toBeUndefined();
    expect(log.error).not.toHaveBeenCalled();
  });

  test('should handle a broken sourcemap', async () => {
    const cache = new FileNavigatorCache();
    await cache.scanSourcemap(path.join(__FIXTURES__, 'broken'));
    await expect(cache.resolve(path.join(__FIXTURES__, 'test.ts'))).resolves.toBeUndefined();
    expect(log.error).toHaveBeenCalled();
  });

  test('should handle an empty sourcemap', async () => {
    const cache = new FileNavigatorCache();
    await cache.scanSourcemap(path.join(__FIXTURES__, 'empty'));
    await expect(cache.resolve(path.join(__FIXTURES__, 'test.ts'))).resolves.toBeUndefined();
  });

  test('should handle a simple sourcemap', async () => {
    const cache = new FileNavigatorCache();
    await cache.scanSourcemap(path.join(__FIXTURES__, 'simple'));
    await expect(cache.resolve(path.join(__FIXTURES__, 'test.ts'))).resolves.toBeDefined();
  });

  test('should handle a sourcemap with a sourceRoot', async () => {
    const cache = new FileNavigatorCache();
    await cache.scanSourcemap(path.join(__FIXTURES__, 'with-root'));
    await expect(cache.resolve('/home/user/project/test.ts')).resolves.toBeDefined();
  });
});
