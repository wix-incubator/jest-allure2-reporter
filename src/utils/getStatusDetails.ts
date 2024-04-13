import type { StatusDetails } from 'jest-allure2-reporter';

import { isError } from './vendor';

export function getStatusDetails(maybeError: unknown): StatusDetails | undefined {
  if (maybeError) {
    const error = maybeError as Error;
    const trace =
      isError(maybeError) || typeof error === 'string'
        ? String(error)
        : error.stack || error.message || JSON.stringify(error);

    const stackIndex = trace.indexOf('\n    at ');
    return stackIndex === -1
      ? {
          message: trace,
        }
      : {
          message: trace.slice(0, stackIndex),
          trace: '    ' + trace.slice(stackIndex).trimStart(),
        };
  }

  return;
}
