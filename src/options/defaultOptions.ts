import path from 'node:path';

import type { TestCaseResult } from '@jest/reporters';
import type { Attachment, StatusDetails } from '@noomorph/allure-js-commons';
import { Stage, Status } from '@noomorph/allure-js-commons';
import type { PluginContext } from 'jest-allure2-reporter';
import type {
  ExtractorContext,
  ReporterConfig,
  ResolvedTestCaseCustomizer,
  ResolvedTestStepCustomizer,
} from 'jest-allure2-reporter';

import * as plugins from '../builtin-plugins';

import { stripStatusDetails } from './stripStatusDetails';
import { aggregateLabelCustomizers } from './aggregateLabelCustomizers';
import { resolvePlugins } from './resolvePlugins';
import { composeExtractors } from './composeExtractors';
import { DEFAULT_CATEGORIES } from './defaultCategories';

const identity = <T>(context: ExtractorContext<T>) => context.value;
const last = <T>(context: ExtractorContext<T[]>) => context.value?.at(-1);
const all = identity;

export function defaultOptions(context: PluginContext): ReporterConfig {
  const testCase: ResolvedTestCaseCustomizer = {
    historyId: ({ testCase }) => testCase.fullName,
    name: ({ testCase }) => testCase.title,
    fullName: ({ testCase }) => testCase.fullName,
    description: ({ testCaseMetadata }) => {
      const text = testCaseMetadata.description?.join('\n') ?? '';
      const code = testCaseMetadata.code?.length
        ? '```javascript\n' + testCaseMetadata.code.join('\n\n') + '\n```'
        : '';
      return [text, code].filter(Boolean).join('\n\n');
    },
    descriptionHtml: () => void 0,
    start: ({ testCase, testCaseMetadata }) =>
      testCaseMetadata.start ??
      (testCaseMetadata.stop ?? Date.now()) - (testCase.duration ?? 0),
    stop: ({ testCaseMetadata }) => testCaseMetadata.stop ?? Date.now(),
    stage: ({ testCase }) => getTestCaseStage(testCase),
    status: ({ testCase, testCaseMetadata }) =>
      testCaseMetadata.status ?? getTestCaseStatus(testCase),
    statusDetails: ({ testCase, testCaseMetadata }) =>
      stripStatusDetails(
        testCaseMetadata.statusDetails ?? getTestCaseStatusDetails(testCase),
      ),
    attachments: ({ config, testCaseMetadata }) =>
      (testCaseMetadata.attachments ?? []).map(relativizeAttachment, config),
    parameters: ({ testCaseMetadata }) => testCaseMetadata.parameters ?? [],
    labels: composeExtractors(
      aggregateLabelCustomizers({
        package: last,
        testClass: last,
        testMethod: last,
        parentSuite: last,
        suite: ({ testCase, testFile }) =>
          testCase.ancestorTitles[0] ?? path.basename(testFile.testFilePath),
        subSuite: ({ testCase }) => testCase.ancestorTitles.slice(1).join(' '),
        epic: all,
        feature: all,
        story: all,
        thread: ({ testCaseMetadata }) => testCaseMetadata.workerId,
        severity: last,
        tag: all,
        owner: last,
      }),
      ({ testCaseMetadata }) => testCaseMetadata.labels ?? [],
    ),
    links: ({ testCaseMetadata }) => testCaseMetadata.links ?? [],
  };

  const testStep: ResolvedTestStepCustomizer = {
    name: ({ testStepMetadata }) => testStepMetadata.name,
    start: ({ testStepMetadata }) => testStepMetadata.start,
    stop: ({ testStepMetadata }) => testStepMetadata.stop,
    stage: ({ testStepMetadata }) => testStepMetadata.stage,
    status: ({ testStepMetadata }) => testStepMetadata.status,
    statusDetails: ({ testStepMetadata }) =>
      stripStatusDetails(testStepMetadata.statusDetails),
    attachments: ({ testStepMetadata }) => testStepMetadata.attachments ?? [],
    parameters: ({ testStepMetadata }) => testStepMetadata.parameters ?? [],
  };

  const config: ReporterConfig = {
    overwrite: true,
    resultsDir: 'allure-results',
    attachments: {
      subDir: 'attachments',
      fileHandler: 'ref',
    },
    testCase,
    testStep,
    environment: identity,
    executor: identity,
    categories: () => DEFAULT_CATEGORIES,
    plugins: resolvePlugins(context, [
      plugins.jsdoc,
      plugins.manifest,
      plugins.prettier,
      plugins.remark,
    ]),
  };

  return config;
}

function getTestCaseStatus(testCase: TestCaseResult): Status {
  const hasErrors = testCase.failureMessages?.length > 0;
  switch (testCase.status) {
    case 'passed': {
      return Status.PASSED;
    }
    case 'failed': {
      return Status.FAILED;
    }
    case 'skipped': {
      return Status.SKIPPED;
    }
    case 'pending':
    case 'todo':
    case 'disabled': {
      return Status.SKIPPED;
    }
    case 'focused': {
      return hasErrors ? Status.FAILED : Status.PASSED;
    }
    default: {
      return 'unknown' as Status;
    }
  }
}

function getTestCaseStage(testCase: TestCaseResult): Stage {
  switch (testCase.status) {
    case 'passed':
    case 'focused':
    case 'failed': {
      return Stage.FINISHED;
    }
    case 'todo':
    case 'disabled':
    case 'pending':
    case 'skipped': {
      return Stage.PENDING;
    }
    default: {
      return Stage.INTERRUPTED;
    }
  }
}

function getTestCaseStatusDetails(
  testCase: TestCaseResult,
): StatusDetails | undefined {
  const message = (testCase.failureMessages ?? []).join('\n');
  return message
    ? stripStatusDetails({
        message: message.split('\n', 1)[0],
        trace: message,
      })
    : undefined;
}

function relativizeAttachment(
  this: ReporterConfig,
  attachment: Attachment,
): Attachment {
  return {
    ...attachment,
    source: path.relative(this.resultsDir, attachment.source),
  };
}
