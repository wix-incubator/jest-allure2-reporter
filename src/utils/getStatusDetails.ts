import type { StatusDetails } from 'jest-allure2-reporter';

import { autoIndent } from './autoIndent';
import { isError } from './vendor';

export function getStatusDetails(maybeError: unknown): StatusDetails | undefined {
  if (!maybeError) {
    return;
  }

  const trace = getTrace(maybeError);
  const stackIndex = trace.indexOf('\n    at ');
  return stackIndex === -1
    ? {
        message: trace,
      }
    : {
        message: trace.slice(0, stackIndex),
        trace: autoIndent(trace).slice(stackIndex + 1),
      };
}

function getTrace(maybeError: unknown): string {
  if (typeof maybeError === 'string') {
    return maybeError;
  }

  const error = maybeError as Error;
  if (isError(maybeError)) {
    return restoreStack(error);
  }

  return error.stack || error.message || JSON.stringify(error);
}

function restoreStack(error: Error): string {
  const { message, name, stack } = error;
  if (stack && message && hasEmptyFirstLine(stack)) {
    return `${name}: ${message}${stack.slice(stack.indexOf('\n'))}`;
  }

  return stack || String(error);
}

function hasEmptyFirstLine(stack: string): boolean {
  if (!stack.includes('\n')) {
    return false;
  }

  const firstLine = stack.slice(0, stack.indexOf('\n'));
  const [, after] = firstLine.trimEnd().split(':', 2);
  return !after;
}
