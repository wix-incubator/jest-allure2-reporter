import fetch from 'node-fetch';
import snakeCase from 'lodash.snakecase';
import type { Plugin, PluginConstructor } from 'jest-allure2-reporter';

export const githubPlugin: PluginConstructor = () => {
  const plugin: Plugin = {
    name: 'jest-allure2-reporter/plugins/github',
    async globalContext() {
      const {
        GITHUB_ACTIONS,
        GITHUB_JOB,
        GITHUB_REPOSITORY,
        GITHUB_RUN_ATTEMPT,
        GITHUB_RUN_ID,
        GITHUB_SERVER_URL,
        GITHUB_TOKEN,
      } = process.env;

      if (!GITHUB_ACTIONS) {
        return;
      }

      const apiUrl = `https://api.github.com/repos/${GITHUB_REPOSITORY}/actions/runs/${GITHUB_RUN_ID}/attempts/${GITHUB_RUN_ATTEMPT}/jobs`;
      const headers: HeadersInit = {
        Accept: 'application/vnd.github.v3+json',
      };
      if (GITHUB_TOKEN) {
        headers.Authorization = `token ${GITHUB_TOKEN}`;
      }

      try {
        const response = await fetch(apiUrl, { headers });
        if (!response.ok) {
          // convert to http error
          throw new Error(`HTTP ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const job =
          data.jobs.length === 1
            ? data.jobs[0]
            : data.jobs.find((job: any) => snakeCase(job.name) === GITHUB_JOB);

        if (job) {
          process.env.ALLURE_GITHUB_JOB_ID = job.id;
          process.env.ALLURE_GITHUB_URL = job.html_url;
        }
      } catch (error: unknown) {
        // TODO: migrate to bunyamin
        console.error(`Failed to fetch job ID from: ${apiUrl}\nReason:`, error);
      }

      process.env.ALLURE_GITHUB_URL ||= `${GITHUB_SERVER_URL}/${GITHUB_REPOSITORY}/actions/runs/${GITHUB_RUN_ID}`;
    },
  };

  return plugin;
};
