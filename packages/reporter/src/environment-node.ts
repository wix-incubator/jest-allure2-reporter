import type { Circus } from '@jest/types';
import { state } from 'jest-metadata';
import { TestEnvironment } from 'jest-metadata/environment-node';

export default class Allure2NodeJestEnvironment extends TestEnvironment {
  async setup() {
    await super.setup();

    state.currentMetadata.set(
      ['allure2', 'workerId'],
      process.env.JEST_WORKER_ID,
    );
  }

  handleTestEvent(event: Circus.Event, _state: Circus.State) {
    const result = super.handleTestEvent(event, _state);

    if (event.name === 'add_hook' || event.name === 'add_test') {
      state.currentMetadata.set(['allure2', 'code'], event.fn.toString());
    }

    return result;
  }
}
