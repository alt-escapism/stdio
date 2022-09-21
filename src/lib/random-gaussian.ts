import { randomFn } from "./random-fn";

let next: number | null = null;

export function randomGaussian(
  name: string,
  mean?: number,
  sd?: number,
  transform?: (x: number) => number
): number;

export function randomGaussian(
  mean?: number,
  sd?: number,
  transform?: (x: number) => number
): number;

export function randomGaussian(...args: any[]): number {
  if (typeof args[0] === "string") {
    args.shift();
  }
  const [mean = 0, sd = 1, transform = (x: number) => x] = args;

  let curr: number;
  if (next != null) {
    curr = next;
    next = null;
  } else {
    let u: number, v: number, r: number;
    do {
      u = 2 * randomFn() - 1;
      v = 2 * randomFn() - 1;
      r = u * u + v * v;
    } while (r >= 1);
    const c = Math.sqrt((-2 * Math.log(r)) / r);
    curr = c * u;
    next = c * v;
  }
  return transform(mean + curr * sd);
}
