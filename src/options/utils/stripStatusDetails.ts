import stripAnsi from 'strip-ansi';
import type { StatusDetails } from 'jest-allure2-reporter';

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
