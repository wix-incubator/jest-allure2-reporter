import { randomBytes } from 'node:crypto';
import path from 'node:path';

import type { AllureTestCaseResult, AllureTestStepResult } from 'jest-allure2-reporter';
import { v4, v5, validate } from 'uuid';

import type { AllureTestResult, AllureTestResultContainer, AllureWriter } from '../serialization';
import { log } from '../logger';
import { md5 } from '../utils';

type CreateTestArguments = {
  resultsDir: string;
  writer: AllureWriter;
  containerName: string;
  test: AllureTestCaseResult;
};

export async function writeTest({ resultsDir, writer, test, containerName }: CreateTestArguments) {
  const testResult: AllureTestResult = {
    uuid: test.uuid,
    historyId: test.historyId,
    displayName: test.displayName,
    fullName: test.fullName,
    start: test.start,
    stop: test.stop,
    description: test.description,
    descriptionHtml: test.descriptionHtml,
    stage: test.stage,
    status: test.status,
    statusDetails: test.statusDetails,
    labels: test.labels,
    links: test.links,
    steps: [],
    attachments: test.attachments,
    parameters: test.parameters,
  };

  const testUUID = ensureUUID(testResult);
  hashHistoryId(testResult);
  normalizeDisplayName(testResult);
  normalizeAttachments(resultsDir, testResult);
  normalizeParameters(testResult);
  normalizeDescription(testResult);

  const testContainer: AllureTestResultContainer = {
    uuid: v5(testUUID, '6ba7b810-9dad-11d1-80b4-00c04fd430c8'),
    name: containerName,
    children: [testUUID],
    befores: [],
    afters: [],
  };

  if (test.steps && testResult.steps) {
    for (const step of test.steps) {
      normalizeDisplayName(step);
      normalizeAttachments(resultsDir, step);
      normalizeParameters(step);

      if (!step.hookType) {
        testResult.steps.push(step);
      } else if (step.hookType.startsWith('before')) {
        testContainer.befores.push(step);
      } else if (step.hookType.startsWith('after')) {
        testContainer.afters.push(step);
      } else {
        log.warn({ data: step }, `Unknown hook type: ${step.hookType}`);
      }
    }
  }

  await writer.writeContainer(testContainer);
  await writer.writeResult(testResult);
}

function ensureUUID(result: AllureTestResult) {
  const { uuid, fullName } = result;
  if (uuid && !validate(uuid)) {
    log.warn(`Detected invalid "uuid" (${uuid}) in test: ${fullName}`);
    return (result.uuid = v4());
  }

  if (!uuid) {
    return (result.uuid = v4());
  }

  return uuid;
}

function hashHistoryId(result: AllureTestResult) {
  const { fullName, historyId } = result;
  if (!historyId) {
    log.warn(`Detected empty "historyId" in test: ${fullName}`);
    result.historyId = md5(randomBytes(16));
  }

  result.historyId = md5(String(historyId));
}

function normalizeParameters(result: AllureTestResult | AllureTestStepResult) {
  if (result.parameters) {
    for (const parameter of result.parameters) {
      parameter.value = String(parameter.value);
    }
  }
}

function normalizeAttachments(
  rootDirectory: string,
  result: AllureTestResult | AllureTestStepResult,
) {
  if (result.attachments) {
    for (const attachment of result.attachments) {
      const source = path.relative(rootDirectory, attachment.source);
      if (!source.startsWith('..')) {
        attachment.source = source;
      }
    }
  }
}

function normalizeDescription(result: AllureTestResult) {
  if (result.descriptionHtml) {
    delete result.description;
  }
}

function normalizeDisplayName(result: AllureTestResult | AllureTestStepResult) {
  if (result.displayName) {
    const violation: any = result;
    violation.name = result.displayName;
    delete violation.displayName;
  }
}
