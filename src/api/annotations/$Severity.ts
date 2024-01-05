import { $Label } from './$Label';

export type SeverityType =
  | 'blocker'
  | 'critical'
  | 'normal'
  | 'minor'
  | 'trivial';

export const $Severity = (value: SeverityType) => $Label('severity', value);
