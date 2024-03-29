// TODO: pick last labels

// labels({
//   package: last,
//   testClass: last,
//   testMethod: last,
//   parentSuite: last,
//   suite: ({ testCase, testFile }) =>
//     testCase.ancestorTitles[0] ?? path.basename(testFile.testFilePath),
//   subSuite: ({ testCase }) => testCase.ancestorTitles.slice(1).join(' '),
//   epic: all,
//   feature: all,
//   story: all,
//   thread: ({ testCaseMetadata }) => testCaseMetadata.workerId,
//   severity: last,
//   tag: all,
//   owner: last,
// } as TestCasePropertyCustomizer['labels']),
