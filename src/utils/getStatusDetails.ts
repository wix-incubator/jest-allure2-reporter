import type { StatusDetails } from 'jest-allure2-reporter';

export function getStatusDetails(
  maybeError: unknown,
): StatusDetails | undefined {
  if (maybeError) {
    const error = maybeError as Error;
    if (error.message) {
      return {
        message: error.message,
        trace: error.stack,
      };
    }
  }

  return;
}
