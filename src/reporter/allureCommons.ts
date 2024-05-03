import type { AllureTestStepResult, AllureTestCaseResult, Parameter } from 'jest-allure2-reporter';
import type {
  AllureGroup,
  AllureRuntime,
  Parameter as AllureParameter,
  ExecutableItemWrapper,
  Stage,
  Status,
} from '@noomorph/allure-js-commons';

import { AllureReporterError } from '../errors';

type CreateTestArguments = {
  runtime: AllureRuntime;
  containerName: string;
  test: AllureTestCaseResult;
};

export function writeTest({ runtime, test, containerName }: CreateTestArguments) {
  const allureGroup = runtime.startGroup(containerName);
  const allureTest = allureGroup.startTest();
  const hooks = test.steps?.filter((step) => step.hookType !== undefined);
  const steps = test.steps?.filter((step) => step.hookType === undefined);

  fillStep(allureTest, { ...test, steps });

  // TODO: migrate to own serialization
  // if (test.uuid) {
  //   Object.assign(allureTest.wrappedItem, { uuid: test.uuid });
  //   merge(allureGroup, {
  //     testResultContainer: { uuid: v5(test.uuid, '6ba7b810-9dad-11d1-80b4-00c04fd430c8') },
  //   });
  // }

  if (test.historyId) {
    // The string casting + MD5 hashing hould happen in options/override/historyId.ts
    allureTest.historyId = test.historyId as string;
  }
  if (test.fullName) {
    allureTest.fullName = test.fullName;
  }
  if (test.description) {
    allureTest.description = test.description;
  }
  if (test.descriptionHtml) {
    allureTest.descriptionHtml = test.descriptionHtml;
  }
  if (test.links) {
    for (const link of test.links) {
      allureTest.addLink(link.url, link.name, link.type);
    }
  }
  if (test.labels) {
    for (const label of test.labels) {
      allureTest.addLabel(label.name, label.value);
    }
  }
  if (hooks) {
    for (const step of hooks) {
      const executable = createStepExecutable(allureGroup, step.hookType);
      fillStep(executable, step);
    }
  }

  allureTest.endTest(test.stop);
  allureGroup.endGroup();
}

function fillStep(
  executable: ExecutableItemWrapper,
  step: AllureTestCaseResult | AllureTestStepResult,
) {
  if (step.displayName !== undefined) {
    executable.name = step.displayName;
  }
  if (step.start !== undefined) {
    executable.wrappedItem.start = step.start;
  }
  if (step.stop !== undefined) {
    executable.wrappedItem.stop = step.stop;
  }
  if (step.stage !== undefined) {
    executable.stage = step.stage as string as Stage;
  }
  if (step.status !== undefined) {
    executable.status = step.status as string as Status;
  }
  if (step.statusDetails !== undefined) {
    executable.statusDetails = step.statusDetails;
  }
  if (step.attachments !== undefined) {
    executable.wrappedItem.attachments = step.attachments;
  }
  if (step.parameters) {
    executable.wrappedItem.parameters = step.parameters.map(stringifyParameter);
  }
  if (step.steps) {
    for (const innerStep of step.steps) {
      fillStep(executable.startStep(innerStep.displayName ?? '', innerStep.start), innerStep);
    }
  }
}

function stringifyParameter(parameter: Parameter): AllureParameter {
  return { ...parameter, value: String(parameter.value) };
}

function createStepExecutable(parent: AllureGroup, hookType: AllureTestStepResult['hookType']) {
  switch (hookType) {
    case 'beforeAll':
    case 'beforeEach': {
      return parent.addBefore();
    }
    case 'afterEach':
    case 'afterAll': {
      return parent.addAfter();
    }
    default: {
      throw new AllureReporterError(`Unknown hook type: ${hookType}`);
    }
  }
}
