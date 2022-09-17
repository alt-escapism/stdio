import { getSiblingFrame } from "../shared/frames";

const previewFn = "fxpreview";

(window as any)[previewFn] = () => {
  getSiblingFrame("stdio")?.renderingComplete(performance.now());
};
