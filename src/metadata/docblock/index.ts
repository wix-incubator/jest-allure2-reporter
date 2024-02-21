// import {splitDocblock} from "../../utils";
// import type {
//   AllureTestCaseMetadata,
//   AllureTestFileMetadata,
//   AllureTestItemMetadata, AllureTestStepMetadata,
//   DocblockContext, Label, LabelName, Link, LinkType
// } from "jest-allure2-reporter";
//
// async function initParser(): Promise<DocblockParser> {
//   try {
//     const jestDocblock = await import('jest-docblock');
//     return (snippet) => {
//       const [jsdoc] = splitDocblock(snippet);
//       const result = jestDocblock.parseWithComments(jsdoc);
//       return {
//         raw: jsdoc,
//         comments: result.comments,
//         pragmas: normalize(result.pragmas),
//       };
//     };
//   } catch (error: any) {
//     // TODO: log warning
//     if (error?.code === 'MODULE_NOT_FOUND') {
//       return () => void 0;
//     }
//
//     throw error;
//   }
// }
//
// const SPLITTERS: Record<string, (string_: string) => string[]> = {
//   tag: (string_) => string_.split(/\s*,\s*/),
// };
//
// function normalize(
//   pragmas: Record<string, string | string[]>,
// ): Record<string, string[]> {
//   const result: Record<string, string[]> = {};
//
//   for (const [key, value] of Object.entries(pragmas)) {
//     result[key] = Array.isArray(value) ? value : [value];
//     const splitter = SPLITTERS[key];
//     if (splitter) {
//       result[key] = result[key].flatMap(splitter);
//     }
//   }
//
//   return result;
// }
//
// function hasDocblockAtStart(string_: string) {
//   return /^\s*\/\*\*/.test(string_);
// }
//
// function mergeIntoTestItem(
//   metadata: AllureTestItemMetadata,
//   comments: string,
//   pragmas: Record<string, string[]>,
//   rawDocblock: string,
//   shouldLeaveComments: boolean,
// ) {
//   if (comments) {
//     metadata.description ??= [];
//     metadata.description.push(comments);
//   }
//
//   if (pragmas.description) {
//     metadata.description ??= [];
//     metadata.description.push(...pragmas.description);
//   }
//
//   if (metadata.sourceCode && rawDocblock) {
//     const [left, right, ...rest] = metadata.sourceCode.split(rawDocblock);
//     const leftTrimmed = left.trimEnd();
//     const replacement = shouldLeaveComments
//       ? `/** ${comments.trimStart()} */\n`
//       : '\n';
//     const joined = right ? [leftTrimmed, right].join(replacement) : leftTrimmed;
//     metadata.sourceCode = [joined, ...rest].join('\n');
//   }
// }
//
// function mergeIntoTestFile(
//   metadata: AllureTestFileMetadata,
//   docblock: DocblockContext | undefined,
// ) {
//   return mergeIntoTestCase(metadata, docblock);
// }
//
// function mergeIntoTestCase(
//   metadata: AllureTestCaseMetadata,
//   docblock: DocblockContext | undefined,
// ) {
//   const { raw = '', comments = '', pragmas = {} } = docblock ?? {};
//   mergeIntoTestItem(metadata, comments, pragmas, raw, false);
//
//   const epic = pragmas.epic?.map(createLabelMapper('epic')) ?? [];
//   const feature = pragmas.feature?.map(createLabelMapper('feature')) ?? [];
//   const owner = pragmas.owner?.map(createLabelMapper('owner')) ?? [];
//   const severity = pragmas.severity?.map(createLabelMapper('severity')) ?? [];
//   const story = pragmas.story?.map(createLabelMapper('story')) ?? [];
//   const tag = pragmas.tag?.map(createLabelMapper('tag')) ?? [];
//   const labels = [...epic, ...feature, ...owner, ...severity, ...story, ...tag];
//   if (labels.length > 0) {
//     metadata.labels ??= [];
//     metadata.labels.push(...labels);
//   }
//
//   const issue = pragmas.issue?.map(createLinkMapper('issue')) ?? [];
//   const tms = pragmas.tms?.map(createLinkMapper('tms')) ?? [];
//   const links = [...issue, ...tms];
//   if (links.length > 0) {
//     metadata.links ??= [];
//     metadata.links.push(...links);
//   }
//
//   if (pragmas.descriptionHtml) {
//     metadata.descriptionHtml ??= [];
//     metadata.descriptionHtml.push(...pragmas.descriptionHtml);
//   }
// }
//
// function createLabelMapper(name: LabelName) {
//   return (value: string): Label => ({ name, value });
// }
//
// function createLinkMapper(type?: LinkType) {
//   return (url: string): Link => ({ type, url, name: url });
// }
//
// function mergeIntoTestStep(
//   metadata: AllureTestStepMetadata,
//   docblock: DocblockContext | undefined,
// ) {
//   const { raw = '', comments = '', pragmas = {} } = docblock ?? {};
//   mergeIntoTestItem(metadata, comments, pragmas, raw, true);
// }
//
// type DocblockParser = (raw: string) => DocblockContext | undefined;
//
