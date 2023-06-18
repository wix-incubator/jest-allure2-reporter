import type { JestAllure2ReporterOptions } from '../JestAllure2ReporterOptions';
import type { ReporterEmitter } from '../ReporterEmitter';

import {
  MetadataService,
  ProjectService,
  QueryService,
  ThreadService,
  TimeService,
} from './fallbacks';
import { TestCaseSelectors } from './testCase';
import { TestFileSelectors } from './testFile';

type SelectorsConfig = {
  emitter: ReporterEmitter;
  reporterOptions: Partial<JestAllure2ReporterOptions>;
  rootDir: string;
};

export class Selectors {
  public readonly testCase: TestCaseSelectors;
  public readonly testFile: TestFileSelectors;

  constructor(selectorsConfig: SelectorsConfig) {
    const emitter = selectorsConfig.emitter;
    const metadataService = new MetadataService();
    const queryService = new QueryService(emitter);
    const timeService = new TimeService(emitter);
    const threadService = new ThreadService(emitter);
    const projectService = new ProjectService({
      rootDir: selectorsConfig.rootDir,
      packageName: selectorsConfig.reporterOptions.testInfo?.labels
        ?.package as string, // TODO: rewrite label system
    });

    this.testCase = new TestCaseSelectors({
      reporterOptions: selectorsConfig.reporterOptions,
      meta: metadataService,
      query: queryService,
      project: projectService,
      thread: threadService,
      time: timeService,
    });

    this.testFile = new TestFileSelectors({
      project: projectService,
      time: timeService,
    });
  }
}
