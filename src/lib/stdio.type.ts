import { choose } from "./choose";
import { random } from "./random";

export type Stdio = {
  random: typeof random;
  choose: typeof choose;
};
