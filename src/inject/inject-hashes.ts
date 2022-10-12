import { addVariable, variables } from "./context";

const hashes = ["fxhash"];

export function injectHashes() {
  hashes.forEach((name) => {
    const variable = variables[name];
    if (variable?.type === "Hash") {
      Object.defineProperty(window, name, {
        get: () => variable.value,
      });
      addVariable({
        type: "Hash",
        name,
        value: variable.value,
      });
    } else {
      let value: unknown;
      Object.defineProperty(window, name, {
        get: () => value,
        set: (v) => {
          value = v;
          addVariable({
            type: "Hash",
            name,
            value: v,
          });
        },
      });
    }
  });
}
