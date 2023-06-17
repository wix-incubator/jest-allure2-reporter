import crypto from 'node:crypto';

export default function md5(strings: string[]): string {
  return crypto.createHash('md5').update(strings.join('.')).digest('hex');
}
