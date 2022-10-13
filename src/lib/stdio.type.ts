import { random } from "./random";
import { weight } from "./random-choice";
import { randomGaussian } from "./random-gaussian";
import { urlParam } from "./url-param";

export type Stdio = {
  random: typeof random;
  weight: typeof weight;
  randomGaussian: typeof randomGaussian;
  urlParam: typeof urlParam;
};
