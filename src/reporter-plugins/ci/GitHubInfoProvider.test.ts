/* eslint-disable @typescript-eslint/consistent-type-imports */
jest.mock('node-fetch');

import {
  type GitHubEnvironment,
  GitHubInfoProvider,
} from './GitHubInfoProvider';

describe('GitHubInfoProvider', () => {
  const apiUrl =
    'https://api.github.com/repos/owner/repo/actions/runs/123/attempts/1/jobs';

  let fetch: jest.MockedFunction<typeof import('node-fetch')>;
  let environment: Partial<GitHubEnvironment>;

  beforeEach(() => {
    environment = {
      GITHUB_ACTIONS: 'true',
      GITHUB_JOB: 'test_job',
      GITHUB_REPOSITORY: 'owner/repo',
      GITHUB_RUN_ATTEMPT: '1',
      GITHUB_RUN_ID: '123',
      GITHUB_RUN_NUMBER: '10',
      GITHUB_SERVER_URL: 'https://github.com',
      GITHUB_TOKEN: 'my_token',
      RUNNER_NAME: 'GitHub Runner',
    };
  });

  beforeEach(() => {
    fetch = jest.requireMock('node-fetch');
    fetch.mockClear();
  });

  const mockSuccessResponse = (jobs: any[]) => ({
    ok: true,
    json: jest.fn().mockResolvedValue({ jobs }),
  });

  it('should be disabled if GITHUB_ACTIONS env var is undefined', () => {
    const provider = new GitHubInfoProvider({
      ...environment,
      GITHUB_ACTIONS: '',
    });

    expect(provider.enabled).toBe(false);
  });

  it('should be enabled if GITHUB_ACTIONS env var is defined', () => {
    const provider = new GitHubInfoProvider({
      ...environment,
      GITHUB_ACTIONS: '',
    });

    expect(provider.enabled).toBe(false);
  });

  it('should return executor info when API request is successful', async () => {
    const jobInfo = {
      id: 'job_id',
      name: 'Test Job',
      html_url: 'https://github.com/owner/repo/actions/runs/123#test_job',
    };

    fetch.mockResolvedValueOnce(mockSuccessResponse([jobInfo]) as any);

    const provider = new GitHubInfoProvider(environment);
    const info = await provider.getExecutorInfo();

    expect(info).toEqual({
      name: expect.stringContaining('GitHub Runner'),
      type: 'github',
      buildUrl: jobInfo.html_url,
      buildOrder: 101,
      buildName: '123#test_job',
    });
  });

  it('should return executor info with fallback URL when job is not found', async () => {
    fetch.mockResolvedValueOnce(mockSuccessResponse([]) as any);

    const provider = new GitHubInfoProvider(environment);
    const info = await provider.getExecutorInfo();

    expect(info).toEqual({
      name: expect.stringContaining('GitHub Runner'),
      type: 'github',
      buildUrl: 'https://github.com/owner/repo/actions/runs/123',
      buildOrder: 101,
      buildName: '123#test_job',
    });
  });

  it('should return executor info with fallback URL when API request fails', async () => {
    const mockError = new Error('API error');
    fetch.mockRejectedValueOnce(mockError);
    jest.spyOn(console, 'error').mockReturnValueOnce();

    const provider = new GitHubInfoProvider(environment);
    const info = await provider.getExecutorInfo();

    expect(info).toEqual({
      name: expect.stringContaining('GitHub Runner'),
      type: 'github',
      buildUrl: 'https://github.com/owner/repo/actions/runs/123',
      buildOrder: 101,
      buildName: '123#test_job',
    });
  });

  it('should return executor info with fallback URL when token is not provided', async () => {
    delete environment.GITHUB_TOKEN;

    const provider = new GitHubInfoProvider(environment);
    const info = await provider.getExecutorInfo();

    expect(info).toEqual({
      name: expect.stringContaining('GitHub Runner'),
      type: 'github',
      buildUrl: 'https://github.com/owner/repo/actions/runs/123',
      buildOrder: 101,
      buildName: '123#test_job',
    });
    expect(fetch).not.toHaveBeenCalled();
  });

  it('should include authorization header when githubToken is provided', async () => {
    fetch.mockResolvedValueOnce(mockSuccessResponse([]) as any);

    const provider = new GitHubInfoProvider(environment);
    await provider.getExecutorInfo();

    expect(fetch).toHaveBeenCalledWith(apiUrl, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: 'token my_token',
      },
    });
  });
});
