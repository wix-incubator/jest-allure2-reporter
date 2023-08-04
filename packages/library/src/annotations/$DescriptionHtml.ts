import {$Push} from "jest-metadata/annotations";

export const $DescriptionHtml = (descriptionHtml: string) =>
  $Push(DESCRIPTION_HTML, descriptionHtml);
