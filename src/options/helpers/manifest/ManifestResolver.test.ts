import { describe, expect, it, jest } from '@jest/globals';

import { ManifestResolver } from './ManifestResolver';

describe('manifest', () => {
  const manifestResolver = new ManifestResolver(process.cwd(), jest.requireActual);

  const manifest = manifestResolver.extract;

  it('should return the entire package.json content of the current package', async () => {
    const result = await manifest('');
    expect(result).toHaveProperty('version');
    expect(result).toHaveProperty('name', 'jest-allure2-reporter');
  });

  it('should return the entire package.json content of the specified package', async () => {
    const result = await manifest('lodash');
    expect(result).toHaveProperty('version');
    expect(result).toHaveProperty('name', 'lodash');
  });

  it('should return a specific property of the package.json content of the current package', async () => {
    const version = await manifest((m) => m.version);
    expect(typeof version).toBe('string');
  });

  it('should return a fallback if the specified property is not found in the current package', async () => {
    const value = await manifest((m) => m.someProperty, 'fallback');
    expect(value).toBe('fallback');
  });

  it('should return a specific property of the package.json content of the specified package', async () => {
    const version = await manifest('lodash', (m) => m.version);
    expect(typeof version).toBe('string');
  });

  it('should provide more convenient access to current manifest properties', async () => {
    const name1 = await manifest(['name']);
    const name2 = await manifest((p) => p.name);
    expect(name1).toBe(name2);
  });

  it('should return a fallback if the specified property is not found in the specified package', async () => {
    const value = await manifest('lodash', 'someProperty', 'fallback');
    expect(value).toBe('fallback');
  });

  it('should provide more convenient access to other manifest properties', async () => {
    const name1 = await manifest('lodash', 'name');
    const name2 = await manifest('lodash', ['name']);
    const name3 = await manifest('lodash', (p) => p.name);

    expect(name1).toBe(name2);
    expect(name2).toBe(name3);
  });

  it('should use a fallback value if the manifest is not found', async () => {
    const result = await manifest('non-existing-package', ['name'], '-');
    expect(result).toBe('-');
  });
});
