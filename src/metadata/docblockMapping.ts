import type {
  AllureTestStepMetadata,
  AllureTestCaseMetadata,
  AllureTestItemDocblock,
  Label,
  LabelName,
  Link,
  LinkType,
} from 'jest-allure2-reporter';

import { asArray, compactArray } from '../utils';

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

export function mapTestStepDocblock({ comments }: AllureTestItemDocblock): AllureTestStepMetadata {
  const metadata: AllureTestStepMetadata = {};
  if (comments) {
    metadata.displayName = comments;
  }

  return metadata;
}

export function mapTestCaseDocblock(context: AllureTestItemDocblock): AllureTestCaseMetadata {
  const metadata: AllureTestCaseMetadata = {};
  const { comments, pragmas = {} } = context;

  const labels = ALL_LABELS.flatMap((name) => asArray(pragmas[name]).map(createLabelMapper(name)));

  if (labels.length > 0) metadata.labels = labels;

  const links = compactArray<Link>([
    ...asArray(pragmas.issue).map(issueMapper),
    ...asArray(pragmas.tms).map(tmsMapper),
    ...asArray(pragmas.url).map(linkMapper),
  ]);

  if (links.length > 0) metadata.links = links;

  if (comments || pragmas.description)
    metadata.description = [...asArray(comments), ...asArray(pragmas.description)];

  if (pragmas.descriptionHtml) {
    metadata.descriptionHtml = asArray(pragmas.descriptionHtml);
  }

  return metadata;
}

export const mapTestFileDocblock = mapTestCaseDocblock;

function createLabelMapper(name: LabelName) {
  return (value: string): Label => ({ name, value });
}

function linkMapper(value: string): Link {
  const nameIndex = value.indexOf(' ');
  const rawUrl = nameIndex === -1 ? value : value.slice(0, nameIndex);
  const rawName = nameIndex === -1 ? rawUrl : value.slice(nameIndex + 1);
  return { url: rawUrl.trim(), name: rawName.trim() };
}

function createTypedLinkMapper(type: LinkType) {
  return (value: string): Link => ({ type, url: '', name: value.trim() });
}

const issueMapper = createTypedLinkMapper('issue');
const tmsMapper = createTypedLinkMapper('tms');

function assertType<T>(value: T) {
  return value;
}
