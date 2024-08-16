export async function sleep(min: number, max = min) {
  const ms = Math.round(Math.random() * (max - min) + min);
  await new Promise(resolve => setTimeout(resolve, ms));
}
