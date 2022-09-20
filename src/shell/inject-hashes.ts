import { addVariable, settings } from "./context";

const hashes = ["fxhash"];

export function injectHashes() {
  hashes.forEach((name) => {
    if (settings.variables[name] == null) {
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
      console.log("hash set to", settings.variables[name]);
      Object.defineProperty(window, name, {
        get: () => settings.variables[name],
      });
      addVariable({
        type: "Hash",
        name,
        value: settings.variables[name],
      });
    }
  });
}
