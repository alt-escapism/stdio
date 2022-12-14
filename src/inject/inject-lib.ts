import { getValueOfType } from "../app/variables";
import { random } from "../lib/random";
import { randomChoice, toUnweighted, weight } from "../lib/random-choice";
import { urlParam } from "../lib/url-param";
import { randomGaussian } from "../lib/random-gaussian";
import { randomNumber } from "../lib/random-number";
import { Stdio } from "../lib/stdio.type";
import { addVariable, variables } from "./context";
import { isSimpleValue } from "./simple-value";
import { SimpleValue, VariableSnapshot } from "./variable-def.type";
import deepEqual from "fast-deep-equal";
import { getParentWindow } from "./app-interface";
import { randomBoolean } from "../lib/random-boolean";

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
    writable: true,
    min,
    max,
    transform,
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
      const unweightedChoices = choices.map(
        toUnweighted
      ) as unknown as SimpleValue[];
      const lockedValue = getValueOfType(lockedVariable, "SimpleArray");
      let shadowed: SimpleValue | undefined;
      if (lockedValue !== undefined) {
        const matchingValue = unweightedChoices.find((choice) =>
          deepEqual(choice, lockedValue)
        );
        if (matchingValue !== undefined) {
          shadowed = chosenValue as any;
          chosenValue = matchingValue as any;
        }
      }
      addVariable({
        name,
        type: "SimpleArray",
        options: unweightedChoices,
        value: chosenValue as any,
        writable: true,
        shadowed,
      });
    } else {
      let index = unweightedChoices.indexOf(chosenValue);
      let shadowed: number | undefined;
      const lockedValue = getValueOfType(lockedVariable, "Array");
      if (lockedValue !== undefined && choices.length > lockedValue) {
        shadowed = index;
        index = lockedValue;
        chosenValue = unweightedChoices[lockedValue];
      }
      addVariable({
        name,
        type: "Array",
        options: unweightedChoices,
        value: index,
        writable: true,
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
    if (lockedValue !== undefined && lockedValue in choices) {
      shadowed = key;
      key = lockedValue;
      chosenValue = toUnweighted(choices[lockedValue]);
    }
    addVariable({
      name,
      type: "Object",
      options: Object.fromEntries(unweightedEntries),
      value: key,
      writable: true,
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

  const [name, mean = 0, sd = 1, transform] = args as [
    string,
    number | undefined,
    number | undefined,
    ((x: number) => number) | undefined
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
    writable: true,
    mean,
    sd,
    transform,
    shadowed,
  });

  return value;
};

const augmentedRandomBoolean: typeof randomBoolean = (
  name,
  chanceTrue = 0.5
) => {
  let value = randomBoolean(name, chanceTrue);
  if (!(typeof name === "string" && name)) {
    return value;
  }

  let shadowed: boolean | undefined;
  const lockedValue = getValueOfType(variables[name], "Boolean");
  if (lockedValue != null) {
    shadowed = value;
    value = lockedValue;
  }

  addVariable({
    name,
    type: "Boolean",
    value,
    writable: true,
    chanceTrue,
    shadowed,
  });

  return value;
};

const augmentedUrlParam: typeof urlParam = (name) => {
  const search = (getParentWindow() ?? window).location.search;
  const values = new URLSearchParams(search).getAll(name);
  return values.length === 0 ? null : values.length === 1 ? values[0] : values;
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
    randomBoolean: augmentedRandomBoolean,
    urlParam: augmentedUrlParam,
  };

  (window as any).stdio = stdio;
}
