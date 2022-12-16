import crypto from 'crypto';

/**
 *
 * @param strings
 */
export default function md5(strings: string[]): string {
  return crypto.createHash('md5').update(strings.join('.')).digest('hex');
}
