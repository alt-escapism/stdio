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
  try {
    if (id === "main" && (w as MainFrame).__stdioSetBackground) {
      return w;
    }
    if (id === "stdio" && (w as StdioFrame).addVariable) {
      return w;
    }

    const element = w.document.getElementById(id);
    if (element && element.nodeName === "IFRAME") {
      return (element as HTMLIFrameElement).contentWindow;
    }

    const parent = getParentFrame(w);
    if (parent) {
      return getFrame(id, parent);
    }
  } catch (e) {}

  return null;
}

export function getParentFrame(w: Window = window): Window | null {
  try {
    if (w.parent !== w && w.parent.origin === w.origin) {
      return w.parent;
    }
  } catch (e) {}

  return null;
}
