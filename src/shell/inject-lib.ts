import { choose, toUnweighted } from "../lib/choose";
import { random } from "../lib/random";
import { Stdio } from "../lib/stdio.type";
import { addVariable, settings } from "./context";

export function injectLib() {
  const stdio: Stdio = {
    random(name, min = 0, max = 1, transform) {
      const value = random(name, min, max, transform);

      addVariable({
        name,
        type: "Number",
        value,
        min,
        max,
      });

      const lockedValue = settings.variables[name];
      if (lockedValue) {
        const lockedNumber = Number(lockedValue);
        if (!isNaN(lockedNumber)) {
          return lockedNumber;
        }
      }

      return value;
    },

    choose(name, choices) {
      const chosenValue = choose(name, choices);
      const unweightedEntries = Object.entries(choices).map(
        ([key, value]) => [key, toUnweighted(value)] as const
      );

      const [key] = unweightedEntries.find(([_, v]) => v === chosenValue)!;
      if (Array.isArray(choices)) {
        addVariable({
          name,
          type: "Array",
          options: unweightedEntries.map(([_, v]) => v),
          value: key,
        });
      } else {
        addVariable({
          name,
          type: "Object",
          options: Object.fromEntries(unweightedEntries),
          value: key,
        });
      }

      const lockedKey = settings.variables[name];
      if (lockedKey != null) {
        const lockedValue = Object.fromEntries(unweightedEntries)[lockedKey];
        if (lockedValue != null) {
          return lockedValue;
        }
      }

      return chosenValue;
    },
  };

  (window as any).stdio = stdio;
}
