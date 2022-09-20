import { random as _random } from "./random";
import { weight as _weight } from "./random-choice";
import { Stdio } from "./stdio.type";

const w = window as Window & { stdio?: Stdio };

if (!w.stdio) {
  w.stdio = {
    random: _random,
    weight: _weight,
  };
}

export const random = w.stdio.random;
export const weight = w.stdio.weight;
