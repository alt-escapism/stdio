import { random } from "./random";
import { randomBoolean } from "./random-boolean";
import { weight } from "./random-choice";
import { randomGaussian } from "./random-gaussian";
import { urlParam } from "./url-param";

export type Stdio = {
  random: typeof random;
  weight: typeof weight;
  randomGaussian: typeof randomGaussian;
  randomBoolean: typeof randomBoolean;
  urlParam: typeof urlParam;
};
