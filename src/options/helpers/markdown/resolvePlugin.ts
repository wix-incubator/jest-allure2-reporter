export async function resolvePlugin(maybePlugin: unknown): Promise<[any, unknown?]> {
  if (typeof maybePlugin === 'string') {
    return [import(maybePlugin).then((module) => module?.default ?? module)];
  }

  if (Array.isArray(maybePlugin)) {
    const [name, options] = maybePlugin;
    const [plugin] = await resolvePlugin(name);
    return [plugin, options];
  }

  return [maybePlugin];
}
