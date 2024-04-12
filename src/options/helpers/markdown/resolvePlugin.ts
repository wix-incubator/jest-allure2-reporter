import { importCwd } from '../../../utils';

export async function resolvePlugin(maybePlugin: unknown): Promise<[any, unknown?]> {
  if (typeof maybePlugin === 'string') {
    return [await importCwd(maybePlugin)];
  }

  if (Array.isArray(maybePlugin)) {
    const [name, options] = maybePlugin;
    const [plugin] = await resolvePlugin(name);
    return [plugin, options];
  }

  return [maybePlugin];
}
