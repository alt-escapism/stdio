import { addVariable, variables } from "./context";

const hashes = ["fxhash"];

export function injectHashes() {
  hashes.forEach((name) => {
    if (variables[name] == null) {
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
    } else {
      Object.defineProperty(window, name, {
        get: () => variables[name],
      });
      addVariable({
        type: "Hash",
        name,
        value: variables[name],
      });
    }
  });
}
