import type {
  ReporterOptions,
  ReporterConfig,
  ResolvedTestCaseCustomizer,
  TestCaseCustomizer,
  TestStepCustomizer,
} from './ReporterOptions';
import { composeExtractors } from './composeExtractors';
import { aggregateLabelCustomizers } from './aggregateLabelCustomizers';
import { aggregateLinkCustomizers } from './aggregateLinkCustomizers';

export function composeOptions(
  base: ReporterConfig,
  custom: ReporterOptions | undefined,
): ReporterConfig {
  if (!custom) {
    return base;
  }

  return {
    ...custom,

    overwrite: custom.overwrite ?? base.overwrite,
    resultsDir: custom.resultsDir ?? base.resultsDir,
    testCase: composeTestCaseCustomizers(base.testCase, custom.testCase),
    environment: composeExtractors(custom.environment, base.environment),
    executor: composeExtractors(custom.executor, base.executor),
    categories: composeExtractors(custom.categories, base.categories),
  };
}

function composeTestCaseCustomizers(
  base: ResolvedTestCaseCustomizer,
  custom: Partial<TestCaseCustomizer> | undefined,
): ResolvedTestCaseCustomizer {
  if (!custom) {
    return base;
  }

  return {
    historyId: composeExtractors(custom.historyId, base.historyId),
    fullName: composeExtractors(custom.fullName, base.fullName),
    name: composeExtractors(custom.name, base.name),
    description: composeExtractors(custom.description, base.description),
    descriptionHtml: composeExtractors(
      custom.descriptionHtml,
      base.descriptionHtml,
    ),
    status: composeExtractors(custom.status, base.status),
    statusDetails: composeExtractors(custom.statusDetails, base.statusDetails),
    attachments: composeExtractors(custom.attachments, base.attachments),
    parameters: composeExtractors(custom.parameters, base.parameters),
    steps: composeTestStepCustomizers(
      base.steps as TestStepCustomizer,
      custom.steps,
    ),
    labels: composeExtractors(
      aggregateLabelCustomizers(custom.labels),
      base.labels,
    ),
    links: composeExtractors(
      aggregateLinkCustomizers(custom.links),
      base.links,
    ),
  };
}

function composeTestStepCustomizers(
  base: TestStepCustomizer,
  custom: Partial<TestStepCustomizer> | undefined,
) {
  if (!custom) {
    return base;
  }

  return {
    name: composeExtractors(custom.name, base.name),
    stage: composeExtractors(custom.stage, base.stage),
    status: composeExtractors(custom.status, base.status),
    statusDetails: composeExtractors(custom.statusDetails, base.statusDetails),
    attachments: composeExtractors(custom.attachments, base.attachments),
    parameters: composeExtractors(custom.parameters, base.parameters),
  };
}
