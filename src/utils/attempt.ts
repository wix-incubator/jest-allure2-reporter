export default function attempt<T>(function_: () => T): T | Error {
  try {
    return function_();
  } catch (error) {
    return error;
  }
}
