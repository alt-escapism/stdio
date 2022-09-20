import { randomFn } from "./random-fn";

export function randomNumber(
  _name: string,
  min: number = 0,
  max: number = 1,
  transform = (x: number) => x
): number {
  return transform(randomFn() * (max - min) + min);
}
