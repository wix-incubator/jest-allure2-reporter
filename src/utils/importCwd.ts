const cwd = process.cwd();

export async function importCwd(module: string): Promise<any> {
  const resolved = require.resolve(module, { paths: [cwd] });
  return import(resolved).then((module) => module.default ?? module);
}
