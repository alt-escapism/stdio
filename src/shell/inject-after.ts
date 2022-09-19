import { getFrame } from "../shared/frames";

const previewFn = "fxpreview";

(window as any)[previewFn] = () => {
  getFrame("stdio")?.renderingComplete(performance.now());
};
