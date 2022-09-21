import { random } from "./random";
import { weight } from "./random-choice";
import { randomGaussian } from "./random-gaussian";

export type Stdio = {
  random: typeof random;
  weight: typeof weight;
  randomGaussian: typeof randomGaussian;
};
