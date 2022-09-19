import { getFrame } from "../shared/frames";

export function injectPreview() {
  const oldLog = console.log;
  console.log = (...args) => {
    if (args[0] === "fxhash: TRIGGER PREVIEW") {
      getFrame("stdio")?.renderingComplete(performance.now());
    }
    oldLog(...args);
  };
}
