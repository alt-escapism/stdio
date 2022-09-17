import { random as _random } from "../lib/random";
import { choose as _choose } from "../lib/choose";
import { Stdio } from "./stdio.type";

const stdio: Stdio | void = (window as any).stdio;

export const random = stdio?.random ?? _random;

export const choose = stdio?.choose ?? _choose;

export { weight } from "../lib/choose";
