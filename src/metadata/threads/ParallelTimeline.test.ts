import ParallelTimeline from './ParallelTimeline';

describe('ParallelTimeline', () => {
  test('integration test', () => {
    const t = new ParallelTimeline();
    expect(t.allocate(100, 200)).toBe(0);
    expect(t.allocate(300, 400)).toBe(0);
    expect(t.allocate(150, 250)).toBe(1);
    expect(t.allocate(350, 450)).toBe(1);
    expect(t.allocate(200, 300)).toBe(0);
    expect(t.allocate(250, 350)).toBe(1);
  });
});
