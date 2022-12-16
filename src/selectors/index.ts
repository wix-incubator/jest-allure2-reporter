import type { EventEmitter } from 'events';

import { MetadataService, QueryService, ThreadService, TimeService } from './fallbacks';
import { TestCaseSelectors } from './testCase';
import { TestFileSelectors } from './testFile';

type SelectorsConfig = {
  rootDir: string;
  emitter: EventEmitter;
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
    const config = {
      rootDir: selectorsConfig.rootDir,
    };

    this.testCase = new TestCaseSelectors({
      config,
      meta: metadataService,
      query: queryService,
      thread: threadService,
      time: timeService,
    });

    this.testFile = new TestFileSelectors({
      config,
      time: timeService,
    });
  }
}
