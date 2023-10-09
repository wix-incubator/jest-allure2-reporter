import type {
  ReporterOptions,
  ReporterConfig,
  ResolvedTestCaseCustomizer,
  TestCaseCustomizer,
  TestStepCustomizer,
} from './ReporterOptions';
import { aggregateLabelCustomizers } from './aggregateLabelCustomizers';
import { aggregateLinkCustomizers } from './aggregateLinkCustomizers';
import { composeExtractors } from './composeExtractors';
import { asExtractor } from './asExtractor';

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
    testStep: composeTestStepCustomizers(
      base.testStep as TestStepCustomizer,
      custom.testStep,
    ),
    environment: composeExtractors(
      asExtractor(custom.environment),
      base.environment,
    ),
    executor: composeExtractors(asExtractor(custom.executor), base.executor),
    categories: composeExtractors(
      asExtractor(custom.categories),
      base.categories,
    ),
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
    start: composeExtractors(custom.start, base.start),
    stop: composeExtractors(custom.stop, base.stop),
    stage: composeExtractors(custom.stage, base.stage),
    status: composeExtractors(custom.status, base.status),
    statusDetails: composeExtractors(custom.statusDetails, base.statusDetails),
    attachments: composeExtractors(custom.attachments, base.attachments),
    parameters: composeExtractors(custom.parameters, base.parameters),
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
): TestStepCustomizer {
  if (!custom) {
    return base;
  }

  return {
    name: composeExtractors(custom.name, base.name),
    stage: composeExtractors(custom.stage, base.stage),
    start: composeExtractors(custom.start, base.start),
    stop: composeExtractors(custom.stop, base.stop),
    status: composeExtractors(custom.status, base.status),
    statusDetails: composeExtractors(custom.statusDetails, base.statusDetails),
    attachments: composeExtractors(custom.attachments, base.attachments),
    parameters: composeExtractors(custom.parameters, base.parameters),
  };
}
