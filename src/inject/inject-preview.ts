import { getAppInterface } from "./app-interface";

export function injectPreview() {
  const oldLog = console.log;
  console.log = (...args) => {
    if (args[0] === "fxhash: TRIGGER PREVIEW") {
      getAppInterface()?.renderingComplete(performance.now());
    }
    oldLog(...args);
  };
}
