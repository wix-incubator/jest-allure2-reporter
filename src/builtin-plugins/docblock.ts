/* eslint-disable @typescript-eslint/consistent-type-imports,import/no-extraneous-dependencies */
import fs from 'node:fs/promises';

import type {
  AllureTestItemMetadata,
  AllureTestCaseMetadata,
  AllureTestFileMetadata,
  AllureTestStepMetadata,
  DocblockContext,
  Label,
  LabelName,
  Link,
  LinkType,
  Plugin,
  PluginConstructor,
} from 'jest-allure2-reporter';

import { splitDocblock } from '../utils';

export const docblockPlugin: PluginConstructor = () => {
  let parse: DocblockParser | undefined;

  const plugin: Plugin = {
    name: 'jest-allure2-reporter/plugins/docblock',
    async globalContext() {
      parse = await initParser();
    },
    async testFileContext(context) {
      const testFilePath = context.testFile.testFilePath;
      const fileContents = await fs.readFile(testFilePath, 'utf8');
      if (parse && hasDocblockAtStart(fileContents)) {
        context.testFileDocblock = parse(fileContents);
        mergeIntoTestFile(context.testFileMetadata, context.testFileDocblock);
      }
    },
    async testCaseContext(context) {
      if (parse && context.testCaseMetadata.sourceCode) {
        context.testCaseDocblock = parse(context.testCaseMetadata.sourceCode);
        mergeIntoTestCase(context.testCaseMetadata, context.testCaseDocblock);
      }
    },
    async testStepContext(context) {
      if (parse && context.testStepMetadata.sourceCode) {
        context.testStepDocblock = parse(context.testStepMetadata.sourceCode);
        mergeIntoTestStep(context.testStepMetadata, context.testStepDocblock);
      }
    },
  };

  return plugin;
};

function hasDocblockAtStart(string_: string) {
  return /^\s*\/\*\*/m.test(string_);
}

function mergeIntoTestItem(
  metadata: AllureTestItemMetadata,
  comments: string,
  pragmas: Record<string, string[]>,
  rawDocblock: string,
  shouldLeaveComments: boolean,
) {
  if (comments) {
    metadata.description ??= [];
    metadata.description.push(comments);
  }

  if (pragmas.description) {
    metadata.description ??= [];
    metadata.description.push(...pragmas.description);
  }

  if (metadata.sourceCode && rawDocblock) {
    const [left, right, ...rest] = metadata.sourceCode.split(rawDocblock);
    const leftTrimmed = left.trimEnd();
    const replacement = shouldLeaveComments
      ? `/** ${comments.trimStart()} */\n`
      : '\n';
    const joined = right ? [leftTrimmed, right].join(replacement) : leftTrimmed;
    metadata.sourceCode = [joined, ...rest].join('\n');
  }
}

function mergeIntoTestFile(
  metadata: AllureTestFileMetadata,
  docblock: DocblockContext | undefined,
) {
  return mergeIntoTestCase(metadata, docblock);
}

function mergeIntoTestCase(
  metadata: AllureTestCaseMetadata,
  docblock: DocblockContext | undefined,
) {
  const { raw = '', comments = '', pragmas = {} } = docblock ?? {};
  mergeIntoTestItem(metadata, comments, pragmas, raw, false);

  const epic = pragmas.epic?.map(createLabelMapper('epic')) ?? [];
  const feature = pragmas.feature?.map(createLabelMapper('feature')) ?? [];
  const owner = pragmas.owner?.map(createLabelMapper('owner')) ?? [];
  const severity = pragmas.severity?.map(createLabelMapper('severity')) ?? [];
  const story = pragmas.story?.map(createLabelMapper('story')) ?? [];
  const tag = pragmas.tag?.map(createLabelMapper('tag')) ?? [];
  const labels = [...epic, ...feature, ...owner, ...severity, ...story, ...tag];
  if (labels.length > 0) {
    metadata.labels ??= [];
    metadata.labels.push(...labels);
  }

  const issue = pragmas.issue?.map(createLinkMapper('issue')) ?? [];
  const tms = pragmas.tms?.map(createLinkMapper('tms')) ?? [];
  const links = [...issue, ...tms];
  if (links.length > 0) {
    metadata.links ??= [];
    metadata.links.push(...links);
  }

  if (pragmas.descriptionHtml) {
    metadata.descriptionHtml ??= [];
    metadata.descriptionHtml.push(...pragmas.descriptionHtml);
  }
}

function createLabelMapper(name: LabelName) {
  return (value: string): Label => ({ name, value });
}

function createLinkMapper(type?: LinkType) {
  return (url: string): Link => ({ type, url, name: url });
}

function mergeIntoTestStep(
  metadata: AllureTestStepMetadata,
  docblock: DocblockContext | undefined,
) {
  const { raw = '', comments = '', pragmas = {} } = docblock ?? {};
  mergeIntoTestItem(metadata, comments, pragmas, raw, true);
}

type DocblockParser = (raw: string) => DocblockContext | undefined;

async function initParser(): Promise<DocblockParser> {
  try {
    const jestDocblock = await import('jest-docblock');
    return (snippet) => {
      const [jsdoc] = splitDocblock(snippet);
      const result = jestDocblock.parseWithComments(jsdoc);
      return {
        raw: jsdoc,
        comments: result.comments,
        pragmas: normalize(result.pragmas),
      };
    };
  } catch (error: any) {
    // TODO: log warning
    if (error?.code === 'MODULE_NOT_FOUND') {
      return () => void 0;
    }

    throw error;
  }
}

const SPLITTERS: Record<string, (string_: string) => string[]> = {
  tag: (string_) => string_.split(/\s*,\s*/),
};

function normalize(
  pragmas: Record<string, string | string[]>,
): Record<string, string[]> {
  const result: Record<string, string[]> = {};

  for (const [key, value] of Object.entries(pragmas)) {
    result[key] = Array.isArray(value) ? value : [value];
    const splitter = SPLITTERS[key];
    if (splitter) {
      result[key] = result[key].flatMap(splitter);
    }
  }

  return result;
}
