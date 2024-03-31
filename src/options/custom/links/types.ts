import type { Link } from 'jest-allure2-reporter';

import type { MaybeArray } from '../../../utils';

export type AmbiguousLinkValue = MaybeArray<string | Partial<Link>>;
