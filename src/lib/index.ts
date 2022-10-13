import { random as _random } from "./random";
import { weight as _weight } from "./random-choice";
import { randomGaussian as _randomGaussian } from "./random-gaussian";
import { urlParam as _urlParam } from "./url-param";
import { Stdio } from "./stdio.type";

const w = window as Window & { stdio?: Stdio };

if (!w.stdio) {
  w.stdio = {
    random: _random,
    weight: _weight,
    randomGaussian: _randomGaussian,
    urlParam: _urlParam,
  };
}

export const random = w.stdio.random;
export const weight = w.stdio.weight;
export const randomGaussian = w.stdio.randomGaussian;
export const urlParam = w.stdio.urlParam;
