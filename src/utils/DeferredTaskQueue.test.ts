import type { DeferredTaskQueueConfig } from './DeferredTaskQueue';
import { DeferredTaskQueue } from './DeferredTaskQueue';

// Keep delay for any tests that might still need real-time delays, though most will use fake timers.
// const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

type TaskPayload = {
  id: string | number;
  executionTimeMs?: number;
  thread?: string;
  shouldFail?: boolean;
  failError?: Error;
};

describe('DeferredTaskQueue', () => {
  let taskQueue: DeferredTaskQueue<TaskPayload, string | number>;
  let mockExecute: jest.Mock;
  let getThreadName: jest.Mock;
  let getPayloadKey: jest.Mock;
  let config: DeferredTaskQueueConfig<TaskPayload, string | number>;

  let taskBegin: jest.Mock;
  let taskEnd: jest.Mock;
  let taskFailed: jest.Mock;
  const taskPayloads: { [id: string | number]: TaskPayload } = {};

  const createPayload = (
    id: string | number,
    executionTimeMs = 1,
    thread = 'default_thread',
    failError?: Error,
  ): TaskPayload => {
    const shouldFail = failError !== undefined;
    const payload: TaskPayload = {
      id,
      executionTimeMs,
      thread,
      shouldFail,
      failError: shouldFail ? failError : undefined,
    };
    taskPayloads[id] = payload;
    return payload;
  };

  const completeAfter = (ms?: number) =>
    Promise.all([
      ms === undefined ? jest.runAllTimersAsync() : jest.advanceTimersByTimeAsync(ms),
      taskQueue.awaitCompletion(),
    ]);

  beforeEach(() => {
    jest.useFakeTimers();

    taskBegin = jest.fn();
    taskEnd = jest.fn();
    taskFailed = jest.fn();
    // Clear taskPayloads for fresh state, though createPayload overwrites, it's cleaner.
    for (const key in taskPayloads) delete taskPayloads[key];

    getThreadName = jest
      .fn()
      .mockImplementation((payload: TaskPayload) => payload.thread || 'default');
    getPayloadKey = jest.fn().mockImplementation((payload: TaskPayload) => payload.id);

    mockExecute = jest.fn().mockImplementation(async (payload: TaskPayload) => {
      taskBegin(payload.id);
      // Use a promise that resolves/rejects based on setTimeout with fake timers
      return new Promise<void>((resolve, reject) => {
        setTimeout(() => {
          if (payload.shouldFail) {
            taskFailed(payload.id, payload.failError);
            reject(payload.failError);
          } else {
            taskEnd(payload.id);
            resolve();
          }
        }, payload.executionTimeMs || 0);
      });
    });

    config = {
      execute: mockExecute,
      getThreadName,
      getPayloadKey,
    };
    taskQueue = new DeferredTaskQueue(config);
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers(); // Restore real timers
  });

  test('enqueued task does not run automatically', async () => {
    const p1 = createPayload(1);
    taskQueue.enqueue(p1);
    await jest.runAllTimersAsync();
    expect(taskBegin).not.toHaveBeenCalled();
  });

  test('should enqueue, start, and complete a single task', async () => {
    const p1 = createPayload(1);
    taskQueue.enqueue(p1);
    taskQueue.startPending();
    await jest.advanceTimersByTimeAsync(1);
    expect(taskEnd).toHaveBeenCalledWith(1);
  });

  test('tasks in same thread run sequentially, not concurrently', async () => {
    const p1 = createPayload(1, 50, 'A'); // 50ms
    const p2 = createPayload(2, 30, 'A'); // 30ms

    taskQueue.enqueue(p1); // p1 is pending
    taskQueue.enqueue(p2); // This should start p1. p2 becomes pending.

    // p1 started but not finished
    // We need to allow microtasks for p1 to begin due to enqueue(p2)
    await jest.advanceTimersByTimeAsync(0);
    expect(taskBegin).toHaveBeenCalledWith(1);
    expect(taskEnd).not.toHaveBeenCalled(); // p1 not done, p2 not started

    await jest.advanceTimersByTimeAsync(100); // p1 finishes
    expect(taskEnd).toHaveBeenCalledWith(1);
    expect(taskBegin).not.toHaveBeenCalledWith(2); // p2 still not started

    taskQueue.startPending('A'); // Explicitly start p2
    // Allow microtasks for p2 to begin
    await jest.advanceTimersByTimeAsync(0);
    expect(taskBegin).toHaveBeenCalledWith(2);
    expect(taskEnd).not.toHaveBeenCalledWith(2); // p2 not done

    await jest.advanceTimersByTimeAsync(30); // p2 finishes
    expect(taskEnd).toHaveBeenCalledWith(2);
  });

  test('enqueuing to different threads keeps all tasks pending', async () => {
    const pA = createPayload('taskA', 50, 'A');
    const pB = createPayload('taskB', 50, 'B');

    taskQueue.enqueue(pA);
    taskQueue.enqueue(pB); // Enqueue to a *different* thread

    // Advance time significantly, neither task should have started
    // as they are in different threads and no explicit start was called.
    await jest.advanceTimersByTimeAsync(100);
    expect(taskBegin).not.toHaveBeenCalled();
  });

  test('tasks in different threads start concurrently via startPending()', async () => {
    const pA = createPayload('taskA', 50, 'A');
    const pB = createPayload('taskB', 50, 'B');

    taskQueue.enqueue(pA);
    taskQueue.enqueue(pB);

    taskQueue.startPending(); // Start all pending (pA and pB)

    // Allow microtasks for both to begin.
    // Since they are in different threads, both should be able to start immediately.
    await jest.advanceTimersByTimeAsync(0);
    expect(taskBegin).toHaveBeenCalledWith('taskA');
    expect(taskBegin).toHaveBeenCalledWith('taskB');

    // Advance time enough for both to complete (assuming they run in parallel)
    await jest.advanceTimersByTimeAsync(50);
    expect(taskEnd).toHaveBeenCalledWith('taskA');
    expect(taskEnd).toHaveBeenCalledWith('taskB');
  });

  test('awaitCompletion waits for and reports successful task completion', async () => {
    taskQueue.enqueue(createPayload(1));
    taskQueue.startPending();
    await completeAfter(1);
    await expect(taskQueue.awaitCompletion()).resolves.toBeUndefined();
  });

  test('awaitCompletion waits for and reports failed task completion', async () => {
    const failError = new Error('Task failed intentionally');
    taskQueue.enqueue(createPayload(1, 1, 'default', failError));
    taskQueue.startPending();
    await completeAfter(1);
    expect(taskFailed).toHaveBeenCalledWith(1, failError);
  });

  test('enqueue ignores task if its key was already processed successfully', async () => {
    taskQueue.enqueue(createPayload(1));
    taskQueue.startPending();
    await jest.runAllTimersAsync(); // Task 1 (1ms) completes
    expect(taskEnd).toHaveBeenCalledWith(1); // Sanity check: task 1 did complete

    mockExecute.mockClear();
    taskQueue.enqueue(createPayload(1)); // Re-enqueue task 1
    taskQueue.startPending(); // Attempt to start any pending tasks
    await jest.runAllTimersAsync(); // Advance time
    expect(mockExecute).not.toHaveBeenCalled(); // Should not execute again
  });

  test('startPending(threadName) starts only specified thread a_is_pending task', async () => {
    taskQueue.enqueue(createPayload(1, 10, 'A'));
    taskQueue.enqueue(createPayload(2, 10, 'B'));
    taskQueue.startPending('A');
    await jest.advanceTimersByTimeAsync(0); // Allow microtasks for task 1 to start
    expect(taskBegin).toHaveBeenCalledWith(1);
    expect(taskBegin).not.toHaveBeenCalledWith(2);
  });

  test('failing task does not prevent subsequent task in the same thread from executing', async () => {
    const threadName = 'sequential_thread';
    const pFail = createPayload('taskFail', 10, threadName, new Error('Planned Failure'));
    const pNext = createPayload('taskNext', 20, threadName);

    taskQueue.enqueue(pFail); // pFail is now pending for threadName
    taskQueue.enqueue(pNext); // This action causes pFail to start execution, and pNext becomes pending for threadName.

    // Advance timers for pFail to execute and fail.
    // The mockExecute for pFail will be called, and its internal promise (simulating work) will reject.
    await jest.advanceTimersByTimeAsync(pFail.executionTimeMs!);
    expect(taskFailed).toHaveBeenCalledWith(pFail.id, pFail.failError); // Verify pFail's mockExecute logic led to taskFailed.
    expect(taskEnd).not.toHaveBeenCalledWith(pFail.id); // Ensure pFail did not call taskEnd (i.e., did not "complete" successfully).

    // Clear mocks to ensure assertions below are specific to pNext's execution.
    taskBegin.mockClear();
    taskEnd.mockClear();
    mockExecute.mockClear(); // This is crucial for verifying if pNext's actual execute function runs.

    taskQueue.startPending(threadName); // Attempt to start the pending pNext.

    // Allow pNext to attempt to start (run microtasks like promise resolutions).
    // If pFail's failure blocks the thread, taskBegin(pNext.id) might not be called.
    await jest.advanceTimersByTimeAsync(0);
    expect(taskBegin).toHaveBeenCalledWith(pNext.id); // Assert pNext began execution.

    // Advance timers for pNext to complete its execution.
    await jest.advanceTimersByTimeAsync(pNext.executionTimeMs!);
    expect(taskEnd).toHaveBeenCalledWith(pNext.id); // Assert pNext completed successfully.
    // Additionally, ensure the core execute function for pNext was indeed called.
    expect(mockExecute).toHaveBeenCalledWith(pNext);
  });

  test('startPending does not re-execute an already executing task', async () => {
    const p1 = createPayload(1, 100); // Task that takes 100ms
    taskQueue.enqueue(p1);
    taskQueue.startPending(); // p1 starts executing

    await jest.advanceTimersByTimeAsync(10); // p1 is 10ms into its execution, still active
    expect(taskBegin).toHaveBeenCalledTimes(1); // Called once so far

    taskQueue.enqueue(p1); // Enqueue p1 again, it becomes pending for its thread

    mockExecute.mockClear(); // Clear execute for the check below
    taskBegin.mockClear(); // Clear begin for the check below

    taskQueue.startPending(); // Attempt to start the pending p1
    await jest.advanceTimersByTimeAsync(0); // Allow microtasks

    expect(mockExecute).not.toHaveBeenCalled(); // Should not execute again as original p1 is active
    expect(taskBegin).not.toHaveBeenCalled();

    await jest.advanceTimersByTimeAsync(90); // Allow original p1 to complete
    expect(taskEnd).toHaveBeenCalledWith(1); // Original p1 finishes
  });
});
