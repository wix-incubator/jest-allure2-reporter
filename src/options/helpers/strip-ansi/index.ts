import type { KeyedHelperCustomizer } from 'jest-allure2-reporter';

import { stripAnsi as stripAnsiString } from './stripAnsi';

export const stripAnsi: KeyedHelperCustomizer<'stripAnsi'> = () => stripAnsiString;
