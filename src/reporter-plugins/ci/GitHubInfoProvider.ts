import fetch from 'node-fetch';
import snakeCase from 'lodash.snakecase';
import type { ExecutorInfo } from 'jest-allure2-reporter';

import type { ExecutorInfoProvider } from './ExecutorInfoProvider';
import { getOSDetails } from './utils';

export interface GitHubEnvironment {
  GITHUB_ACTIONS: string;
  GITHUB_JOB: string;
  GITHUB_REPOSITORY: string;
  GITHUB_RUN_ATTEMPT: string;
  GITHUB_RUN_ID: string;
  GITHUB_RUN_NUMBER: string;
  GITHUB_SERVER_URL: string;
  GITHUB_TOKEN: string;
  RUNNER_NAME?: string;
}

type Job = {
  id: string;
  name: string;
  html_url: string;
};

export class GitHubInfoProvider implements ExecutorInfoProvider {
  constructor(private readonly environment: Partial<GitHubEnvironment>) {}

  get enabled() {
    return !!this.environment.GITHUB_ACTIONS;
  }

  async getExecutorInfo(): Promise<ExecutorInfo> {
    const job = await this._fetchJob();

    const {
      GITHUB_RUN_ATTEMPT,
      GITHUB_RUN_ID,
      GITHUB_RUN_NUMBER,
      GITHUB_JOB,
      RUNNER_NAME,
      GITHUB_SERVER_URL,
      GITHUB_REPOSITORY,
    } = this.environment;

    const runnerName = RUNNER_NAME || 'GitHub Actions';
    const buildUrl = job
      ? job.html_url
      : `${GITHUB_SERVER_URL}/${GITHUB_REPOSITORY}/actions/runs/${GITHUB_RUN_ID}`;

    return {
      name: `${runnerName} (${getOSDetails()})`,
      type: 'github',
      buildUrl,
      buildOrder: Number(GITHUB_RUN_NUMBER) * 10 + Number(GITHUB_RUN_ATTEMPT),
      buildName: `${GITHUB_RUN_ID}#${GITHUB_JOB}`,
    };
  }

  private async _fetchJob(): Promise<Job | undefined> {
    const url = this._buildApiUrl();

    try {
      const data = await this._fetchJobs(url);
      return this._findJob(data.jobs);
    } catch (error: unknown) {
      console.error(`Failed to fetch job ID from: ${url}\nReason:`, error);
      return;
    }
  }

  private async _fetchJobs(url: string) {
    if (!this.environment.GITHUB_TOKEN) {
      return { jobs: [] };
    }

    const headers = {
      Accept: 'application/vnd.github.v3+json',
      Authorization: `token ${this.environment.GITHUB_TOKEN}`,
    };

    const response = await fetch(url, { headers });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} ${response.statusText}`);
    }

    return await response.json();
  }

  private _buildApiUrl(): string {
    const { GITHUB_REPOSITORY, GITHUB_RUN_ID, GITHUB_RUN_ATTEMPT } =
      this.environment;
    return `https://api.github.com/repos/${GITHUB_REPOSITORY}/actions/runs/${GITHUB_RUN_ID}/attempts/${GITHUB_RUN_ATTEMPT}/jobs`;
  }

  private _findJob(jobs: Job[]): Job | undefined {
    const { GITHUB_JOB } = this.environment;

    return jobs.length === 1
      ? jobs[0]
      : jobs.find((job) => snakeCase(job.name) === GITHUB_JOB);
  }
}
