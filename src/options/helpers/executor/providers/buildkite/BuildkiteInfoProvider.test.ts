import { BuildkiteInfoProvider } from './BuildkiteInfoProvider';

describe('BuildkiteInfoProvider', () => {
  const environment = {
    BUILDKITE: 'true',
    BUILDKITE_AGENT_NAME: 'Buildkite Agent',
    BUILDKITE_BUILD_URL: 'https://buildkite.com/owner/repo/builds/123',
    BUILDKITE_BUILD_NUMBER: '123',
  };

  it('should return Buildkite info when enabled', async () => {
    const provider = new BuildkiteInfoProvider(environment);
    expect(provider.enabled).toBe(true);

    const info = await provider.getExecutorInfo();
    expect(info).toEqual({
      name: expect.stringContaining('Buildkite Agent'),
      type: 'buildkite',
      buildUrl: 'https://buildkite.com/owner/repo/builds/123',
      buildOrder: 123,
      buildName: '#123',
    });
  });

  it('should return default info when not enabled', async () => {
    const provider = new BuildkiteInfoProvider({});
    expect(provider.enabled).toBe(false);

    const info = await provider.getExecutorInfo();
    expect(info).toEqual({
      name: expect.stringContaining('Buildkite'),
      type: 'buildkite',
      buildUrl: undefined,
      buildOrder: Number.NaN,
      buildName: '#undefined',
    });
  });
});
