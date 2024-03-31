import type { Label } from 'jest-allure2-reporter';

import type { MaybeArray } from '../../../utils';

export type AmbiguousLabelValue = MaybeArray<string | Partial<Label>>;
