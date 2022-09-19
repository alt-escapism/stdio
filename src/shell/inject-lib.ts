import { choose, toUnweighted } from "../lib/choose";
import { random } from "../lib/random";
import { Stdio } from "../lib/stdio.type";
import { addVariable, settings } from "./context";

export function injectLib() {
  const stdio: Stdio = {
    random(name, min = 0, max = 1, transform) {
      let value = random(name, min, max, transform);
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
    },

    choose(name, choices) {
      const chosenValue = choose(name, choices);
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
    },
  };

  (window as any).stdio = stdio;
}
