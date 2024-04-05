import type { MaybeArray, Label } from 'jest-allure2-reporter';

export type AmbiguousLabelValue = MaybeArray<string | Partial<Label>>;
