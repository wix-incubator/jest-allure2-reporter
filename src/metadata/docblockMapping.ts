import type {
  AllureTestStepMetadata,
  AllureTestCaseMetadata,
  AllureTestItemDocblock,
  Label,
  LabelName,
  Link,
  LinkType,
} from 'jest-allure2-reporter';

import { asArray } from '../utils';

const ALL_LABELS = Object.keys(
  assertType<Record<LabelName, 0>>({
    epic: 0,
    feature: 0,
    owner: 0,
    package: 0,
    parentSuite: 0,
    severity: 0,
    story: 0,
    subSuite: 0,
    suite: 0,
    tag: 0,
    testClass: 0,
    testMethod: 0,
    thread: 0,
  }),
) as LabelName[];

const ALL_LINKS = Object.keys(
  assertType<Record<LinkType, 0>>({
    issue: 0,
    tms: 0,
  }),
) as LinkType[];

export function mapTestStepDocblock({
  comments,
}: AllureTestItemDocblock): AllureTestStepMetadata {
  const metadata: AllureTestStepMetadata = {};
  if (comments) {
    metadata.displayName = comments;
  }

  return metadata;
}

export function mapTestCaseDocblock(
  context: AllureTestItemDocblock,
): AllureTestCaseMetadata {
  const metadata: AllureTestCaseMetadata = {};
  const { comments, pragmas = {} } = context;

  const labels = ALL_LABELS.flatMap((name) =>
    asArray(pragmas[name]).map(createLabelMapper(name)),
  );

  if (labels.length > 0) metadata.labels = labels;

  const links = ALL_LINKS.flatMap((name) =>
    asArray(pragmas[name]).map(createLinkMapper(name)),
  ).filter(Boolean);

  if (links.length > 0) metadata.links = links;

  if (comments || pragmas.description)
    metadata.description = [
      ...asArray(comments),
      ...asArray(pragmas.description),
    ];

  if (pragmas.descriptionHtml) {
    metadata.descriptionHtml = asArray(pragmas.descriptionHtml);
  }

  return metadata;
}

export const mapTestFileDocblock = mapTestCaseDocblock;

function createLabelMapper(name: LabelName) {
  return (value: string): Label => ({ name, value });
}

function createLinkMapper(type?: LinkType) {
  return (url: string): Link => ({ type, url, name: url });
}

function assertType<T>(value: T) {
  return value;
}
