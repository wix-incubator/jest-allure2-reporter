import { $Set } from 'jest-metadata';

import { SEVERITY } from '../constants';

export const $Severity = (severity: string) => $Set(SEVERITY, severity);
