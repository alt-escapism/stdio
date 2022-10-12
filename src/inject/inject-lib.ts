import { getValueOfType } from "../app/variables";
import { random } from "../lib/random";
import { randomChoice, toUnweighted, weight } from "../lib/random-choice";
import { randomGaussian } from "../lib/random-gaussian";
import { randomNumber } from "../lib/random-number";
import { Stdio } from "../lib/stdio.type";
import { addVariable, variables } from "./context";
import { isSimpleValue } from "./simple-value";
import { SimpleValue, VariableSnapshot } from "./variable-def.type";
import deepEqual from "fast-deep-equal";

const augmentedRandomNumber: typeof randomNumber = (
  name,
  min,
  max,
  transform
) => {
  if (min == null) {
    min = 0;
    max = 1;
  } else if (max == null) {
    max = min;
    min = 0;
  }

  let value = randomNumber(name, min, max, transform);
  let shadowed: number | undefined;

  const lockedValue = getValueOfType(variables[name], "Number");
  if (lockedValue != null) {
    shadowed = value;
    value = lockedValue;
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
  const lockedVariable = variables[name] as VariableSnapshot | undefined;

  if (Array.isArray(choices)) {
    const unweightedChoices = choices.map(toUnweighted);
    if (unweightedChoices.every(isSimpleValue)) {
      let _chosenValue = chosenValue as unknown as SimpleValue;
      const unweightedChoices = choices.map(
        toUnweighted
      ) as unknown as SimpleValue[];
      const lockedValue = getValueOfType(lockedVariable, "SimpleArray");
      let shadowed: SimpleValue | undefined;
      if (lockedValue) {
        const matchingValue = unweightedChoices.find((choice) =>
          deepEqual(choice, lockedValue)
        );
        if (matchingValue) {
          shadowed = _chosenValue;
          _chosenValue = matchingValue;
        }
      }
      addVariable({
        name,
        type: "SimpleArray",
        options: unweightedChoices,
        value: _chosenValue,
        shadowed,
      });
    } else {
      let index = unweightedChoices.indexOf(chosenValue);
      let shadowed: number | undefined;
      const lockedValue = getValueOfType(lockedVariable, "Array");
      if (lockedValue && choices.length > lockedValue) {
        shadowed = index;
        index = lockedValue;
        chosenValue = unweightedChoices[lockedValue];
      }
      addVariable({
        name,
        type: "Array",
        options: unweightedChoices,
        value: index,
        shadowed,
      });
    }
  } else {
    const unweightedEntries = Object.entries(choices).map(
      ([key, value]) => [key, toUnweighted(value)] as const
    );
    let [key] =
      unweightedEntries.find(([_, v]) => v === chosenValue) ??
      unweightedEntries[0];
    let shadowed: string | undefined;
    const lockedValue = getValueOfType(lockedVariable, "Object");
    if (lockedValue && lockedValue in choices) {
      shadowed = key;
      key = lockedValue;
      chosenValue = toUnweighted(choices[lockedValue]);
    }
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

const augmentedRandomGaussian = (...args: any[]) => {
  let value = randomGaussian(...args);
  if (!(typeof args[0] === "string" && args[0])) {
    return value;
  }

  const [name, mean = 0, sd = 1] = args as [
    string,
    number | undefined,
    number | undefined
  ];
  let shadowed: number | undefined;

  const lockedValue = getValueOfType(variables[name], "Number");
  if (lockedValue != null) {
    shadowed = value;
    value = lockedValue;
  }

  addVariable({
    name,
    type: "Number",
    value,
    mean,
    sd,
    shadowed,
  });

  return value;
};

export function injectLib() {
  const stdio: Stdio = {
    random(...args: any[]): any {
      const name = typeof args[0] === "string" ? args.shift() : "";
      if (!name) {
        return random(...args);
      }
      const typeOfFirstArg = typeof args[0];
      if (typeOfFirstArg === "undefined" || typeOfFirstArg === "number") {
        return augmentedRandomNumber(name, ...args);
      }
      return augmentedRandomChoice(name, args[0]);
    },
    weight,
    randomGaussian: augmentedRandomGaussian,
  };

  (window as any).stdio = stdio;
}
