import type {
  AllureTestItemMetadata,
  AllureTestFileMetadata,
  AllureTestCaseMetadata,
  AllureTestStepMetadata,
  AllureTestStepPath,
  Stage,
  Status,
  StatusDetails,
} from 'jest-allure2-reporter';

export function mergeTestFileMetadata(
  a: AllureTestFileMetadata,
  b: AllureTestFileMetadata | undefined,
): AllureTestFileMetadata {
  return mergeTestCaseMetadata(a, b);
}

export function mergeTestCaseMetadata(
  a: AllureTestCaseMetadata,
  b: AllureTestCaseMetadata | undefined,
): AllureTestCaseMetadata {
  return b
    ? {
        ...mergeTestItemMetadata(a, b),
        description: mergeArrays(a.description, b.description),
        descriptionHtml: mergeArrays(a.descriptionHtml, b.descriptionHtml),
        historyId: b.historyId ?? a.historyId,
        labels: mergeArrays(a.labels, b.labels),
        links: mergeArrays(a.links, b.links),
        workerId: b.workerId ?? a.workerId,
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
        steps: mergeArrays(a.steps, b.steps)?.map((step) =>
          mergeTestStepMetadata({}, step),
        ),
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
        currentStep: mergeCurrentStep(a, b),
        displayName: b.displayName ?? a.displayName,
        sourceCode: b.sourceCode ?? a.sourceCode,
        sourceLocation: b.sourceLocation ?? a.sourceLocation,
        parameters: mergeArrays(a.parameters, b.parameters),
        stage: mergeStage(b.stage, a.stage),
        start: min(b.start, a.start),
        status: mergeStatus(a.status, b.status),
        statusDetails: mergeStatusDetails(a, b),
        stop: max(b.stop, a.stop),
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

function min(a: number | undefined, b: number | undefined): number | undefined {
  if (a != null && b != null) {
    return Math.min(a, b);
  }

  return a ?? b;
}

function max(a: number | undefined, b: number | undefined): number | undefined {
  if (a != null && b != null) {
    return Math.max(a, b);
  }

  return a ?? b;
}

function mergeStage(
  a: Stage | undefined,
  b: Stage | undefined,
): Stage | undefined {
  if (a === 'interrupted' || b === 'interrupted') {
    return 'interrupted';
  }

  return b ?? a;
}

function mergeStatus(
  a: Status | undefined,
  b: Status | undefined,
): Status | undefined {
  if (a === 'broken' || b === 'broken') {
    return 'broken';
  }

  if (a === 'failed' || b === 'failed') {
    return 'failed';
  }

  return b ?? a;
}

function mergeStatusDetails(
  a: AllureTestItemMetadata,
  b: AllureTestItemMetadata,
): StatusDetails | undefined {
  if (a.status === 'broken') {
    return a.statusDetails;
  }

  if (b.status === 'broken') {
    return b.statusDetails;
  }

  if (a.status === 'failed') {
    return a.statusDetails;
  }

  if (b.status === 'failed') {
    return b.statusDetails;
  }

  return b.statusDetails ?? a.statusDetails;
}

function mergeCurrentStep(
  a: AllureTestItemMetadata,
  b: AllureTestItemMetadata,
): AllureTestStepPath | undefined {
  if (a.stage === 'interrupted') {
    return a.currentStep;
  }

  if (b.stage === 'interrupted') {
    return b.currentStep;
  }

  return b.currentStep ?? a.currentStep;
}
