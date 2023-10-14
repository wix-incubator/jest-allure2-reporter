/**
 * Infers the mime type of a file based on its extension.
 * @param filePath Path to the file.
 * @returns The mime type of the file or `application/octet-stream` if the mime type could not be inferred.
 */
export function inferMimeType(filePath: string): string {
  const extension = filePath.split('.').pop()!;
  return mimeTypes[extension] || 'application/octet-stream';
}

const mimeTypes: Record<string, string> = {
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  gif: 'image/gif',
  svg: 'image/svg+xml',
  webp: 'image/webp',

  mp4: 'video/mp4',
  webm: 'video/webm',
  ogg: 'video/ogg',

  json: 'application/json',
  pdf: 'application/pdf',
  zip: 'application/zip',
  tar: 'application/x-tar',
  gz: 'application/gzip',
  js: 'application/javascript',

  css: 'text/css',
  html: 'text/html',
  txt: 'text/plain',
  csv: 'text/csv',
  xml: 'text/xml',
};
