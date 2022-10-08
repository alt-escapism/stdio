import { getAppInterface } from "./app-interface";
import { frameId } from "./context";

export function injectPreview() {
  const oldLog = console.log;
  console.log = (...args) => {
    if (args[0] === "fxhash: TRIGGER PREVIEW") {
      getAppInterface()?.renderingComplete(frameId, performance.now());
    }
    oldLog(...args);
  };
}
