import type { StatusDetails } from '@noomorph/allure-js-commons';
import stripAnsi from 'strip-ansi';

export function stripStatusDetails(
  statusDetails?: StatusDetails,
): StatusDetails | undefined {
  if (!statusDetails) {
    return undefined;
  }

  const { message, trace } = statusDetails;
  return {
    message: message ? stripAnsi(message) : undefined,
    trace: trace ? stripAnsi(trace) : undefined,
  };
}
