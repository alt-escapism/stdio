import { randomFn } from "./random-fn";

export function randomNumber(
  _name: string,
  min?: number,
  max?: number,
  transform = (x: number) => x
): number {
  if (min == null) {
    min = 0;
    max = 1;
  } else if (max == null) {
    max = min;
    min = 0;
  }

  return transform(randomFn() * (max - min) + min);
}
