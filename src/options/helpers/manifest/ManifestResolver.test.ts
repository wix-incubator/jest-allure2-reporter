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
    const version = await manifest('', (m) => m.version);
    expect(typeof version).toBe('string');
  });

  it('should return a specific property of the package.json content of the specified package', async () => {
    const version = await manifest('lodash', (m) => m.version);
    expect(typeof version).toBe('string');
  });
});
