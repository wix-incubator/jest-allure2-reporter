import fs from 'node:fs/promises';

export async function overwriteDirectory(directoryPath: string) {
  await fs.rm(directoryPath, { recursive: true });
  await fs.mkdir(directoryPath, { recursive: true });
}
