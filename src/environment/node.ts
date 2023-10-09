import JestEnvironmentNode from 'jest-metadata/environment-node';

import { WithAllure2 } from './decorator';

export const TestEnvironment = WithAllure2(JestEnvironmentNode);
export default TestEnvironment;
