export function importDefault(module: string): Promise<any> {
  return import(module).then((module) => module?.default ?? module);
}
