import { randomChoice, toUnweighted, weight } from "../lib/random-choice";
import { randomNumber } from "../lib/random-number";
import { Stdio } from "../lib/stdio.type";
import { addVariable, settings } from "./context";

const augmentedRandomNumber: typeof randomNumber = (
  name,
  min = 0,
  max = 1,
  transform
) => {
  let value = randomNumber(name, min, max, transform);
  let shadowed: number | undefined;

  const lockedValue = settings.variables[name];
  if (lockedValue) {
    const lockedNumber = Number(lockedValue);
    if (!isNaN(lockedNumber)) {
      shadowed = value;
      value = lockedNumber;
    }
  }

  addVariable({
    name,
    type: "Number",
    value,
    min,
    max,
    shadowed,
  });

  return value;
};

const augmentedRandomChoice: typeof randomChoice = (name, choices) => {
  let chosenValue = randomChoice(name, choices);
  const unweightedEntries = Object.entries(choices).map(
    ([key, value]) => [key, toUnweighted(value)] as const
  );
  let [key] =
    unweightedEntries.find(([_, v]) => v === chosenValue) ??
    unweightedEntries[0];
  let shadowed: string | undefined;

  const lockedKey = settings.variables[name];
  if (lockedKey != null) {
    const lockedValue = Object.fromEntries(unweightedEntries)[lockedKey];
    if (lockedValue != null) {
      shadowed = key;
      key = lockedKey;
      chosenValue = lockedValue;
    }
  }

  if (Array.isArray(choices)) {
    addVariable({
      name,
      type: "Array",
      options: unweightedEntries.map(([_, v]) => v),
      value: key,
      shadowed,
    });
  } else {
    addVariable({
      name,
      type: "Object",
      options: Object.fromEntries(unweightedEntries),
      value: key,
      shadowed,
    });
  }

  return chosenValue;
};

export function injectLib() {
  const stdio: Stdio = {
    random(...args: any[]): any {
      const name = typeof args[0] === "string" ? args.shift() : "";
      const typeOfFirstArg = typeof args[0];
      if (typeOfFirstArg === "undefined" || typeOfFirstArg === "number") {
        return augmentedRandomNumber(name, ...args);
      }
      return augmentedRandomChoice(name, args[0]);
    },
    weight,
  };

  (window as any).stdio = stdio;
}
