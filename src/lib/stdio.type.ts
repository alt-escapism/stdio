import { random } from "./random";
import { weight } from "./random-choice";

export type Stdio = {
  random: typeof random;
  weight: typeof weight;
};
