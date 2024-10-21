import {sample} from 'lodash';
import {sleep} from "./sleep";

export async function throwErrorWithChance(chance: number, delay: number, errors: Error[]) {
  if (Math.random() < chance) {
    await sleep(delay, 1.5 * delay);
    throw sample(errors);
  }
}
