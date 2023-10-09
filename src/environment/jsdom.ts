import JestEnvironmentJsdom from 'jest-metadata/environment-jsdom';

import { WithAllure2 } from './decorator';

export const TestEnvironment = WithAllure2(JestEnvironmentJsdom);
export default TestEnvironment;
