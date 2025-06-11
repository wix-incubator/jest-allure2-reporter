import os from 'node:os';
import path from 'node:path';
import fs from 'node:fs/promises';

import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';

import { fastMove } from './fastMove';

describe('fastMove', () => {
  let rootDirectory: string;
  let source: string;
  let destination: string;

  beforeEach(() => {
    jest.spyOn(fs, 'copyFile');
    jest.spyOn(fs, 'rm');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  beforeEach(async () => {
    rootDirectory = await fs.mkdtemp(path.join(os.tmpdir(), 'fastmove-'));
    source = path.join(rootDirectory, 'source.txt');
    destination = path.join(rootDirectory, 'destination.txt');
    await fs.writeFile(source, 'Test content');
  });

  afterEach(async () => {
    await fs.rm(rootDirectory, { recursive: true });
  });

  it('should move the file to the destination', async () => {
    await fastMove(source, destination);

    const movedFile = await fs.readFile(destination, 'utf8');
    expect(movedFile).toBe('Test content');
    await expect(fs.access(source)).rejects.toThrow();
    expect(fs.copyFile).not.toHaveBeenCalled();
    expect(fs.rm).not.toHaveBeenCalled();
  });

  it('should handle cross-device file movement', async () => {
    jest
      .spyOn(fs, 'rename')
      .mockRejectedValueOnce({ code: 'EXDEV', message: 'cross-device link not permitted' });

    await fastMove(source, destination);

    const movedFile = await fs.readFile(destination, 'utf8');
    expect(movedFile).toBe('Test content');
    await expect(fs.access(source)).rejects.toThrow();
    expect(fs.copyFile).toHaveBeenCalled();
    expect(fs.rm).toHaveBeenCalled();
  });
});
