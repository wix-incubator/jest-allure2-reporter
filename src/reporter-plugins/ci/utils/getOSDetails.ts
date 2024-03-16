import os from 'node:os';

export function getOSDetails() {
  return `${os.type()} ${os.release()}/${os.arch()}`;
}
