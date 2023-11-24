import os from 'node:os';

import type { ExecutorCustomizer } from 'jest-allure2-reporter';
import type { ExecutorInfo } from '@noomorph/allure-js-commons';

export function executor(): ExecutorCustomizer {
  if (process.env.GITHUB_ACTIONS) return githubActions;
  if (process.env.BUILDKITE) return buildkite;

  return local;
}

function githubActions(): ExecutorInfo {
  const {
    ALLURE_GITHUB_URL,
    GITHUB_RUN_ATTEMPT,
    GITHUB_RUN_ID,
    GITHUB_RUN_NUMBER,
    GITHUB_JOB,
    RUNNER_NAME,
  } = process.env;

  const runnerName = RUNNER_NAME || 'GitHub Actions';

  return {
    name: `${runnerName} (${getOsDetails()})`,
    type: 'github',
    buildUrl: ALLURE_GITHUB_URL,
    buildOrder: Number(GITHUB_RUN_NUMBER) * 10 + Number(GITHUB_RUN_ATTEMPT),
    buildName: `${GITHUB_RUN_ID}#${GITHUB_JOB}`,
  };
}

function buildkite(): ExecutorInfo {
  const { BUILDKITE_AGENT_NAME, BUILDKITE_BUILD_URL, BUILDKITE_BUILD_NUMBER } =
    process.env;
  const agentName = BUILDKITE_AGENT_NAME || 'Buildkite';

  return {
    name: `${agentName} (${getOsDetails()})`,
    type: 'buildkite',
    buildUrl: BUILDKITE_BUILD_URL,
    buildOrder: Number(BUILDKITE_BUILD_NUMBER),
    buildName: `#${BUILDKITE_BUILD_NUMBER}`,
  };
}

function local(): ExecutorInfo {
  return {
    name: `${os.hostname()} (${getOsDetails()})`,
    type: `${os.platform()}-${os.arch()}`,
  };
}

function getOsDetails(): string {
  return `${os.type()} ${os.release()}/${os.arch()}`;
}
