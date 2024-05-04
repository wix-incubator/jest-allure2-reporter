import type { Severity } from 'jest-allure2-reporter';

import { $Label } from './$Label';

export const $Severity = (value: Severity) => $Label('severity', value);
