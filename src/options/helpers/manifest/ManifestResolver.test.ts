import { ManifestResolver } from './ManifestResolver';

describe('manifest', () => {
  const manifestResolver = new ManifestResolver(
    process.cwd(),
    jest.requireActual,
  );

  const manifest = manifestResolver.extract;

  it('should return the entire package.json content of the current package when called without arguments', async () => {
    const result = await manifest();
    expect(result).toHaveProperty('version');
    expect(result).toHaveProperty('name', 'jest-allure2-reporter');
  });

  it('should return the entire package.json content of the specified package when called with a string argument', async () => {
    const result = await manifest('lodash');
    expect(result).toHaveProperty('version');
    expect(result).toHaveProperty('name', 'lodash');
  });

  it('should return a specific property of the package.json content of the current package when called with a callback', async () => {
    const version = await manifest((m) => m.version);
    expect(typeof version).toBe('string');
  });

  it('should return a specific property of the package.json content of the specified package when called with a string argument and a callback', async () => {
    const version = await manifest('lodash', (m) => m.version);
    expect(typeof version).toBe('string');
  });
});