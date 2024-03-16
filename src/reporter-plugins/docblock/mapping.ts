import type {
  AllureTestStepMetadata,
  AllureTestCaseMetadata,
  AllureTestItemDocblock,
  Label,
  LabelName,
  Link,
  LinkType,
} from 'jest-allure2-reporter';

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

  const labels = (
    ['epic', 'feature', 'owner', 'severity', 'story', 'tag'] as const
  ).flatMap((name) => mapMaybeArray(pragmas[name], createLabelMapper(name)));

  if (labels.length > 0) metadata.labels = labels;

  const links = (['issue', 'tms'] as const)
    .flatMap((name) => mapMaybeArray(pragmas[name], createLinkMapper(name)))
    .filter(Boolean);

  if (links.length > 0) metadata.links = links;

  if (comments || pragmas.description)
    metadata.description = [
      ...(comments ? [comments] : []),
      ...(pragmas.description || []),
    ];

  if (pragmas.descriptionHtml) {
    metadata.descriptionHtml = mapMaybeArray(pragmas.descriptionHtml, (x) => x);
  }

  return metadata;
}

function mapMaybeArray<T, R>(
  value: T | T[] | undefined,
  mapper: (value: T) => R,
): R[] {
  if (value == null) {
    return [];
  }

  if (Array.isArray(value)) {
    return value.map(mapper);
  }

  return [mapper(value)];
}

export const mapTestFileDocblock = mapTestCaseDocblock;

function createLabelMapper(name: LabelName) {
  return (value: string): Label => ({ name, value });
}

function createLinkMapper(type?: LinkType) {
  return (url: string): Link => ({ type, url, name: url });
}
