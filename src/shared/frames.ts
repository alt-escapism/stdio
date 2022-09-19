import { Settings } from "./settings.type";
import { Variable } from "./variables.type";

export type MainFrame = Window & {
  __stdioSetBackground?: (lighting: Settings["background"]) => void;
};

export type StdioFrame = Window & {
  addVariable: (variable: Variable) => void;
  renderingComplete: (duration: number) => void;
};

export function getFrame(id: "main", w?: Window): MainFrame | null;
export function getFrame(id: "stdio", w?: Window): StdioFrame | null;
export function getFrame(
  id: "main" | "stdio",
  w?: Window
): MainFrame | StdioFrame | null;
export function getFrame(id: "main" | "stdio", w: Window = window) {
  const element = w.document.getElementById(id);
  if (element && element.nodeName === "IFRAME") {
    return (element as HTMLIFrameElement).contentWindow;
  }

  if (w.parent !== w && w.parent.origin === w.origin) {
    return getFrame(id, w.parent);
  }

  return null;
}
