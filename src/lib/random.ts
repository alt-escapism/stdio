import { Choice, randomChoice } from "./random-choice";
import { randomNumber } from "./random-number";

export function random(
  min?: number,
  max?: number,
  transform?: (x: number) => number
): number;

export function random(
  name: string,
  min?: number,
  max?: number,
  transform?: (x: number) => number
): number;

export function random<T>(choices: Choice<T>[] | { [k: string]: Choice<T> }): T;

export function random<T>(
  name: string,
  choices: Choice<T>[] | { [k: string]: Choice<T> }
): T;

export function random(...args: any[]): any {
  const name = typeof args[0] === "string" ? args.shift() : "";
  const typeOfFirstArg = typeof args[0];
  if (typeOfFirstArg === "undefined" || typeOfFirstArg === "number") {
    return randomNumber(name, ...args);
  }
  return randomChoice(name, args[0]);
}
