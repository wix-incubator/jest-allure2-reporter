import type {
  AllureTestItemMetadata,
  AllureTestFileMetadata,
  AllureTestCaseMetadata,
  AllureTestStepMetadata,
} from 'jest-allure2-reporter';

export function mergeTestFileMetadata(
  a: AllureTestFileMetadata,
  b: AllureTestFileMetadata | undefined,
): AllureTestFileMetadata {
  return b
    ? {
        ...mergeTestItemMetadata(a, b),
        code: undefined,
        steps: undefined,
        workerId: b.workerId ?? a.workerId,
      }
    : a;
}

export function mergeTestCaseMetadata(
  a: AllureTestCaseMetadata,
  b: AllureTestCaseMetadata | undefined,
): AllureTestCaseMetadata {
  return b
    ? {
        ...mergeTestItemMetadata(a, b),
        descriptionHtml: mergeArrays(a.descriptionHtml, b.descriptionHtml),
        historyId: b.historyId ?? a.historyId,
        labels: mergeArrays(a.labels, b.labels),
        links: mergeArrays(a.links, b.links),
      }
    : a;
}

export function mergeTestStepMetadata(
  a: AllureTestStepMetadata,
  b: AllureTestStepMetadata | undefined,
): AllureTestStepMetadata {
  return b
    ? {
        ...mergeTestItemMetadata(a, b),
        hookType: b.hookType ?? a.hookType,
      }
    : a;
}

function mergeTestItemMetadata(
  a: AllureTestItemMetadata,
  b: AllureTestItemMetadata | undefined,
): AllureTestItemMetadata {
  return b
    ? {
        attachments: mergeArrays(a.attachments, b.attachments),
        currentStep: b.currentStep ?? a.currentStep,
        sourceCode: b.sourceCode ?? a.sourceCode,
        sourceLocation: b.sourceLocation ?? a.sourceLocation,
        description: mergeArrays(a.description, b.description),
        parameters: mergeArrays(a.parameters, b.parameters),
        stage: b.stage ?? a.stage,
        start: b.start ?? a.start,
        status: b.status ?? a.status,
        statusDetails: b.statusDetails ?? a.statusDetails,
        steps: b.steps ?? a.steps,
        stop: b.stop ?? a.stop,
      }
    : a;
}

function mergeArrays<T>(
  a: T[] | undefined,
  b: T[] | undefined,
): T[] | undefined {
  if (a && b) {
    return [...a, ...b];
  }

  return a ?? b;
}
