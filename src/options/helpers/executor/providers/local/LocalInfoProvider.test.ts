import { LocalInfoProvider } from './LocalInfoProvider';

describe('LocalInfoProvider', () => {
  it('should return local info', async () => {
    const provider = new LocalInfoProvider(true);
    const info = await provider.getExecutorInfo();

    expect(info).toEqual({
      name: expect.stringMatching(/.* \(.*\/.*\)/),
      type: expect.any(String),
    });
  });
});
