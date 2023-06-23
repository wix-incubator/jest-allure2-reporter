import { state } from 'jest-metadata';
import { TestEnvironment } from 'jest-metadata/environment-node';
import type { ForwardedCircusEvent } from 'jest-metadata/environment-decorator';

export class AllureNodeJestEnvironment extends TestEnvironment {
  constructor(config: any, context: any) {
    super(config, context);

    state.currentMetadata.set(
      ['allure2', 'workerId'],
      process.env.JEST_WORKER_ID,
    );

    this.testEvents
      .on('add_hook', this.#attachCode)
      .on('add_test', this.#attachCode);
  }

  #attachCode = ({ event }: ForwardedCircusEvent) => {
    state.currentMetadata.set(['allure2', 'code'], event.fn.toString());
  };
}

export default AllureNodeJestEnvironment;
