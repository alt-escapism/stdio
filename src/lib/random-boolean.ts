import { randomFn } from "./random-fn";

export function randomBoolean(
  _name: string,
  chanceTrue: number = 0.5
): boolean {
  return randomFn() > chanceTrue;
}
