const POSIX_PATTERN = '/node_modules/';
const WINDOWS_PATTERN = '\\node_modules\\';

export function isLibraryPath(filePath: unknown): filePath is string {
  if (typeof filePath !== 'string') {
    return false;
  }

  return filePath.includes(POSIX_PATTERN) || filePath.includes(WINDOWS_PATTERN);
}
