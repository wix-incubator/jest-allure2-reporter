import { $Push, $Set } from 'jest-metadata/annotations';

const PREFIX = 'allure2';
const _DESCRIPTION = [PREFIX, 'description'];
const _DESCRIPTION_HTML = [PREFIX, 'descriptionHtml'];
const _ISSUE = [PREFIX, 'issue'];
const _LEAD = [PREFIX, 'lead'];
const _LINK = [PREFIX, 'link'];
const _OWNER = [PREFIX, 'owner'];
const _SEVERITY = [PREFIX, 'severity'];
const _TMS_LINK = [PREFIX, 'tmsLink'];
const _TAG = [PREFIX, 'tags'];

export const $Description = (description: string) =>
  $Set(_DESCRIPTION, description);
export const $DescriptionHtml = (descriptionHtml: string) =>
  $Set(_DESCRIPTION_HTML, descriptionHtml);
export const $Issue = (issue: string) => $Set(_ISSUE, issue);
export const $Lead = (lead: string) => $Set(_LEAD, lead);
export const $Owner = (owner: string) => $Set(_OWNER, owner);
export const $Link = (name: string, url: string) => $Set(_LINK, { name, url });
export const $Severity = (severity: string) => $Set(_SEVERITY, severity);
export const $TmsLink = (name: string, url: string) =>
  $Set(_TMS_LINK, { name, url });
export const $Tag = (...tagNames: string[]) => $Push(_TAG, ...tagNames); // TODO: maybe comma separated string?
