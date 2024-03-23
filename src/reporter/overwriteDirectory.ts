import fs from 'node:fs/promises';

import rimraf from 'rimraf';

export async function overwriteDirectory(directoryPath: string) {
  await rimraf(directoryPath);
  await fs.mkdir(directoryPath, { recursive: true });
}
